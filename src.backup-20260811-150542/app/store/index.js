import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import customizerReducer from "./customizerSlice";
import cartReducer from "./cartSlice";

const cartPersistConfig = {
  key: "hoodies-home-cart",
  storage,
  whitelist: ["items"],
};

const customizerPersistConfig = {
  key: "hoodies-home-draft",
  storage,
  blacklist: ["history"],
};

const rootReducer = combineReducers({
  customizer: persistReducer(customizerPersistConfig, customizerReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = makeStore();
export const persistor = persistStore(store);
