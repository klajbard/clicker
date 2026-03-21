import { useMemo, useState } from "react";

import config from "../../config";
import { useProgress } from "../../store/main";
import { AchievementCategory } from "../../types";

import * as Styled from "./styled";

const CATEGORY_LABELS: Record<"all" | AchievementCategory, string> = {
  all: "All",
  [AchievementCategory.CLICKING]: "Clicking",
  [AchievementCategory.PRODUCTION]: "Production",
  [AchievementCategory.PURCHASING]: "Purchasing",
  [AchievementCategory.PRESTIGE]: "Prestige",
};

const Achievements = () => {
  const state = useProgress();
  const [filter, setFilter] = useState<"all" | AchievementCategory>("all");

  const allAchievements = config.achievements;
  const unlockedSet = useMemo(
    () => new Set(state.achievements),
    [state.achievements]
  );

  const totalBonus = useMemo(() => {
    return allAchievements.reduce((sum, ach) => {
      if (unlockedSet.has(ach.id)) {
        return sum + ach.reward;
      }
      return sum;
    }, 0);
  }, [allAchievements, unlockedSet]);

  const filtered = useMemo(() => {
    const list =
      filter === "all"
        ? allAchievements
        : allAchievements.filter((ach) => ach.category === filter);

    return [...list].sort((a, b) => {
      const aUnlocked = unlockedSet.has(a.id);
      const bUnlocked = unlockedSet.has(b.id);
      if (aUnlocked && !bUnlocked) return -1;
      if (!aUnlocked && bUnlocked) return 1;
      return 0;
    });
  }, [allAchievements, filter, unlockedSet]);

  const unlockedCount = unlockedSet.size;
  const totalCount = allAchievements.length;

  return (
    <div>
      <Styled.StatsBar>
        <span>{unlockedCount}</span> / {totalCount} Achievements Unlocked
        {" \u2022 "}+<span>{Math.round(totalBonus * 100)}%</span> Total Bonus
      </Styled.StatsBar>

      <Styled.FilterBar>
        {(
          Object.keys(CATEGORY_LABELS) as Array<"all" | AchievementCategory>
        ).map((key) => (
          <Styled.FilterButton
            key={key}
            $active={filter === key}
            onClick={() => setFilter(key)}
          >
            {CATEGORY_LABELS[key]}
          </Styled.FilterButton>
        ))}
      </Styled.FilterBar>

      <Styled.AchievementsGrid>
        {filtered.map((ach) => {
          const unlocked = unlockedSet.has(ach.id);
          return (
            <Styled.AchievementCard key={ach.id} $unlocked={unlocked}>
              <Styled.CardIcon>
                {unlocked ? ach.icon : "\uD83D\uDD12"}
              </Styled.CardIcon>
              <Styled.CardName>{unlocked ? ach.name : "???"}</Styled.CardName>
              <Styled.CardDesc>
                {unlocked ? ach.description : "Keep playing to discover..."}
              </Styled.CardDesc>
              <Styled.CardReward>
                +{Math.round(ach.reward * 100)}% bonus
              </Styled.CardReward>
            </Styled.AchievementCard>
          );
        })}
      </Styled.AchievementsGrid>
    </div>
  );
};

export default Achievements;
