import React from "react";

export type TLastFocusedCallbacksContext = {
  insertVariableToken: (variableName: string) => void;
  splitMessageByIf: () => void;
};

/**
 * Context that stores callbacks to the last focused `MessageBlock`.
 *
 * `MessageBlock`s update its value when handle onFocus.
 */
const LastFocusedCallbacksContext = React.createContext<
  React.MutableRefObject<TLastFocusedCallbacksContext | undefined> | undefined
>(undefined);

// Helpful custom hook that generates error if used outside of LastFocusedMessageCallbacksContext.Provider.
/**
 *
 * @returns mutable reference to lastFocusedCallbacks
 */
export function useLastFocusedMessageCallbacks() {
  const mutableRef = React.useContext(LastFocusedCallbacksContext);
  if (!mutableRef) {
    throw new Error(
      `useLastFocusedMessageCallbacks() may only be used from within a (child of a) LastFocusedMessageCallbacksContext.Provider`
    );
  }
  return mutableRef;
}

interface LastFocusedCallbacksProviderProps {
  value: React.MutableRefObject<TLastFocusedCallbacksContext | undefined>;
  children: React.ReactNode;
}

/**
 * Wrapper component for `LastFocusedCallbacksContext.Provider`.
 *
 * Used to incapsulate the actual context object.
 * @param props
 * @returns
 */
const LastFocusedCallbacksProvider: React.FC<
  LastFocusedCallbacksProviderProps
> = (props) => {
  return <LastFocusedCallbacksContext.Provider {...props} />;
};

export default LastFocusedCallbacksProvider;
