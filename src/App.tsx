import React, { useMemo } from "react";

import ProducerItem from "./components/Items/ProducerItem";
import UpgradeItem from "./components/Items/UpgradeItem";
import SaveProgress from "./components/SaveProgress/SaveProgress";
import Stat from "./components/Stat/Stat";
import Trigger from "./components/Trigger/Trigger";
import { useConfig } from "./hooks/useConfig";
import useWorker from "./hooks/useWorker";
import { storeActions, useProgress } from "./store/main";
import * as Styled from "./styled";

export default function App() {
  const config = useConfig();
  const state = useProgress();

  useWorker();
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
          <Styled.SectionTitle>Upgrades</Styled.SectionTitle>
          <Styled.UpgradesWrapper>
            {availableUpgrades.map((upgrade) => (
              <UpgradeItem key={upgrade.id} item={upgrade} />
            ))}
          </Styled.UpgradesWrapper>
        </Styled.Column>
        <Styled.Column>
          <Styled.SectionTitle>Producers</Styled.SectionTitle>
          <Styled.UpgradesWrapper>
            {config.producers.map((producer) => (
              <ProducerItem key={producer.id} item={producer} />
            ))}
          </Styled.UpgradesWrapper>
        </Styled.Column>
      </Styled.Wrapper>
    </>
  );
}
