import {
  AchievementCategory,
  IAchievement,
  IConfig,
  IPrestigeUpgrade,
  UpgradeType,
} from "./types";

export const PRODUCER_POW = 1.15;
export const PRESTIGE_BASE = 1e9;

const config: IConfig = {
  upgrades: [
    // Click power upgrades
    {
      id: "upgrdclck1",
      name: "Reinforced Index Finger",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 100,
      description: "Clicking gains twice as many points.",
      icon: "👆",
    },
    {
      id: "upgrdclck2",
      name: "Carpal Tunnel Prevention",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 1000,
      description: "Clicking gains twice as many points.",
      icon: "🖱️",
    },
    {
      id: "upgrdclck3",
      name: "Ambidextrous",
      multiply: 2,
      type: UpgradeType.CLICK,
      price: 10000,
      description: "Clicking gains twice as many points.",
      icon: "🤲",
    },
    {
      id: "upgrdclck4",
      name: "Thousand Fingers",
      multiply: 2.5,
      type: UpgradeType.CLICK,
      price: 100000,
      description: "Clicking gains 2.5x as many points.",
      icon: "🖐️",
    },
    {
      id: "upgrdclck5",
      name: "Million Fingers",
      multiply: 3,
      type: UpgradeType.CLICK,
      price: 1000000,
      description: "Clicking gains 3x as many points.",
      icon: "✋",
    },
    {
      id: "upgrdclck6",
      name: "Billion Fingers",
      multiply: 3,
      type: UpgradeType.CLICK,
      price: 50000000,
      description: "Clicking gains 3x as many points.",
      icon: "🤚",
    },
    {
      id: "upgrdclck7",
      name: "Trillion Fingers",
      multiply: 5,
      type: UpgradeType.CLICK,
      price: 500000000,
      description: "Clicking gains 5x as many points.",
      icon: "💪",
    },
    // Producer-specific upgrades
    {
      id: "upgrdprd1",
      name: "Faster Cursors",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 1000,
      producerID: "prdcr1",
      description: "Cursors are twice as efficient.",
      icon: "🖱️",
    },
    {
      id: "upgrdprd2",
      name: "Intern Training",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 10000,
      producerID: "prdcr2",
      description: "Interns are twice as efficient.",
      icon: "📚",
    },
    {
      id: "upgrdprd3",
      name: "Worker Union",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 100000,
      producerID: "prdcr3",
      description: "Workers are twice as efficient.",
      icon: "🔧",
    },
    {
      id: "upgrdprd4",
      name: "Robot Overclocking",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 1000000,
      producerID: "prdcr4",
      description: "Robots are twice as efficient.",
      icon: "⚡",
    },
    {
      id: "upgrdprd5",
      name: "Machine Learning",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 10000000,
      producerID: "prdcr5",
      description: "Machines are twice as efficient.",
      icon: "🧠",
    },
    {
      id: "upgrdprd6",
      name: "Factory Expansion",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 100000000,
      producerID: "prdcr6",
      description: "Factories are twice as efficient.",
      icon: "🏗️",
    },
    {
      id: "upgrdprd7",
      name: "Quantum Research",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 1000000000,
      producerID: "prdcr7",
      description: "Labs are twice as efficient.",
      icon: "🔬",
    },
    {
      id: "upgrdprd8",
      name: "Portal Calibration",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 20000000000,
      producerID: "prdcr8",
      description: "Portals are twice as efficient.",
      icon: "🌀",
    },
    {
      id: "upgrdprd9",
      name: "Temporal Flux",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 300000000000,
      producerID: "prdcr9",
      description: "Time Warps are twice as efficient.",
      icon: "⏳",
    },
    {
      id: "upgrdprd10",
      name: "Event Horizon",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 5000000000000,
      producerID: "prdcr10",
      description: "Singularities are twice as efficient.",
      icon: "🌑",
    },
    // Milestone upgrades (at 25 producers)
    {
      id: "mile_prd1_25",
      name: "Cursor Fleet",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 5000,
      producerID: "prdcr1",
      description: "Own 25 Cursors to unlock. 2x efficiency.",
      icon: "🎯",
    },
    {
      id: "mile_prd2_25",
      name: "Intern Army",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 50000,
      producerID: "prdcr2",
      description: "Own 25 Interns to unlock. 2x efficiency.",
      icon: "👥",
    },
    {
      id: "mile_prd3_25",
      name: "Worker Revolution",
      multiply: 2,
      type: UpgradeType.PRODUCER,
      price: 500000,
      producerID: "prdcr3",
      description: "Own 25 Workers to unlock. 2x efficiency.",
      icon: "⚒️",
    },
    // Milestone upgrades (at 50 producers)
    {
      id: "mile_prd1_50",
      name: "Cursor Swarm",
      multiply: 3,
      type: UpgradeType.PRODUCER,
      price: 50000,
      producerID: "prdcr1",
      description: "Own 50 Cursors to unlock. 3x efficiency.",
      icon: "🐝",
    },
    {
      id: "mile_prd2_50",
      name: "Intern Corporation",
      multiply: 3,
      type: UpgradeType.PRODUCER,
      price: 500000,
      producerID: "prdcr2",
      description: "Own 50 Interns to unlock. 3x efficiency.",
      icon: "🏢",
    },
    // Prod2click upgrades
    {
      id: "upgrdprod2clck1",
      name: "Synergy I",
      multiply: 0.01,
      type: UpgradeType.PROD2CLICK,
      price: 14000,
      description: "Each click gains +1% of your DPS.",
      icon: "🔗",
    },
    {
      id: "upgrdprod2clck2",
      name: "Synergy II",
      multiply: 0.01,
      type: UpgradeType.PROD2CLICK,
      price: 678000,
      description: "Each click gains +1% of your DPS.",
      icon: "🔗",
    },
    {
      id: "upgrdprod2clck3",
      name: "Synergy III",
      multiply: 0.02,
      type: UpgradeType.PROD2CLICK,
      price: 25000000,
      description: "Each click gains +2% of your DPS.",
      icon: "🔗",
    },
    {
      id: "upgrdprod2clck4",
      name: "Synergy IV",
      multiply: 0.03,
      type: UpgradeType.PROD2CLICK,
      price: 5000000000,
      description: "Each click gains +3% of your DPS.",
      icon: "🔗",
    },
    // ALL type upgrades
    {
      id: "upgrdall1",
      name: "Global Boost I",
      multiply: 2,
      type: UpgradeType.ALL,
      price: 10000000,
      description: "All production doubled!",
      icon: "🌍",
    },
    {
      id: "upgrdall2",
      name: "Global Boost II",
      multiply: 2,
      type: UpgradeType.ALL,
      price: 1000000000,
      description: "All production doubled again!",
      icon: "🌎",
    },
    {
      id: "upgrdall3",
      name: "Global Boost III",
      multiply: 3,
      type: UpgradeType.ALL,
      price: 500000000000,
      description: "All production tripled!",
      icon: "🌏",
    },
  ],

  producers: [
    {
      id: "prdcr1",
      name: "Cursor",
      produce: 1,
      basePrice: 15,
      icon: "🖱️",
    },
    {
      id: "prdcr2",
      name: "Intern",
      produce: 8,
      basePrice: 100,
      icon: "👨‍💼",
    },
    {
      id: "prdcr3",
      name: "Worker",
      produce: 50,
      basePrice: 1100,
      icon: "👷",
    },
    {
      id: "prdcr4",
      name: "Robot",
      produce: 300,
      basePrice: 12000,
      icon: "🤖",
    },
    {
      id: "prdcr5",
      name: "Machine",
      produce: 1500,
      basePrice: 130000,
      icon: "⚙️",
    },
    {
      id: "prdcr6",
      name: "Factory",
      produce: 8000,
      basePrice: 1400000,
      icon: "🏭",
    },
    {
      id: "prdcr7",
      name: "Lab",
      produce: 45000,
      basePrice: 20000000,
      icon: "🔬",
    },
    {
      id: "prdcr8",
      name: "Portal",
      produce: 250000,
      basePrice: 330000000,
      icon: "🌀",
    },
    {
      id: "prdcr9",
      name: "Time Warp",
      produce: 1500000,
      basePrice: 5100000000,
      icon: "⏳",
    },
    {
      id: "prdcr10",
      name: "Singularity",
      produce: 10000000,
      basePrice: 75000000000,
      icon: "🌑",
    },
  ],

  achievements: generateAchievements(),

  prestigeUpgrades: [
    {
      id: "prestige_prod",
      name: "Diamond Aura",
      description: "+25% production per level.",
      baseCost: 1,
      costScale: 1.5,
      effect: 0.25,
      maxLevel: 20,
      icon: "💎",
    },
    {
      id: "prestige_click",
      name: "Diamond Touch",
      description: "+50% click power per level.",
      baseCost: 1,
      costScale: 1.5,
      effect: 0.5,
      maxLevel: 20,
      icon: "✨",
    },
    {
      id: "prestige_start",
      name: "Head Start",
      description: "Start with bonus points after prestige.",
      baseCost: 2,
      costScale: 2,
      effect: 1000,
      maxLevel: 10,
      icon: "🚀",
    },
    {
      id: "prestige_cost",
      name: "Bargain Hunter",
      description: "-5% producer costs per level.",
      baseCost: 3,
      costScale: 2,
      effect: 0.05,
      maxLevel: 10,
      icon: "🏷️",
    },
    {
      id: "prestige_offline",
      name: "Dream Worker",
      description: "+10% offline earnings per level.",
      baseCost: 2,
      costScale: 1.5,
      effect: 0.1,
      maxLevel: 10,
      icon: "🌙",
    },
    {
      id: "prestige_golden",
      name: "Lucky Charm",
      description: "Golden cookies appear 15% more often per level.",
      baseCost: 3,
      costScale: 2,
      effect: 0.15,
      maxLevel: 5,
      icon: "🍀",
    },
  ],
};

function generateAchievements(): IAchievement[] {
  const achievements: IAchievement[] = [];

  // Clicking achievements
  const clickMilestones = [
    { n: 100, name: "First Steps", icon: "👣" },
    { n: 1000, name: "Click Novice", icon: "👆" },
    { n: 10000, name: "Click Apprentice", icon: "🖱️" },
    { n: 100000, name: "Click Master", icon: "⚡" },
    { n: 1000000, name: "Click Legend", icon: "🌟" },
  ];
  clickMilestones.forEach(({ n, name, icon }) => {
    achievements.push({
      id: `ach_clicks_${n}`,
      name,
      description: `Click ${n.toLocaleString()} times.`,
      category: AchievementCategory.CLICKING,
      icon,
      reward: 0.01,
      condition: { type: "totalClicks", target: n },
    });
  });

  // Total earned achievements
  const earnMilestones = [
    { n: 1000, name: "Pocket Change", icon: "🪙" },
    { n: 100000, name: "Small Fortune", icon: "💰" },
    { n: 10000000, name: "Millionaire", icon: "💵" },
    { n: 1000000000, name: "Billionaire", icon: "💎" },
    { n: 1000000000000, name: "Trillionaire", icon: "👑" },
    { n: 1e15, name: "Quadrillionaire", icon: "🏆" },
  ];
  earnMilestones.forEach(({ n, name, icon }) => {
    achievements.push({
      id: `ach_earned_${n}`,
      name,
      description: `Earn ${n.toLocaleString()} total points.`,
      category: AchievementCategory.PRODUCTION,
      icon,
      reward: 0.02,
      condition: { type: "totalEarned", target: n },
    });
  });

  // Producer count achievements
  const producerNames = [
    "Cursor",
    "Intern",
    "Worker",
    "Robot",
    "Machine",
    "Factory",
    "Lab",
    "Portal",
    "Time Warp",
    "Singularity",
  ];
  const producerIcons = [
    "🖱️",
    "👨‍💼",
    "👷",
    "🤖",
    "⚙️",
    "🏭",
    "🔬",
    "🌀",
    "⏳",
    "🌑",
  ];

  [1, 25, 50, 100].forEach((count) => {
    producerNames.forEach((pName, idx) => {
      achievements.push({
        id: `ach_prd_${idx + 1}_${count}`,
        name:
          count === 1
            ? `First ${pName}`
            : `${count} ${pName}${count > 1 ? "s" : ""}`,
        description: `Own ${count} ${pName}${count > 1 ? "s" : ""}.`,
        category: AchievementCategory.PURCHASING,
        icon: producerIcons[idx],
        reward: count >= 50 ? 0.02 : 0.01,
        condition: {
          type: "producerCount",
          target: count,
          producerId: `prdcr${idx + 1}`,
        },
      });
    });
  });

  // DPS achievements
  const dpsMilestones = [
    { n: 100, name: "Getting Started", icon: "📈" },
    { n: 10000, name: "Production Line", icon: "📊" },
    { n: 1000000, name: "Mass Production", icon: "🏭" },
    { n: 1000000000, name: "Industrial Revolution", icon: "⚙️" },
    { n: 1000000000000, name: "Singularity Engine", icon: "🌌" },
  ];
  dpsMilestones.forEach(({ n, name, icon }) => {
    achievements.push({
      id: `ach_dps_${n}`,
      name,
      description: `Reach ${n.toLocaleString()} points per second.`,
      category: AchievementCategory.PRODUCTION,
      icon,
      reward: 0.02,
      condition: { type: "producerDps", target: n },
    });
  });

  // Prestige achievements
  const prestigeMilestones = [
    { n: 1, name: "Rebirth", icon: "🔄" },
    { n: 5, name: "Experienced", icon: "🔁" },
    { n: 10, name: "Veteran", icon: "⭐" },
    { n: 25, name: "Transcendent", icon: "🌠" },
  ];
  prestigeMilestones.forEach(({ n, name, icon }) => {
    achievements.push({
      id: `ach_prestige_${n}`,
      name,
      description: `Prestige ${n} time${n > 1 ? "s" : ""}.`,
      category: AchievementCategory.PRESTIGE,
      icon,
      reward: 0.05,
      condition: { type: "prestigeCount", target: n },
    });
  });

  // Upgrade count achievements
  const upgradeMilestones = [
    { n: 5, name: "Upgrader", icon: "⬆️" },
    { n: 15, name: "Power User", icon: "🔋" },
    { n: 25, name: "Upgrade Fanatic", icon: "🔥" },
  ];
  upgradeMilestones.forEach(({ n, name, icon }) => {
    achievements.push({
      id: `ach_upgrades_${n}`,
      name,
      description: `Purchase ${n} upgrades.`,
      category: AchievementCategory.PURCHASING,
      icon,
      reward: 0.02,
      condition: { type: "upgradeCount", target: n },
    });
  });

  return achievements;
}

export default config;
