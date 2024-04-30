import {updateRawData} from '../Reducers/actions';
import store from './../store';
const packageJson = require('../package.json');
const localConfigJson = require('../localConfig.json');

export const groupBy = (list, f) => {
  return list.reduce(
    (r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r),
    {},
  );
};

export function getEnvironment() {
  return process.env.NODE_ENV || '';
}

export function getConfig() {
  return getEnvironment() === 'production' ? packageJson : localConfigJson;
}

export function isEmpty(object) {
  return !object || !Object.keys(object).length;
}

export const getServerURL = () => {
  const config = getConfig();

  if (isEmpty(config)) {
    console.error('Server configuration not found!');
    return '';
  }

  return config[`serverURL`];
};

export const getRequestedHeader = () => {
  const rawData = store.getState().rawData || {};

  console.log(rawData);
  const config = {
    headers: {
      'auth-token': rawData.authToken || '',
      'auth-user': rawData.authUser || '',
      'Content-Type': 'application/json',
    },
  };

  return config;
};

export const getAnyUserInfoFromLocalStorage = key => {
  //   const userInfo = localStorage.getItem('USER_INFO');
  let userInfo;
  if (!userInfo) return '';

  return userInfo ? JSON.parse(userInfo)[key] : '';
};

export const setUserInLocalStorage = token => {
  if (!token) {
    console.warn('No Token sent to setTokenInLocalStorage');
    return false;
  }

  localStorage.setItem('USER_INFO', JSON.stringify({AUTH_TOKEN: token}));

  return true;
};

export const showToaster = (text = '', others = {}) => {
  updateRawData({toastObject: {message: text, ...others}});
};

// Check whether the email is valid or not
export const isValidEmail = email => {
  if (!email) return false;

  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return !!email.match(regex);
};

export const serialize = arry => {
  // php serialization "s:16:a:1:{i:0;i:159;}"" "
  let string = arry.reduce((data, i, index) => {
    return data + `i:${index};i:${i};`;
  }, '');

  string = `a:${arry.length}:{${string}}`;

  return `s:${string.length}:${string}`;
};

export const deserialize = string => {
  const arrayString = string.substring(
    string.lastIndexOf('{') + 1,
    string.lastIndexOf('}'),
  );
  const splitArrayDataWithSemiColon = arrayString.split(';');
  const idWithIPredix = splitArrayDataWithSemiColon.filter(
    (item, index) => (index + 1) % 2 === 0,
  );

  return idWithIPredix.map(i => Number(i.replace('i:', '')));
};
