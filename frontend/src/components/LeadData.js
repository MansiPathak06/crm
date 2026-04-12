export const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
export const SOURCES  = ["Website", "Facebook", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Event"];
export const USERS    = ["Aarav Shah", "Priya Mehta", "Rohit Das", "Sneha Joshi", "Vikram Nair"];

export const STATUS_CONFIG = {
  New:       { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200",   dot: "bg-blue-500"   },
  Contacted: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  Qualified: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", dot: "bg-purple-500" },
  Proposal:  { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500" },
  Won:       { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  Lost:      { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200",    dot: "bg-red-500"    },
};

export const SOURCE_ICONS = {
  Website:          "🌐",
  Facebook:         "📘",
  Referral:         "🤝",
  LinkedIn:         "💼",
  "Cold Call":      "📞",
  "Email Campaign": "📧",
  Event:            "🎪",
};

export const ACTIVITY_FEED = [
  { type: "call",    label: "Call logged",       time: "2h ago", user: "Aarav Shah"  },
  { type: "email",   label: "Email sent",         time: "1d ago", user: "Priya Mehta" },
  { type: "meeting", label: "Meeting scheduled",  time: "2d ago", user: "Rohit Das"   },
  { type: "note",    label: "Note added",         time: "3d ago", user: "Sneha Joshi" },
  { type: "status",  label: "Status → Qualified", time: "5d ago", user: "Vikram Nair" },
];