import { useEffect, useRef } from "react";

import { storeActions, useProgress } from "../store/main";
import { TWorkerMessage } from "../types";

const useWorker = () => {
  const state = useProgress();
  const localState = useRef({ count: 0, dps: 0 });
  const interval = useRef<ReturnType<typeof setTimeout>>();
  const saveInterval = useRef<ReturnType<typeof setTimeout>>();
  const titleUpdater = useRef<number>(20);

  useEffect(() => {
    localState.current = { count: state.count, dps: state.producerDps };
  }, [state.count, state.producerDps]);

  const createSetInterval = () =>
    setInterval(() => {
      if (titleUpdater.current) {
        titleUpdater.current -= 1;
      } else {
        titleUpdater.current = 20;
        // Updates browser title every 2 seconds when tab out of focus
        storeActions.updateWindowTitle();
      }
      // Use the same timer to update store with new value
      storeActions.update();
    }, 100);

  useEffect(() => {
    storeActions.init();
    saveInterval.current = setInterval(() => {
      storeActions.saveProgress();
      // Saves progress automatically each 30 seconds
    }, 30 * 1000);

    return () => {
      clearInterval(saveInterval.current);
    };
  }, []);

  useEffect(() => {
    const handleWindowBlur = () => {
      const data = localState.current;
      worker.postMessage({ event: "blur", data });
      clearInterval(interval.current);
      interval.current = undefined;
    };

    const handleWindowFocus = () => {
      if (!interval.current) {
        interval.current = createSetInterval();
        worker.postMessage({ event: "focus" });
      }
    };

    let worker: Worker;
    interval.current = createSetInterval();
    if (window.Worker) {
      // Creates the web worker which will operate only when tab is out of focus.
      worker = new Worker(new URL("./worker.js", import.meta.url));
      window.addEventListener("blur", handleWindowBlur);
      window.addEventListener("focus", handleWindowFocus);
      worker.onmessage = ({ data }: TWorkerMessage) => {
        switch (data.event) {
          case "push":
            if (data.count) {
              storeActions.updateCount(data.count);
            }
            break;
          case "save":
            storeActions.saveProgress();
            break;
          default:
        }
      };
    }
    return () => {
      worker?.terminate();
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
      clearInterval(interval.current);
      interval.current = undefined;
    };
  }, []);
};

export default useWorker;
