import MeorinConfig from "../../meorin.config";
import type I18nKeys from "./keys";
import { en } from "./languages/en";
import { zh_CN } from "./languages/zh_cn";

export type Translation = {
  [K in I18nKeys]: string;
};

const map: { [key: string]: Translation } = {
  en: en,
  "zh-cn": zh_CN,
};

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] || en;
}

export function i18n(key: I18nKeys, ...interpolations: string[]): string {
  const lang = MeorinConfig.locale;
  let translation = getTranslation(lang)[key];
  interpolations.forEach((interpolation) => {
    translation = translation.replace("{{}}", interpolation);
  });
  return translation;
}

// 客户端动态翻译函数
export function getClientI18n(locale?: string) {
  return function(key: I18nKeys, ...interpolations: string[]): string {
    const lang = locale || (typeof window !== 'undefined' ? localStorage.getItem('locale') : null) || MeorinConfig.locale;
    let translation = getTranslation(lang)[key];
    interpolations.forEach((interpolation) => {
      translation = translation.replace("{{}}", interpolation);
    });
    return translation;
  };
}
