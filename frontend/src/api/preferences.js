export const PREF_ORDER_BY = 'PREF_ORDER_BY';

export function savePreference(prefName, prefValue) {
  localStorage.setItem(prefName, prefValue);
}

export function retrievePreference(prefName, defaultValue) {
  return localStorage.getItem(prefName) || defaultValue;
}
