import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
};

export const saveTokens = async (accessToken, refreshToken) => {
  await AsyncStorage.multiSet([
    [KEYS.ACCESS_TOKEN, accessToken],
    [KEYS.REFRESH_TOKEN, refreshToken],
  ]);
};

export const getAccessToken = async () => {
  return AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = async () => {
  return AsyncStorage.getItem(KEYS.REFRESH_TOKEN);
};

export const saveUser = async (user) => {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
};

export const getUser = async () => {
  const user = await AsyncStorage.getItem(KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const clearAuth = async () => {
  await AsyncStorage.multiRemove([
    KEYS.ACCESS_TOKEN,
    KEYS.REFRESH_TOKEN,
    KEYS.USER,
  ]);
};
