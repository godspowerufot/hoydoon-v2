import Cookies from 'js-cookie';

export const setTokens = (accessToken, refreshToken) => {
  Cookies.set('accessToken', accessToken, { expires: 1, secure: true });
  Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true });
};

export const getAccessToken = () => Cookies.get('accessToken');
export const getRefreshToken = () => Cookies.get('refreshToken');

export const removeTokens = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
