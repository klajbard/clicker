import { useMemo, useState } from "react";

import { useConfig } from "../../hooks/useConfig";
import { useProgress } from "../../store/main";

import * as Styled from "./styled";

// Max visible icons per producer type
const MAX_VISIBLE_PER_TYPE = 4;

interface OrbitalIconData {
  key: string;
  icon: string;
  name: string;
  totalCount: number;
  badgeCount: number;
  angle: number;
  orbitSpeed: number;
}

// Simple deterministic hash for consistent randomness per icon
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function hashRange(key: string, min: number, max: number): number {
  return min + ((hash(key) % 1000) / 1000) * (max - min);
}

// Distribute total count randomly across N slots using deterministic hash
function distributeCount(
  producerId: string,
  total: number,
  slots: number
): number[] {
  if (slots === 1) return [total];

  // Generate random weights per slot
  const weights = Array.from({ length: slots }, (_, i) => {
    const w = hash(`${producerId}-dist-${i}`);
    return (w % 100) + 50; // range 50-149 for variety but not extreme
  });
  const weightSum = weights.reduce((a, b) => a + b, 0);

  // Distribute proportionally, ensuring each slot gets at least 1
  const result = weights.map((w) =>
    Math.max(1, Math.floor((w / weightSum) * total))
  );

  // Fix rounding: assign remainder to random slots
  let remainder = total - result.reduce((a, b) => a + b, 0);
  let idx = hash(producerId + "-rem") % slots;
  while (remainder > 0) {
    result[idx % slots]++;
    remainder--;
    idx++;
  }
  while (remainder < 0) {
    const ridx = hash(producerId + `-fix-${Math.abs(remainder)}`) % slots;
    if (result[ridx] > 1) {
      result[ridx]--;
      remainder++;
    } else {
      idx++;
      if (idx > slots * 2) break;
    }
  }

  return result;
}

const OrbitalIcons = () => {
  const state = useProgress();
  const config = useConfig();
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const icons = useMemo(() => {
    const active = state.producers
      .map((p, idx) => {
        const cfg = config.producers.find((c) => c.id === p.id);
        return {
          producerId: p.id,
          icon: cfg?.icon ?? "?",
          name: cfg?.name ?? "Unknown",
          count: p.count,
          sectorIndex: idx,
        };
      })
      .filter((p) => p.count > 0);

    if (active.length === 0) return [];

    // Determine visible icon count and distribute counts
    const withDisplay = active.map((p) => {
      const displayCount = Math.min(p.count, MAX_VISIBLE_PER_TYPE);
      const needsBadge = p.count > MAX_VISIBLE_PER_TYPE;
      const distribution = needsBadge
        ? distributeCount(p.producerId, p.count, displayCount)
        : Array.from({ length: displayCount }, () => 1);

      return { ...p, displayCount, distribution, needsBadge };
    });

    // Collect all icons first
    const allIcons: Omit<OrbitalIconData, "angle">[] = [];

    withDisplay.forEach((producer) => {
      for (let i = 0; i < producer.displayCount; i++) {
        const key = `${producer.producerId}-${i}`;
        allIcons.push({
          key,
          icon: producer.icon,
          name: producer.name,
          totalCount: producer.count,
          badgeCount: producer.distribution[i],
          orbitSpeed: hashRange(key + "s", 35, 80),
        });
      }
    });

    // Deterministic shuffle so different types are interleaved
    const shuffled = [...allIcons].sort(
      (a, b) => hash(a.key + "shuffle") - hash(b.key + "shuffle")
    );

    // Assign evenly-spaced angles to the shuffled list
    const angleStep = 360 / shuffled.length;
    return shuffled.map((icon, i) => ({
      ...icon,
      angle: i * angleStep,
    }));
  }, [state.producers, config.producers]);

  if (icons.length === 0) return null;

  return (
    <Styled.OrbitContainer>
      {icons.map((icon) => (
        <Styled.OrbitIcon
          key={icon.key}
          $speed={icon.orbitSpeed}
          $delay={-(icon.angle / 360) * icon.orbitSpeed}
          $count={icon.totalCount}
          onMouseEnter={() => setHoveredKey(icon.key)}
          onMouseLeave={() => setHoveredKey(null)}
        >
          {icon.icon}
          {icon.badgeCount > 1 && (
            <Styled.CountBadge>x{icon.badgeCount}</Styled.CountBadge>
          )}
          <Styled.Tooltip $visible={hoveredKey === icon.key}>
            <span className="name">{icon.name}</span>
            <span className="count">x{icon.totalCount}</span>
          </Styled.Tooltip>
        </Styled.OrbitIcon>
      ))}
    </Styled.OrbitContainer>
  );
};

export default OrbitalIcons;
