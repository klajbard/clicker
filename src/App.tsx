import React, { useEffect, useMemo, useRef } from "react";

import ProducerItem from "./components/Items/ProducerItem";
import UpgradeItem from "./components/Items/UpgradeItem";
import SaveProgress from "./components/SaveProgress/SaveProgress";
import Stat from "./components/Stat/Stat";
import Trigger from "./components/Trigger/Trigger";
import { useConfig } from "./hooks/useConfig";
import { storeActions, useProgress } from "./store/main";
import * as Styled from "./styled";
import { TWorkerMessage } from "./types";

export default function App() {
  const config = useConfig();
  const state = useProgress();
  const interval = useRef<ReturnType<typeof setTimeout>>();
  const saveInterval = useRef<ReturnType<typeof setTimeout>>();
  const localState = useRef({ count: 0, dps: 0 });
  const titleUpdater = useRef<number>(20);

  useEffect(() => {
    storeActions.init();
    saveInterval.current = setInterval(() => {
      storeActions.saveProgress();
    }, 30 * 1000);

    return () => {
      clearInterval(saveInterval.current);
    };
  }, []);

  const createSetInterval = () =>
    setInterval(() => {
      if (titleUpdater.current) {
        titleUpdater.current -= 1;
      } else {
        titleUpdater.current = 20;
        storeActions.updateWindowTitle();
      }
      storeActions.update();
    }, 100);

  useEffect(() => {
    localState.current = { count: state.count, dps: state.producerDps };
  }, [state.count, state.producerDps]);

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

  const availableUpgrades = useMemo(
    () =>
      config.upgrades.filter((upgrade) => !storeActions.hasUpgrade(upgrade.id)),
    [state.upgrades]
  );

  return (
    <>
      <Styled.GlobalStyle />
      <Styled.Wrapper>
        <Trigger />
        <Stat />
        <SaveProgress />
        <Styled.Column>
          {availableUpgrades.map((upgrade) => (
            <UpgradeItem key={upgrade.id} item={upgrade} />
          ))}
        </Styled.Column>
        <Styled.Column>
          {config.producers.map((producer) => (
            <ProducerItem key={producer.id} item={producer} />
          ))}
        </Styled.Column>
      </Styled.Wrapper>
    </>
  );
}
