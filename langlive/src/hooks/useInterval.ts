import { useEffect, useLayoutEffect, useRef } from "react"

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  // I should check if lasted callback has been change
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay)

    return () => {
      clearInterval(id);
    }
  }, [delay]);
}