import { useEffect, useRef } from "react";

export const useKeyboard = (key: string, cb: () => void) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === key) {
        callbackRef.current();
      }
    };

    document.addEventListener("ketpress", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [key]);

  return;
};
