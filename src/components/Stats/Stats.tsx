import { useMemo } from "react";

import config from "../../config";
import { useProgress } from "../../store/main";
import { toHumanReadable, formatTime } from "../../utils/calculate";

import * as Styled from "./styled";


const Stats = () => {
  const state = useProgress();

  const notation = state.settings.notation;

  const currentRunTime = useMemo(
    () => Math.floor((Date.now() - state.statistics.currentRunStart) / 1000),
    [state.statistics.currentRunStart]
  );

  const achievementBonus = useMemo(() => {
    return state.achievements.reduce((total, achId) => {
      const ach = config.achievements.find((a) => a.id === achId);
      return total + (ach?.reward || 0);
    }, 0);
  }, [state.achievements]);

  return (
    <Styled.StatsContainer>
      <Styled.Section>
        <Styled.SectionTitle>Current Run</Styled.SectionTitle>
        <Styled.StatRow>
          <Styled.StatLabel>Points earned</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.statistics.currentRunEarnings, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Time this run</Styled.StatLabel>
          <Styled.StatValue>{formatTime(currentRunTime)}</Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Current DPS</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.producerDps, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Click power</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.clickDps, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Lifetime</Styled.SectionTitle>
        <Styled.StatRow>
          <Styled.StatLabel>Total points earned</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.statistics.totalEarned, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Total points spent</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.statistics.totalSpent, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Total clicks</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.statistics.totalClicks, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Total time played</Styled.StatLabel>
          <Styled.StatValue>
            {formatTime(state.statistics.timePlayed)}
          </Styled.StatValue>
        </Styled.StatRow>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Prestige</Styled.SectionTitle>
        <Styled.StatRow>
          <Styled.StatLabel>Total prestiges</Styled.StatLabel>
          <Styled.StatValue>{state.statistics.totalPrestiges}</Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Highest single-run earnings</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.statistics.highestRunEarnings, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Diamonds earned (total)</Styled.StatLabel>
          <Styled.StatValue>
            {toHumanReadable(state.prestige.totalDiamonds, notation)}
          </Styled.StatValue>
        </Styled.StatRow>
      </Styled.Section>

      <Styled.Section>
        <Styled.SectionTitle>Achievements</Styled.SectionTitle>
        <Styled.StatRow>
          <Styled.StatLabel>Unlocked</Styled.StatLabel>
          <Styled.StatValue>
            {state.achievements.length} / {config.achievements.length}
          </Styled.StatValue>
        </Styled.StatRow>
        <Styled.StatRow>
          <Styled.StatLabel>Total bonus</Styled.StatLabel>
          <Styled.StatValue>
            {Math.round(achievementBonus * 100)}%
          </Styled.StatValue>
        </Styled.StatRow>
      </Styled.Section>
    </Styled.StatsContainer>
  );
};

export default Stats;
