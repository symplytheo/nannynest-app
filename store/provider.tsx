import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./index";

interface StoreProviderProps {
  children: React.ReactNode;
}

/**
 * Redux Store Provider component
 * Wrap your app with this component to provide Redux store and persistence
 */
export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
