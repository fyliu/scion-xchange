import { useEffect } from "react";

export const useAbortableEffect = (effect, dependencies) => {
  const status = {}; // mutable status object
  useEffect(() => {
    // pass the mutable object to the effect callback
    // store the returned value for cleanup
    const cleanUpFn = effect(status);
    return () => {
      // mutate the object to signal the consumer
      // this effect is cleaning up
      status.aborted = true;
      if (typeof cleanUpFn === "function") {
        // run the cleanup function
        cleanUpFn();
      }
    };
  }, [...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
};
