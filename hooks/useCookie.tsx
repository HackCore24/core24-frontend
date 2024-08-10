import Cookies from "js-cookie";

export const useCookie = (key: string, defaultValue: string | null = null) => {
  const getCookie = Cookies.get(key) || defaultValue;
  const setCookie = (value: string) => Cookies.set(key, value);
  const removeCookie = () => Cookies.remove(key);

  return [getCookie, setCookie, removeCookie] as [
    string | null,
    (value: string) => void,
    () => void
  ];
};
