import { Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import { syncStorage } from "redux-persist-webextension-storage";
import getStoredState from "redux-persist/lib/getStoredState";
import browser from "webextension-polyfill";
import { REDUX_PERSIST_KEY } from "../../constants";
import { domainListReducer } from "../features/domainList/domainListSlice";
import { optionsReducer } from "../features/options/optionsSlice";

const syncStorageConfig = {
  key: REDUX_PERSIST_KEY,
  storage: syncStorage,
};

const rootReducer = combineReducers({
  domainLists: domainListReducer,
  options: optionsReducer,
});

function initStore() {
  return configureStore({
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
  });
}

function initPersistor(store: Store) {
  return persistStore(store, null, () => {
    try {
      initStorageSyncListener(store);
    } catch (e) {
      console.error("Unable to sync redux persist to storage.", e);
    }
  });
}

function initStorageSyncListener(store: Store) {
  browser.storage.sync.onChanged.addListener(() => {
    getStateFromStorage().then((storedState) => {
      // TODO: This could probably use some tweaking in the future. Not very efficient.
      const storedStateString = JSON.stringify(storedState);
      const currentStateString = JSON.stringify(store.getState());
      if (storedStateString !== currentStateString) {
        store.dispatch({
          type: REHYDRATE,
          key: REDUX_PERSIST_KEY,
          payload: storedState,
        });
      }
    });
  });
}

export function getStateFromStorage() {
  return getStoredState(syncStorageConfig) as Promise<RootState>;
}

export function getStore() {
  const store = initStore();
  const persistor = initPersistor(store);

  return { store, persistor };
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<
  ReturnType<typeof getStore>["store"]["getState"]
>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ReturnType<
  ReturnType<typeof getStore>["store"]["dispatch"]
>;
