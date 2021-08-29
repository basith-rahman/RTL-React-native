import React, {Component} from 'react';
import { setI18nConfig, translate,strings, changeI18nConfig } from './translations/translateConstant'
import { Button, SafeAreaView,StyleSheet, Text } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App () {
  const [loginBtn, setLoginBtn] = React.useState("");

    React.useEffect(() => {
        AsyncStorage.getItem("lang").then(afterRecieveLang);
        // RNRestart.Restart();
        RNLocalize.addEventListener("change", handleLocalizationChange)
    }, []);
    const storeLang = async (value) => {
      try {
        await AsyncStorage.setItem('lang', value)
      } catch (e) {
        // saving error
      }
    }
    
    const afterRecieveLang = (value) => {
      if(value){
        setI18nConfig(value,false); // set initial config
        setLoginBtn(translate("login.login_button"))
      }else{
        setI18nConfig("en",false); // set initial config
      }
    }
    function handleLocalizationChange (lang="en"){
        storeLang(lang);
        if(lang=="ar"){
            setI18nConfig(lang,true);
            console.log("Set ar")
        }else{
          setI18nConfig(lang,false);
        }
        // this.forceUpdate();
        setLoginBtn(translate("login.login_button"))
        console.log(translate("login.login_button"))
    }
    function changeLanguage(lang="en"){
      console.log("aa")
      handleLocalizationChange(lang)
    }

    return (
      <SafeAreaView style={styles.container}>
        <Text style={{alignSelf:'flex-start'}}>  {loginBtn} </Text>
        <Text style={{textAlign:'left'}}>{strings('login.login_button')}</Text>
        <Button onPress={()=>changeLanguage("en")} title="Change Language to Eng"/>
        <Button onPress={()=>changeLanguage("ar")} title="Change Language to Arabic"/>

      </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
