import JwtDecode from "jwt-decode";
const TOKEN = process.env.REACT_APP_TOKEN;

export const setTokenInLocalStorage = (encryptedToken) =>
  localStorage.setItem(TOKEN, encryptedToken);

export const getUser = () => {
  try {
    const user = localStorage.getItem(TOKEN);
    return JwtDecode(user);
  } catch (error) {
    return null;
  }
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);
