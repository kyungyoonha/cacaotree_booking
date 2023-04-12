import { Carts } from "@types";

export default Object.freeze({
  get(key: string, defaultValue = null) {
    if (typeof window === "undefined") return defaultValue;
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  },

  set(key: string, value: Carts) {
    if (typeof window === "undefined") return null;
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string) {
    if (typeof window === "undefined") return null;
    localStorage.removeItem(key);
  },
});
