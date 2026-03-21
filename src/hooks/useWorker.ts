import { useCallback, useEffect, useRef } from "react";

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

  const createSetInterval = useCallback(
    () =>
      setInterval(() => {
        if (titleUpdater.current) {
          titleUpdater.current -= 1;
        } else {
          titleUpdater.current = 20;
          storeActions.updateWindowTitle();
        }
        storeActions.update();
      }, 100),
    []
  );

  useEffect(() => {
    storeActions.init();
    saveInterval.current = setInterval(() => {
      storeActions.saveProgress();
    }, 10 * 1000);

    // Periodically check achievements
    const achievementInterval = setInterval(() => {
      storeActions.checkAchievements();
    }, 5000);

    return () => {
      clearInterval(saveInterval.current);
      clearInterval(achievementInterval);
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
      worker = new Worker(new URL("../worker.js", import.meta.url));
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
