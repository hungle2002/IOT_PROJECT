const modes = [
  {
    title: "AUTOMATIC",
    action: "Keep between",
  },
  {
    title: "SCHEDULED",
    action: "Turn on",
  },
  {
    title: "MANUAL",
    action: "Alert when out",
  },
];

export const DefaultModeSetting = [
  {
    mode: 0,
    safeAction: 1,
    schedStart: "06:00",
    schedEnd: "11:30",
    safeMin: 20,
    safeMax: 45,
    autoMin: 30,
    autoMax: 40,
    manualMin: 20,
    manualMax: 25,
    status: 258,
  },
  {
    mode: 1,
    safeAction: 2,
    autoMin: 50,
    autoMax: 70,
    schedStart: "06:00",
    schedEnd: "18:00",
    safeMin: 45,
    safeMax: 75,
    manualMin: 35,
    manualMax: 60,
    status: 50,
  },
  {
    mode: 2,
    safeAction: 0,
    autoMin: 50,
    autoMax: 70,
    schedStart: "06:00",
    schedEnd: "18:00",
    safeMin: 45,
    safeMax: 75,
    manualMin: 35,
    manualMax: 50,
    status: 50,
  },
];

export const ModeChoices = ["Automatic", "Scheduled", "Manual"];
export const SafeModeChoices = ["Ignore", "Alert", "Take action"];

export default modes;
