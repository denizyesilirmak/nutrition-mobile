import { MMKV } from "react-native-mmkv";

export const STORAGE_KEYS = {
  USER: "USER",
  TOKEN: "TOKEN",
  REMEMBER_ME: "REMEMBER_ME",
};

type StorageKey = keyof typeof STORAGE_KEYS;

const mmkv = new MMKV();

const Storage = {
  setItem: (key: StorageKey, value: string) => {
    mmkv.set(STORAGE_KEYS[key], value);
  },
  getItem: (key: StorageKey) => {
    return mmkv.getString(STORAGE_KEYS[key]);
  },
  removeItem: (key: StorageKey) => {
    mmkv.delete(STORAGE_KEYS[key]);
  },
  clear: () => {
    mmkv.clearAll();
  },
};

export default Storage;
