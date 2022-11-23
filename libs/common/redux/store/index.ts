import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { syncStorage } from "redux-persist-webextension-storage";
import { domainListReducer } from "../features/domainList/domainListSlice";
import logger from "redux-logger";
import { optionsReducer } from "../features/options/optionsSlice";
import browser from "webextension-polyfill";
import getStoredState from "redux-persist/es/getStoredState";

const syncStorageConfig = {
  key: "root",
  storage: syncStorage,
};

const rootReducer = combineReducers({
  domainLists: domainListReducer,
  options: optionsReducer,
});

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
const browserMiddleware: Middleware = (store) => (next) => (action) => {
  browser.runtime
    .sendMessage(null, {
      action,
    })
    .catch(() => {
      console.log("Error during send message");
    })
    .finally(() => {
      next(action);
    });
};

export const store = configureStore({
  reducer: persistReducer<ReturnType<typeof rootReducer>>(
    syncStorageConfig,
    rootReducer
  ),
  // TODO: Look more into this: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  // .concat(browserMiddleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

function listen() {
  browser.storage.sync.onChanged.addListener(() => {
    getStoredState(syncStorageConfig).then((val) => {
      const json = JSON.stringify(val);
      const state = JSON.stringify(store.getState());
      if (json !== state) {
        store.dispatch({
          type: REHYDRATE,
          payload: val,
          key: "root",
        });
      }
      // console.log({ json, state, equal: json === state });
    });
    // store.dispatch({ type: "persist/PERSIST", });
  });

  browser.runtime.onMessage.addListener((message) => {
    console.log(message);
  });
}
listen();
