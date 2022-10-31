import React, { useMemo } from "react";
import { ThemeProvider } from "styled-components";

import ProducerItem from "./components/Items/ProducerItem";
import UpgradeItem from "./components/Items/UpgradeItem";
import SaveProgress from "./components/SaveProgress/SaveProgress";
import Stat from "./components/Stat/Stat";
import Trigger from "./components/Trigger/Trigger";
import { useConfig } from "./hooks/useConfig";
import useWorker from "./hooks/useWorker";
import { storeActions, useProgress } from "./store/main";
import * as Styled from "./styled";
import theme from "./theme";
import { roundToDecimal } from "./utils/calculate";

export default function App() {
  const config = useConfig();
  const state = useProgress();

  const roundedSum = useMemo(
    () => roundToDecimal(state.count + state.sumPurchases, 3),
    [state.count, state.sumPurchases]
  );

  useWorker();
  const availableUpgrades = useMemo(() => {
    let count = 0;
    return config.upgrades
      .sort((a, b) => a.price - b.price)
      .filter(({ id, price }) => {
        const isPurchased = storeActions.hasUpgrade(id);
        const ableToBuy = roundedSum * 2 > price;
        count += Number(!isPurchased);
        return !isPurchased && (ableToBuy || count <= 1);
      });
  }, [roundedSum, state.sumPurchases]);

  const availableProducers = useMemo(() => {
    let count = 0;
    return config.producers.filter(({ basePrice, id }) => {
      const ableToBuy = roundedSum * 5 > basePrice;
      const isPurchased = storeActions.hasProducer(id);
      if (!isPurchased) {
        count += 1;
      }
      return ableToBuy || count <= 1;
    });
  }, [roundedSum]);

  return (
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyle />
      <Styled.Wrapper>
        <Trigger />
        <Stat />
        <SaveProgress />
        <Styled.Container>
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
              {availableProducers.map((producer) => (
                <ProducerItem key={producer.id} item={producer} />
              ))}
            </Styled.UpgradesWrapper>
          </Styled.Column>
        </Styled.Container>
      </Styled.Wrapper>
    </ThemeProvider>
  );
}
