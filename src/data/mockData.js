export const mockAssets = [
  {
    id: "M300-CONV-B",
    name: "M300 — Packout Conveyor B", 
    shortName: "M300 - Conv B",
    type: "Conveyor",
    shift_available: { "1. Shift": 72, "2. Shift": 81, "3. Shift": 58 },
    total_downtime_min: 247,
    events: [
      {
        id: "E-1041",
        date: "02/17/2026",
        time: "02:14",
        shift: "3. Shift",
        duration: 47,
        category: "TEC",
        operator_post: "Conveyor stopped again at the transfer point. Product piling up bad. This is the third time this week on nights.",
        thread: [
          { author: "J. Kowalski", role: "Operator", time: "02:17", text: "Confirmed, whole line is backed up. Had to pull product manually." },
          { author: "T. Barnes", role: "Maintenance", time: "02:31", text: "On site. Belt tension way off. Tensioner bolt backed out again. Adjusting now." },
          { author: "T. Barnes", role: "Maintenance", time: "02:58", text: "Belt re-tensioned and bolt loctited. Running. Root cause is vibration from the new motor — need dampeners long term." },
          { author: "M. Torres", role: "Supervisor", time: "03:05", text: "Back up. Loctite is a band-aid — let's get the dampener on the PM schedule." }
        ],
        resolved: true,
        open_action: "Add vibration dampener evaluation to PM schedule"
      }
    ]
  }
];

export const mockInsights = {
  "M300-CONV-B": {
    topComplaints: ["Belt tension failures", "Pneumatic pressure drops", "Vision system coolant intrusion"],
    pattern: "M300 has three active failure modes...",
    maintenanceActions: "Belt re-tensioned, pneumatic fitting replaced...",
    openActions: ["Add dampener to PM", "Air dryer inspection"],
    riskLevel: "HIGH",
    riskRationale: "Three failure modes in one week...",
    recommendation: "Assign maintenance review before next 3rd shift."
  }
};
