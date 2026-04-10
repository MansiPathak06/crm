export const STATUSES = ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];
export const SOURCES = ["Website", "Facebook", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Event"];
export const USERS = ["Aarav Shah", "Priya Mehta", "Rohit Das", "Sneha Joshi", "Vikram Nair"];

export const STATUS_CONFIG = {
  New:       { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200",   dot: "bg-blue-500"   },
  Contacted: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", dot: "bg-yellow-500" },
  Qualified: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", dot: "bg-purple-500" },
  Proposal:  { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500" },
  Won:       { bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200",  dot: "bg-green-500"  },
  Lost:      { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200",    dot: "bg-red-500"    },
};

export const SOURCE_ICONS = {
  Website:        "🌐",
  Facebook:       "📘",
  Referral:       "🤝",
  LinkedIn:       "💼",
  "Cold Call":    "📞",
  "Email Campaign":"📧",
  Event:          "🎪",
};

export const INITIAL_LEADS = [
  { id: 1,  name: "Arjun Kapoor",    company: "TechSpark Pvt Ltd",   email: "arjun@techspark.in",    phone: "+91 98201 11234", source: "Website",         status: "New",       assigned: "Aarav Shah",  date: "2025-04-01", notes: "Interested in enterprise plan.", value: 120000 },
  { id: 2,  name: "Meera Pillai",    company: "Bloom Analytics",     email: "meera@bloomanalytics.com", phone: "+91 90001 22345", source: "LinkedIn",       status: "Contacted", assigned: "Priya Mehta", date: "2025-03-28", notes: "Follow up next week.", value: 85000 },
  { id: 3,  name: "Sameer Qureshi",  company: "NexGen Solutions",    email: "sameer@nexgen.io",      phone: "+91 88002 33456", source: "Referral",        status: "Qualified", assigned: "Rohit Das",   date: "2025-03-25", notes: "Needs custom integration.", value: 200000 },
  { id: 4,  name: "Divya Sharma",    company: "CloudBase India",     email: "divya@cloudbase.in",    phone: "+91 77003 44567", source: "Facebook",        status: "Proposal",  assigned: "Sneha Joshi", date: "2025-03-20", notes: "Proposal sent on 20th.", value: 150000 },
  { id: 5,  name: "Rajesh Nambiar",  company: "Zeta Fintech",        email: "rajesh@zetafintech.com",phone: "+91 99004 55678", source: "Cold Call",       status: "Won",       assigned: "Vikram Nair", date: "2025-03-15", notes: "Deal closed!", value: 310000 },
  { id: 6,  name: "Pooja Iyer",      company: "Sunrise Exports",     email: "pooja@sunriseexp.com",  phone: "+91 86005 66789", source: "Email Campaign",  status: "Lost",      assigned: "Aarav Shah",  date: "2025-03-10", notes: "Went with competitor.", value: 95000 },
  { id: 7,  name: "Kiran Malhotra",  company: "BlueBridge Tech",     email: "kiran@bluebridge.co",   phone: "+91 95006 77890", source: "Event",           status: "New",       assigned: "Priya Mehta", date: "2025-04-02", notes: "Met at startup summit.", value: 60000 },
  { id: 8,  name: "Ananya Reddy",    company: "GreenLeaf Corp",      email: "ananya@greenleaf.com",  phone: "+91 84007 88901", source: "Website",         status: "Contacted", assigned: "Rohit Das",   date: "2025-03-30", notes: "Showed interest in Pro plan.", value: 75000 },
  { id: 9,  name: "Vivek Tiwari",    company: "Orbit Systems",       email: "vivek@orbitsys.in",     phone: "+91 93008 99012", source: "Referral",        status: "Qualified", assigned: "Sneha Joshi", date: "2025-03-22", notes: "Referred by Rajesh.", value: 180000 },
  { id: 10, name: "Ishaan Bose",     company: "DataPulse",           email: "ishaan@datapulse.io",   phone: "+91 87009 00123", source: "LinkedIn",        status: "Proposal",  assigned: "Vikram Nair", date: "2025-03-18", notes: "Technical evaluation ongoing.", value: 220000 },
  { id: 11, name: "Nisha Choudhary", company: "VentureMate",        email: "nisha@venturemate.com", phone: "+91 96010 11234", source: "Facebook",        status: "Won",       assigned: "Aarav Shah",  date: "2025-03-05", notes: "Signed 1-year contract.", value: 400000 },
  { id: 12, name: "Aditya Verma",    company: "SmartOps",            email: "aditya@smartops.in",    phone: "+91 89011 22345", source: "Cold Call",       status: "Lost",      assigned: "Priya Mehta", date: "2025-02-28", notes: "Budget constraints.", value: 110000 },
];

export const ACTIVITY_FEED = [
  { type: "call",    label: "Call logged",         time: "2h ago",  user: "Aarav Shah"  },
  { type: "email",   label: "Email sent",           time: "1d ago",  user: "Priya Mehta" },
  { type: "meeting", label: "Meeting scheduled",    time: "2d ago",  user: "Rohit Das"   },
  { type: "note",    label: "Note added",           time: "3d ago",  user: "Sneha Joshi" },
  { type: "status",  label: "Status → Qualified",   time: "5d ago",  user: "Vikram Nair" },
];