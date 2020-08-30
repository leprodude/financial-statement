import { useReducer, useEffect } from "react";

function useLocalStorageReducer<S, A>(key: string, defaultVal: string, reducer: (state: S, action: A) => S): [S, React.Dispatch<A>] {
  const [state, dispatch] = useReducer(reducer, defaultVal, () => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
    } catch (e) {
      val = defaultVal;
    }
    return val;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export default useLocalStorageReducer;
