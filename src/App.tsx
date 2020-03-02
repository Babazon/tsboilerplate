import 'es6-symbol/implement';
import React, { useState, useEffect, useCallback, SetStateAction } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';

export const App: React.FC = () => {

  const { execute, pending, value, error } = useAsync(myFunction, false);

  return (
    <ErrorBoundary>
      <View style={styles.flex}>
        {value && <Text>{value}</Text>}
        {error && <Text>{error}</Text>}
        <TouchableHighlight onPress={execute} disabled={pending}>
          <Text>{!pending ? 'Click me' : 'Loading...'}</Text>
        </TouchableHighlight>
      </View>
    </ErrorBoundary >
  );
}

// An async function for testing our hook.
// Will be successful 50% of the time.
const myFunction = (): Promise<SetStateAction<string | null>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rnd: number = Math.random() * 10;
      rnd <= 5
        ? resolve('Submitted successfully 🙌')
        : reject('Oh no there was an error 😞');
    }, 2000);
  });
};

// Hook -> HOW TO TYPE THAT PROMISE?
const useAsync = (asyncFunction: () => Promise<SetStateAction<any>>, immediate: boolean = true) => {
  const [pending, setPending] = useState(false); // boolean
  const [value, setValue] = useState(null); // null | string
  const [error, setError] = useState(null); // null | string

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then(response => setValue(response))
      .catch(_ => setError(_))
      .finally(() => setPending(false));
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
