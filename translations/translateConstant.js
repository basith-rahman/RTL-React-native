// import ReactNative from 'react-native';
// import I18n from 'react-native-i18n';

// // Import all locales
// import en from './en.json';
// import ar from './ar.json';

// // Should the app fallback to English if user locale doesn't exists
// I18n.fallbacks = true;

// // Define the supported translations
// I18n.translations = {
//   en,
//   ar
// };

// const currentLocale = I18n.currentLocale();

// // Is it a RTL language?
// export const isRTL = currentLocale.indexOf('ar') === 0;

// // Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);

// // The method we'll use instead of a regular string
// export function strings(name, params = {}) {
//   return I18n.t(name, params);
// };

// export default I18n;





import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize';
import { I18nManager } from 'react-native';
import en from './en.json';
import ar from './ar.json'
import RNRestart from 'react-native-restart';

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar,
  en
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return i18n.t(name, params);
};

export const getDefaultLanguage = async () => {
  const { languageTag, isRTL } = await RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))
  return languageTag
}

export const setI18nDefaultConfig = () => {
  //use for finding best language in your system
  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))

  console.log("languageTag", languageTag)
  console.log("isRTL", isRTL)

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag] };
  i18n.locale = languageTag;
};

export const setI18nConfig = (language, isRtl) => {
  const fallback = { languageTag: language, isRTL: isRtl };
  if(language=="ar"){
    fallback.isRTL=true
  }else{
    fallback.isRTL=false
  }
  const { languageTag, isRTL } = fallback;

  console.log("languageTag", languageTag)
  console.log("isRTL", isRTL)
  const PreviousIsRtl = I18nManager.isRTL
  console.log('PreviousIsRtl',PreviousIsRtl);
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag] };
  i18n.locale = languageTag;
  if (PreviousIsRtl != isRTL) {
    RNRestart.Restart();
  }
};

export const changeI18nConfig = (language, isRtl) => {
  const fallback = { languageTag: language, isRTL: isRtl };
  const { languageTag, isRTL } = fallback;

  console.log("languageTag", languageTag)
  console.log("isRTL", isRTL)

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = { [languageTag]: translationGetters[languageTag] };
  i18n.locale = languageTag;
  RNRestart.Restart();

  // if (!I18nManager.isRTL) {
  //   RNRestart.Restart();
  // }
};
