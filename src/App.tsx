import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "styled-components";

import Achievements from "./components/Achievements/Achievements";
import GoldenCookie from "./components/GoldenCookie/GoldenCookie";
import ProducerItem from "./components/Items/ProducerItem";
import UpgradeItem from "./components/Items/UpgradeItem";
import OfflineProgress from "./components/OfflineProgress/OfflineProgress";
import Prestige from "./components/Prestige/Prestige";
import SaveIndicator from "./components/SaveIndicator/SaveIndicator";
import Settings from "./components/Settings/Settings";
import Stats from "./components/Stats/Stats";
import Toast from "./components/Toast/Toast";
import Trigger from "./components/Trigger/Trigger";
import { useConfig } from "./hooks/useConfig";
import useWorker from "./hooks/useWorker";
import { storeActions, useProgress } from "./store/main";
import * as Styled from "./styled";
import theme from "./theme";
import { BulkBuyOption, Tab } from "./types";
import { roundToDecimal, toHumanReadable } from "./utils/calculate";

const BULK_OPTIONS: BulkBuyOption[] = [1, 10, 100, "max"];

const TAB_LABELS: Record<Tab, string> = {
  [Tab.PRODUCERS]: "Producers",
  [Tab.UPGRADES]: "Upgrades",
  [Tab.ACHIEVEMENTS]: "Achievements",
  [Tab.STATS]: "Statistics",
  [Tab.SETTINGS]: "Settings",
};

export default function App() {
  const config = useConfig();
  const state = useProgress();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.PRODUCERS);
  const [bulkBuy, setBulkBuy] = useState<BulkBuyOption>(1);

  const roundedSum = useMemo(
    () => roundToDecimal(state.count + state.sumPurchases, 3),
    [state.count, state.sumPurchases]
  );

  useWorker();

  // Track time played
  useEffect(() => {
    const timer = setInterval(() => {
      storeActions.tickTimePlayed();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const availableUpgrades = useMemo(() => {
    let count = 0;
    return [...config.upgrades]
      .sort((a, b) => a.price - b.price)
      .filter(({ id, price }) => {
        const isPurchased = storeActions.hasUpgrade(id);
        const ableToBuy = roundedSum * 2 > price;
        count += Number(!isPurchased);
        return !isPurchased && (ableToBuy || count <= 1);
      });
  }, [roundedSum, state.sumPurchases, state.upgrades]);

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

  const affordableUpgradeCount = useMemo(
    () => availableUpgrades.filter((u) => state.count >= u.price).length,
    [availableUpgrades, state.count]
  );

  const handleTabClick = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const humanScore = useMemo(
    () => toHumanReadable(state.count, state.settings.notation),
    [state.count, state.settings.notation]
  );

  const humanDps = useMemo(
    () => toHumanReadable(state.producerDps, state.settings.notation),
    [state.producerDps, state.settings.notation]
  );

  const boostTimeLeft = useMemo(() => {
    if (!state.activeBoost) return 0;
    return Math.max(
      0,
      Math.ceil((state.activeBoost.endsAt - Date.now()) / 1000)
    );
  }, [state.activeBoost]);

  return (
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyle />
      <Styled.Wrapper>
        {/* Header */}
        <Styled.Header>
          <Styled.ScoreDisplay>
            <div className="label">Points</div>
            <div className="value">{humanScore}</div>
          </Styled.ScoreDisplay>
          <Styled.HeaderStats>
            <Styled.HeaderStat>
              <div className="label">Per Second</div>
              <div className="value">{humanDps}</div>
            </Styled.HeaderStat>
            <Styled.HeaderStat>
              <div className="label">Per Click</div>
              <div className="value">
                {toHumanReadable(state.clickDps, state.settings.notation)}
              </div>
            </Styled.HeaderStat>
            {state.prestige.totalDiamonds > 0 && (
              <Styled.PrestigeDisplay>
                <span className="icon">💎</span>
                {state.prestige.diamonds}
              </Styled.PrestigeDisplay>
            )}
          </Styled.HeaderStats>
        </Styled.Header>

        {/* Active boost indicator */}
        {state.activeBoost && boostTimeLeft > 0 && (
          <Styled.BoostIndicator>
            🍪{" "}
            {state.activeBoost.type === "multiplier"
              ? `${state.activeBoost.multiplier}x Production`
              : `${state.activeBoost.multiplier}x Click Power`}{" "}
            — {boostTimeLeft}s
          </Styled.BoostIndicator>
        )}

        {/* Click Area */}
        <Trigger />

        {/* Tabs */}
        <Styled.MainContent>
          <Styled.TabBar>
            {(Object.values(Tab) as Tab[]).map((tab) => (
              <Styled.TabButton
                key={tab}
                $active={activeTab === tab}
                onClick={() => handleTabClick(tab)}
              >
                {TAB_LABELS[tab]}
                {tab === Tab.UPGRADES && affordableUpgradeCount > 0 && (
                  <Styled.TabBadge>{affordableUpgradeCount}</Styled.TabBadge>
                )}
              </Styled.TabButton>
            ))}
          </Styled.TabBar>

          <Styled.TabContent>
            {activeTab === Tab.PRODUCERS && (
              <>
                <Styled.BulkBuyBar>
                  {BULK_OPTIONS.map((opt) => (
                    <Styled.BulkBuyButton
                      key={String(opt)}
                      $active={bulkBuy === opt}
                      onClick={() => setBulkBuy(opt)}
                    >
                      {opt === "max" ? "Max" : `x${opt}`}
                    </Styled.BulkBuyButton>
                  ))}
                </Styled.BulkBuyBar>
                <Styled.UpgradesWrapper>
                  {availableProducers.map((producer) => (
                    <ProducerItem
                      key={producer.id}
                      item={producer}
                      bulkBuy={bulkBuy}
                    />
                  ))}
                </Styled.UpgradesWrapper>
              </>
            )}

            {activeTab === Tab.UPGRADES && (
              <Styled.UpgradesWrapper>
                {availableUpgrades.map((upgrade) => (
                  <UpgradeItem key={upgrade.id} item={upgrade} />
                ))}
                {availableUpgrades.length === 0 && (
                  <div
                    style={{
                      color: "#8888aa",
                      textAlign: "center",
                      padding: "2rem",
                    }}
                  >
                    No upgrades available. Keep earning points!
                  </div>
                )}
              </Styled.UpgradesWrapper>
            )}

            {activeTab === Tab.ACHIEVEMENTS && <Achievements />}
            {activeTab === Tab.STATS && <Stats />}
            {activeTab === Tab.SETTINGS && (
              <>
                <Prestige />
                <Settings />
              </>
            )}
          </Styled.TabContent>
        </Styled.MainContent>

        {/* Overlays */}
        <GoldenCookie />
        <Toast />
        <OfflineProgress />
        <SaveIndicator />
      </Styled.Wrapper>
    </ThemeProvider>
  );
}
