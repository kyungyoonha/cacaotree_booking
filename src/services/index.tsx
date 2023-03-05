import { Carts } from "./types";

export default Object.freeze({
  get(key: string, defaultValue = null) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  },

  set(key: string, value: Carts) {
    localStorage.setItem(key, JSON.stringify(value));
  },
});
