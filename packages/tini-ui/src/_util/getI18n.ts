/* eslint-disable */
import I18n_viVN from '../_lang/vi-VN';
import I18n_enUS from '../_lang/en-US';

export default function getI18n() {
  try {
    const appMiniapTikiUI = getApp() || null;
    if (appMiniapTikiUI) {
      if (appMiniapTikiUI.globalData?.miniAliUiLang === 'en-US') {
        return I18n_enUS;
      } else {
        return I18n_viVN;
      }
    } else {
      return I18n_viVN;
    }
  } catch (error) {
    return I18n_viVN;
  }
}
