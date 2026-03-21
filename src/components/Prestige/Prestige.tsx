import { useCallback, useMemo, useState } from "react";

import config from "../../config";
import { storeActions, useProgress } from "../../store/main";
import { toHumanReadable } from "../../utils/calculate";

import * as Styled from "./styled";

const Prestige = () => {
  const state = useProgress();
  const [showModal, setShowModal] = useState(false);

  const diamondsToEarn = useMemo(
    () => storeActions.calculatePrestigeDiamonds(),
    [state.statistics.currentRunEarnings]
  );

  const currentDiamonds = state.prestige.diamonds;
  const hasDiamonds = currentDiamonds > 0 || diamondsToEarn > 0;

  const handlePrestigeClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleConfirm = useCallback(() => {
    storeActions.performPrestige();
    setShowModal(false);
  }, []);

  const handleCancel = useCallback(() => {
    setShowModal(false);
  }, []);

  const upgrades = useMemo(
    () =>
      config.prestigeUpgrades.map((upgrade) => {
        const currentLevel = state.prestige.upgrades[upgrade.id] || 0;
        const isMaxed = currentLevel >= upgrade.maxLevel;
        const cost = Math.floor(
          upgrade.baseCost * Math.pow(upgrade.costScale, currentLevel)
        );
        const canAfford = currentDiamonds >= cost;

        return {
          ...upgrade,
          currentLevel,
          isMaxed,
          cost,
          canAfford,
        };
      }),
    [state.prestige.upgrades, currentDiamonds]
  );

  return (
    <Styled.PrestigeContainer>
      <h2>Prestige</h2>

      <Styled.DiamondDisplay>
        <span className="icon">💎</span>
        {toHumanReadable(currentDiamonds)}
      </Styled.DiamondDisplay>

      {!hasDiamonds ? (
        <Styled.PreviewText>
          Keep earning to unlock prestige! You need to earn more to gain
          diamonds.
        </Styled.PreviewText>
      ) : (
        <Styled.PreviewText>
          You will earn <span>{toHumanReadable(diamondsToEarn)} 💎</span>{" "}
          diamonds
        </Styled.PreviewText>
      )}

      <Styled.PrestigeButton
        disabled={diamondsToEarn <= 0}
        onClick={handlePrestigeClick}
      >
        Prestige Now
      </Styled.PrestigeButton>

      {config.prestigeUpgrades.length > 0 && (
        <Styled.UpgradeGrid>
          {upgrades.map((upgrade) => (
            <Styled.UpgradeCard key={upgrade.id} $maxed={upgrade.isMaxed}>
              {upgrade.isMaxed && <Styled.MaxedBadge>MAXED</Styled.MaxedBadge>}
              <div className="card-header">
                <span className="card-icon">{upgrade.icon}</span>
                <Styled.UpgradeName>{upgrade.name}</Styled.UpgradeName>
              </div>
              <Styled.UpgradeDesc>{upgrade.description}</Styled.UpgradeDesc>
              <Styled.UpgradeLevel>
                Level {upgrade.currentLevel} / {upgrade.maxLevel}
              </Styled.UpgradeLevel>
              {!upgrade.isMaxed && (
                <Styled.UpgradeCost>
                  💎 {toHumanReadable(upgrade.cost)}
                </Styled.UpgradeCost>
              )}
              {!upgrade.isMaxed && (
                <Styled.BuyButton
                  disabled={!upgrade.canAfford}
                  onClick={() => storeActions.buyPrestigeUpgrade(upgrade.id)}
                >
                  Buy
                </Styled.BuyButton>
              )}
            </Styled.UpgradeCard>
          ))}
        </Styled.UpgradeGrid>
      )}

      {showModal && (
        <Styled.ModalOverlay onClick={handleCancel}>
          <Styled.ModalContent onClick={(e) => e.stopPropagation()}>
            <Styled.ModalTitle>Prestige?</Styled.ModalTitle>
            <Styled.ModalText>
              Are you sure? You will lose all progress but gain{" "}
              <strong>{toHumanReadable(diamondsToEarn)} 💎</strong> diamonds.
              Your prestige upgrades and achievements will be kept.
            </Styled.ModalText>
            <Styled.ModalButtonGroup>
              <Styled.ModalButton $variant="cancel" onClick={handleCancel}>
                Cancel
              </Styled.ModalButton>
              <Styled.ModalButton $variant="confirm" onClick={handleConfirm}>
                Prestige
              </Styled.ModalButton>
            </Styled.ModalButtonGroup>
          </Styled.ModalContent>
        </Styled.ModalOverlay>
      )}
    </Styled.PrestigeContainer>
  );
};

export default Prestige;
