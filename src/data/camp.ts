export const BRAND = {
  NAME: "Dheera Sports Foundation",
  TAGLINE: "Forging Olympic Dreams. Awakening Conscious Spirits. Building a Legacy.",
  HERO_CTA_LINE: "Send us a child. We give you back an athlete.",
  CLOSING_LINE: "Learn. Evolve. Conquer.",
  TYPE: "Section 8 Non-Profit Company",
  LOCATION: "Gwalior, Madhya Pradesh",
  PHONE: "+91-8269799319",
  WHATSAPP: "+91-8269799319",
};

export const LEGAL = {
  CIN: "U93190MP2025NPL078552",
  INCORPORATED: "27 August 2025",
  PAN: "AALCD9742L",
  NITI_AAYOG_DARPAN: "MP/2025/0803251",
  MSME_UDYAM: "UDYAM-MP-20-0091915",
};

export const CAMP = {
  NAME: "Dheera Sports Transformation Summer Camp 2026",
  VENUE: "Facility at Shivpuri Link Road, Gwalior",
  START_DATE: "06 May 2026",
  END_DATE: "09 June 2026",
  DURATION: "35 Days",
  DAILY_TIMING: "7:00 AM – 10:00 AM",
  DAILY_HOURS: "3 Hours Daily",
  AGE_GROUP: "7 to 20 Years",
  CAPACITY: 120,
  SPORTS_PER_CHILD: 3,
  TOTAL_SPORTS: 6,
  STAFF_COUNT: 14,
  FEE: 12000,
  FEE_DISPLAY: "₹12,000 per child — ALL INCLUSIVE",
};

export const HERO_STATS = [
  { value: "120", label: "Children" },
  { value: "35",  label: "Days  |  06 May – 09 Jun" },
  { value: "6",   label: "Sports Available" },
  { value: "14",  label: "Professional Staff" },
];

export const SECONDARY_STATS = [
  { value: "₹12,000", label: "All Inclusive Fee" },
  { value: "7–20",    label: "Age Group (Years)" },
  { value: "7–10 AM", label: "Daily Timing  (3 Hours)" },
];

export const IMPORTANT_DATES = [
  { date: "19 April 2026", event: "Registration Opens — Online & WhatsApp", icon: "🚀" },
  { date: "28 April 2026", event: "Last Date to Register",                  icon: "⚠️" },
  { date: "05 May 2026",   event: "Personal timetables sent to all confirmed parents", icon: "📋" },
  { date: "06 May 2026",   event: "DAY 1 — Camp Begins!",                   icon: "🏊" },
  { date: "07–09 Jun 2026",event: "Closing Ceremony — Days 33, 34 & 35 (Parents Invited)", icon: "🏆" },
  { date: "09 June 2026",  event: "Last Day — Medal Ceremony, Performance Reports, Celebration", icon: "🎗️" },
];

export const SPORTS = [
  { id: "swimming",    name: "Swimming",    emoji: "🏊", seats_total: 40, coaches: 4, urgent: false, image: "/sport-swimming.jpg", color: "#aacae6" },
  { id: "football",    name: "Football",    emoji: "⚽", seats_total: 25, coaches: 2, urgent: false, image: "/sport-football.jpg", color: "#ff5745" },
  { id: "cricket",     name: "Cricket",     emoji: "🏏", seats_total: 25, coaches: 2, urgent: false, image: "/sport-cricket.jpg", color: "#ff5745" },
  { id: "basketball",  name: "Basketball",  emoji: "🏀", seats_total: 15, coaches: 2, urgent: false, image: "/sport-basketball.jpg", color: "#ffb4a9" },
  { id: "badminton",   name: "Badminton",   emoji: "🏸", seats_total: 10, coaches: 1, urgent: true, urgent_note: "Only 10 seats per slot — fills first", image: "/sport-badminton.jpg", color: "#5ed9d6" },
  { id: "self_defence",name: "Self-Defence",emoji: "🥋", seats_total: 10, coaches: 1, urgent: true, urgent_note: "Only 10 seats per slot — fills first", image: "/sport-self-defence.png", color: "#ff8a7d" },
];

export const SPORTS_URGENT_BANNER = "⚠️ Badminton and Self-Defence have only 10 seats per time slot — register early.";

export const SPORT_COMBOS = [
  { name: "The Classic Athlete",    sports: ["swimming", "football", "cricket"] },
  { name: "The Warrior Package",    sports: ["swimming", "badminton", "self_defence"] },
  { name: "The Land Sports Bundle", sports: ["football", "basketball", "badminton"] },
];

export const TRANSPORT = {
  POINTS: ["Maharaj Bada", "Chetakpuri", "Padav", "Collectorate"],
  NOTE: "Dheera provides free transport from 4 locations across Gwalior. No parent arrangement needed.",
};

export const TRANSFORMATION_PILLARS = [
  { icon: "💪", title: "PHYSICAL", body: "3 hours of coached sport burns 400–700 calories daily. Weight management. Cardiovascular endurance. Strength. Coordination. Motor skills. The body your child always had the potential for — finally unlocked." },
  { icon: "🥗", title: "NUTRITIONAL", body: "Daily high-protein breakfast. Weekly food awareness sessions. A nutritional guidance note goes home. By Day 35, your child will not just be fitter — they will understand why what they eat matters." },
  { icon: "🧠", title: "MENTAL", body: "Sports psychology every Saturday. Pressure handling. Resilience after failure. Focus under stress. Goal-setting discipline. These are not sports skills — they are life skills. They show up in the classroom, in the boardroom, and in every moment that matters." },
  { icon: "❤️", title: "EMOTIONAL", body: "Winning without arrogance. Losing without collapse. Friendships across school boundaries. Confidence that stays long after the camp ends. Sport is the world's greatest emotional education." },
  { icon: "🌅", title: "DISCIPLINE", body: "35 mornings of showing up. By Day 35, that is no longer a habit — it is a character. The child who could not wake at 6:00 AM will do so naturally. The child who quit easily will know what it means to finish." },
];

export const TRANSFORMATION_PROOF_LINE = "On Day 1, we measure every child's performance and body measurements. On Day 35, we measure again. Every child receives their personal Before & After Athletic Report. The numbers will speak for themselves.";

export const INCLUSIONS_CORE = [
  { icon: "🏊", title: "35 Days of Professional Coaching",     desc: "Not a playground. A performance programme under qualified coaches across 6 Olympic-pathway sports." },
  { icon: "🍳", title: "Daily Breakfast",      desc: "They eat like athletes. Nutritious, real food from Day 1. No junk. No shortcuts." },
  { icon: "🥗", title: "Nutritional Counselling",              desc: "They learn to fuel their body, not just fill it. A personalised nutrition guidance note goes home." },
  { icon: "🧠", title: "Sports Psychology",   desc: "Pressure handling. Resilience. Focus. Goal-setting. Skills that transfer directly to the classroom — and to life." },
  { icon: "🧘", title: "Daily Yoga Cool-Down",                 desc: "Flexibility, breathing, body awareness — ancient science applied to modern athletic performance. Habits that stay for life." },
  { icon: "📊", title: "Day 1 vs Day 35 Athletic Assessment",  desc: "Parents see the change in numbers. Laps swum, distance run, coordination score. Measurable transformation." },
  { icon: "📋", title: "Personal Performance Report",          desc: "Personality & performance evaluation tracked by our expert coaches across all 35 days." },
  { icon: "👕", title: "Dheera T-Shirt",                      desc: "They wear the identity. They become part of something bigger than a summer holiday." },
  { icon: "🏅", title: "Competitions, Medals & Certificates", desc: "Public acknowledgement of 35 days of commitment. A moment they will remember for years." },
  { icon: "🚌", title: "Transport (4 City Pick-Up Points)",    desc: "Maharaj Bada │ Chetakpuri │ Padav │ Collectorate. Door-to-campus-to-door." },
  { icon: "🎗️", title: "Closing Ceremony",                    desc: "Finals, time trials, medals, Before & After reports, and a celebration that will make Gwalior sit up." },
];

export const INCLUSIONS_FREE = [
  { icon: "🧘", title: "Yoga Sessions",               badge: "FREE", desc: "Structured yoga as athletic science. Strength, balance, and breath control built into the daily programme." },
  { icon: "🧘", title: "Meditation Sessions",         badge: "FREE", desc: "The stillest athletes are often the fiercest competitors. Daily moments of silence teach children how to find calm under pressure." },
  { icon: "🔔", title: "Sound Healing Sessions",     badge: "FREE", desc: "One of the most powerful tools for stress release and emotional reset. Children experience ancient healing science — many for the first time." },
  { icon: "💃", title: "Dance Sessions",             badge: "FREE", desc: "Expression, rhythm, coordination, joy. A child who can move freely is a child who is free. Movement as celebration." },
  { icon: "🏅", title: "Surprise Olympics Sport Session", badge: "FREE", desc: "One session — kept secret until the day — where children experience a real Olympic sport they may never have tried. Wonder and aspiration in one afternoon." },
];

export const INCLUSIONS_PARENTS = [
  { icon: "🧘",  title: "Yoga for Parents",                      badge: "FOR PARENTS", desc: "While their children train, parents are invited to join dedicated yoga sessions. Dheera transforms the whole family." },
  { icon: "📱",  title: "Online Nutrition Session",              badge: "FOR PARENTS", desc: "A live expert session on how to feed a young athlete. What to cook. What to avoid. How to support performance at home." },
  { icon: "🧠",  title: "Online Sports Psychology Session",      badge: "FOR PARENTS", desc: "How to be the parent an athlete needs — not the parent an athlete fears. A session that will change how you watch your child compete." },
  { icon: "👶",  title: "Online Child Growth & Development",     badge: "FOR PARENTS", desc: "Understanding your child's physical and emotional development through sport. How Dheera works with every age from 7 to 20." },
];

export const INCLUSIONS_SUMMARY = "11 Core Inclusions + 5 Free Value Addition for Kids + 4 Parent Programmes = 20 Touchpoints of Transformation";

export const REGISTRATION_STEPS = [
  { step: 1, title: "Call or WhatsApp Us",       detail: "+91-8269799319 │ Get Registration Form Link" },
  { step: 2, title: "Choose 3 Sports",            detail: "Select any 3 sports from 6. Seat availability confirmed via website." },
  { step: 3, title: "Fill Registration Form",     detail: "Name, age, school, emergency contact, transport point preferred." },
  { step: 4, title: "Pay ₹12,000",                detail: "Online transfer or UPI. Confirmation receipt sent immediately on WhatsApp." },
  { step: 5, title: "Receive Personal Timetable", detail: "Your child's fixed 3-sport daily schedule sent before Day 1." },
  { step: 6, title: "Day 1 — Camp Begins!",       detail: "06 May 2026. Child arrives at transport point or facility. Wristband. Timetable. Meets coach." }
];

export const FOUNDING_DIRECTORS = [
  { name: "Abhinav Upadhyay", role: "Director", credentials: "National Swimmer, India", bio: "Secretary, Para Sports Association of Madhya Pradesh (State Body of Paralympic Committee of India). Founder-Director, Dheera Sports Foundation.", color: "#ff5745" },
  { name: "Abhisar Verma",    role: "Director", credentials: "International Swimmer, India", bio: "MBA in Sports Management — Real Madrid Graduate School, Spain. Founder-Director, Dheera Sports Foundation.", color: "#aacae6" },
  { name: "Ashish Agarwal",   role: "Director", credentials: "Chartered Accountant (CA)", bio: "Joint Secretary — District Swimming Association, Gwalior. Founder-Director, Dheera Sports Foundation.", color: "#ffb4a9" },
];

export const EXPERT_TEAM = [
  { name: "Shubham Upadhyay", role: "Head Coach — Swimming", credentials: "Eklavya Awardee │ International Swimmer │ National Medalist │ National Record Holder", color: "#aacae6" },
  { name: "Dr. Sadhna Upadhyay", role: "Athlete Wellness & Health", credentials: "Homeopathic Doctor — Natural recovery, athlete health management", color: "#5ed9d6" },
  { name: "Deeksha Upadhyay", role: "Sports Psychology", credentials: "Sports Psychologist — Mental performance, pre-competition focus, athlete wellbeing", color: "#ffb4a9" },
  { name: "Rahul Khare", role: "Shooting Programme Lead", credentials: "National Medalist — Shooting", color: "#ff8a7d" },
  { name: "Mrs. Kiran Verma", role: "Yoga & Wellness Programme", credentials: "Masters in Yoga — Jiwaji University, Gwalior", color: "#ff5745" },
  { name: "Anahita", role: "Yoga Outreach & Community", credentials: "Prominent Yoga Instructor & Digital Influencer — community awareness and reach", color: "#ffb4a9" },
];

export const STAFF_TOTAL_LABEL = "12 Coaches + 2 Camp Managers = 14 Professional Staff";

export const PARENT_LETTER = `
Dear Parent,

Every summer, your child has a choice. They can spend 35 days on a screen,
at a tuition class, or doing nothing in particular.

Or they can spend 35 days becoming physically — mentally — emotionally
strong and focused.

At Dheera Sports Camp 2026, your child will swim, run, compete, and stretch.
They will eat like an athlete, think like a champion, and leave with a strength
they never knew they had.

We are not offering a recreational camp. We are offering a 35-day structured
transformation — guided by professional coaches, sports psychologists,
nutritional experts, and wellness practitioners.

On Day 1, we will measure your child. On Day 35, we will measure them again.
And the difference — in every number — will be the proof of what this summer meant.

Most parents hope for a good summer. Dheera parents watch it happen.

With deep respect for the trust you place in us,
Dheera Sports Foundation
Gwalior, Madhya Pradesh
`;

export const FOOTER = {
  TAGLINE: "Forging Olympic Dreams. Awakening Conscious Spirits.",
  ADDRESS: "Facility at Shivpuri Link Road, Gwalior, Madhya Pradesh",
  PHONE: "+91-8269799319",
  LEGAL_NOTE: "Dheera Sports Foundation — Section 8 Non-Profit Company │ CIN: U93190MP2025NPL078552 │ PAN: AALCD9742L │ NITI Aayog DARPAN: MP/2025/0803251",
};

export const WHATSAPP = {
  WELCOME: "👋 Welcome to Dheera Sports Camp 2026! How can we help?",
  MENU_BUTTONS: ["🏊 View Sports & Seats", "📋 Register My Child", "📅 Camp Dates & Details"],
  PAYMENT_CONFIRM: "✅ Registration confirmed! Your child's personal timetable will be sent by 5 May 2026. See you on 6 May! 🏆",
};

// ============================================================
// DOC 2: VISION, MISSION & IDENTITY
// ============================================================

export const SANSKRIT_SHLOKA = "शरीरमाद्यं खलु धर्मसाधनम्";
export const SANSKRIT_TRANSLATION = "The body is indeed the primary instrument of dharma.";
export const BRAND_SECONDARY_TAGLINE = "Swim. Evolve. Conquer.";
export const BRAND_IDENTITY_LINE = "We don't just train swimmers. We mold the Dheeras.";
export const BRAND_ONE_LINER = "Dheera Sports Foundation is not a sports academy. It is a movement.";

export const DHEERA_WORD_MEANING = {
  hindi: "धीर",
  pronunciation: "Dheera",
  meaning: "One who is steady in adversity, who possesses courage under pressure, who is patient in pursuit of purpose.",
  three_qualities: [
    { quality: "The Patience", to: "to endure" },
    { quality: "The Intellect", to: "to strategize" },
    { quality: "The Courage",  to: "to conquer" }
  ]
};

export const VISION_STATEMENT = "To create a generation of World-Class Athletes and Spiritually Awakened Leaders who will represent the nation on International platforms and lead the society with character and integrity.";

export const VISION_DIMENSIONS = [
  {
    number: "01",
    title: "World-Class Athletes — Not Just Good Swimmers",
    body: "We are building a pipeline. From a child who sees water for the first time in Gwalior — to a swimmer standing on the podium at the Asian Games, the World Championships, the Olympics. Every child who trains at Dheera is in that pipeline."
  },
  {
    number: "02",
    title: "Spiritually Awakened Leaders — Not Just Champions",
    body: "Sport teaches the body. Yoga, meditation, and conscious living teach the spirit. A Dheera athlete knows that victory is hollow without character — and that true leadership is service. We are building human beings, not just athletes."
  },
  {
    number: "03",
    title: "A Society with Character and Integrity — Not Just a Nation on the Podium",
    body: "Every coach, every parent, every scholarship child at Dheera is part of a society we are building — one where the privileged support the talented, where a child from a slum can dream at the same altitude as a child from a mansion."
  }
];

export const VISION_QUOTE = "If India has to stand on the Olympic podium, the journey must begin in a city like Gwalior. In a pool like ours. With a child like yours.";

export const MISSION_PILLARS = [
  {
    icon: "🏅",
    title: "Olympic Excellence",
    body: "To identify grassroots talent and provide them with scientific coaching, international exposure, and the infrastructure required to win medals at the Asian Games, World Championships, and the Olympics. We believe that somewhere in the streets of Gwalior right now, there is a child who will one day swim for India. We intend to find that child."
  },
  {
    icon: "🧬",
    title: "Holistic Education",
    body: "To democratize access to the science of Biomechanics (Body) and Meditation (Mind), ensuring our athletes are physically invincible and mentally calm. Excellence is not one-dimensional. The greatest athletes in history were not just fast — they were focused, disciplined, and unbreakable under pressure. We build all three."
  },
  {
    icon: "🤝",
    title: "Community Welfare",
    body: "To create a self-sustaining ecosystem where the privileged support the talented — ensuring no dream remains unfulfilled due to lack of resources. A child's potential should never be limited by their parent's bank balance. This is not charity. This is justice."
  }
];

export const TWO_PILLARS = [
  {
    icon: "🪷",
    title: "Ancient Wisdom",
    subtitle: "Yoga · Prana · Sangha · Dharma · Meditation",
    body: "Thousands of years of Indian civilisation taught us: the body is the first instrument of service. Harness Prana and you harness the universe. We bring this science — not as religion, but as performance technology — to every athlete at Dheera."
  },
  {
    icon: "🔬",
    title: "Modern Sports Science",
    subtitle: "Biomechanics · Data Coaching · Psychology · Nutrition",
    body: "The world's best athletes are not just talented — they are engineered. We bring the same data-driven, evidence-based coaching methodology used by Olympic programmes worldwide to the children of Gwalior."
  }
];

export const TWO_PILLARS_BRIDGE = "These two streams — ancient and modern — do not contradict each other. They complete each other.";

export const CORE_PILLARS = [
  {
    id: "aquatics",
    icon: "🏊",
    title: "Aquatics — The Path to Gold",
    intro: "Water is where champions are forged. The pool is not a recreational facility at Dheera — it is a crucible. Every length swum is data. Every breath is measured. Every stroke is refined.",
    infrastructure_note: "We are building the region's first Stainless Steel Swimming Infrastructure — a 25m × 25m all-weather indoor pool. Stainless steel is the international standard for competition pools. It is hygienic, durable, and precise.",
    sub_pillars: [
      {
        icon: "📊",
        title: "High-Performance Training",
        points: [
          "Data-driven coaching aligned with global SFI standards",
          "Video analysis, biomechanical assessment",
          "Progressive overload protocols for every age group",
          "Periodization and competition preparation cycles"
        ]
      },
      {
        icon: "🔍",
        title: "Talent Scouting",
        points: [
          "Rigorous selection programmes to find Olympic DNA",
          "Testing agility, reaction time, endurance, technique",
          "Grassroots outreach — government schools, rural areas",
          "Early identification from age 6 — the earlier, the better"
        ]
      },
      {
        icon: "🌍",
        title: "International Connectivity",
        points: [
          "Regular webinars with global swimming science experts",
          "Exposure to international competition formats",
          "Knowledge sharing with national swimming federations",
          "Bridge between Gwalior's talent and the world's standards"
        ]
      }
    ]
  },
  {
    id: "wellness",
    icon: "🧘",
    title: "The Science of Wellness — Body · Mind · Energy",
    intro: "India's greatest contribution to human performance is not a supplement or a machine. It is the science of Prana — the understanding that energy, breath, and consciousness are performance variables that can be trained, refined, and optimised.",
    philosophy_quote: "The greatest athletes are not the ones who trained the hardest. They are the ones who understood their own body well enough to train the smartest.",
    sub_pillars: [
      {
        icon: "🌬️",
        title: "Yoga & Energy Management",
        points: [
          "Harness Prana for endurance and explosive recovery",
          "Pranayama as respiratory training — directly improves lung capacity",
          "Balance and core strength through asana practice",
          "Energy management for competition day pressure"
        ]
      },
      {
        icon: "🧠",
        title: "Mind Science",
        points: [
          "Sports psychology for pressure, victory, and defeat",
          "Pre-competition focus protocols",
          "Resilience training — the ability to lose and return",
          "Goal-setting science — progressive mental load"
        ]
      },
      {
        icon: "🥗",
        title: "Body Awareness",
        points: [
          "Nutritional education for athletes and parents",
          "Recovery protocols — what happens after training matters as much",
          "Anatomy education — understanding the machine",
          "Injury prevention through movement quality assessment"
        ]
      }
    ]
  },
  {
    id: "social",
    icon: "🤝",
    title: "Social Responsibility — The Discipline of Giving",
    intro: "Champions do not come only from privilege. They come from hunger. From the child who has something to prove. Dheera is committed to finding and funding that child.",
    sub_pillars: [
      {
        icon: "🎓",
        title: "Scholarships & Access",
        points: [
          "Subsidized training for EWS families — supported by Dheera Collective members",
          "Annual Dheera Scholarship Fund — full training + kit + competition fees",
          "20% of all training seats permanently reserved for BPL/EWS children",
          "No child turned away for inability to pay — a formal hardship fund maintained"
        ]
      },
      {
        icon: "🏊",
        title: "Swimming as Public Health",
        points: [
          "Community drives promoting swimming as a life-saving skill — drowning prevention",
          "Free water safety camps twice yearly — open to all Gwalior residents",
          "'Every Child Swims' — partnership with government schools for structured access",
          "Swimming as preventive healthcare — cardiovascular, respiratory, mental wellness"
        ]
      }
    ]
  }
];

export const SANGHA_HEADLINE = "It takes a village to raise a Champion.";
export const SANGHA_SUBLINE = "The Dheera Collective — Parents · Adult Swimmers · Mentors · Coaches — united by one shared purpose.";
export const SANGHA_INTRO = "The most important thing we have built at Dheera is not the pool. It is not the coaching methodology. It is the Sangha.";
export const SANGHA_DEFINITION = "Sangha — the ancient concept of community — is one of the three jewels of Indian philosophy, alongside Dharma (purpose) and Dhyana (awareness). In Sanskrit, Sangha means a community bound by shared values, mutual support, and collective aspiration.";

export const SANGHA_PILLARS = [
  {
    icon: "🔬",
    title: "Science of Existence",
    body: "We move beyond basic fitness to educate our community on Body Science, Mind Science, and Energy Science. Through exclusive webinars with international swimming science experts, we decode the physiology of excellence — and make it accessible to every family."
  },
  {
    icon: "💪",
    title: "The Power of Sangha",
    body: "This is a platform for mutual empowerment. We encourage community members to share their Skills, Resources, and Social Capital. Whether financial support, professional expertise, or networking — the Dheera Family stands together to uplift every child."
  },
  {
    icon: "🧑👧",
    title: "Conscious Parenting",
    body: "We train parents to be the emotional backbone of their athlete children. A parent who screams from the sideline creates anxiety. A parent who understands the science creates champions. Dheera trains both the swimmer and the family."
  }
];

export const DHEERA_ECOSYSTEM = [
  { icon: "🏊", label: "Athletes",  desc: "Train. Compete. Grow." },
  { icon: "👩👧", label: "Families",  desc: "Support. Learn. Grow." },
  { icon: "🧑🏫", label: "Coaches",   desc: "Guide. Science. Results." },
  { icon: "💼",  label: "Mentors",   desc: "Fund. Advise. Open Doors." },
  { icon: "🏅",  label: "India",     desc: "On the Podium." }
];

export const ECOSYSTEM_NOTE = "Each part of this ecosystem feeds the next. No one carries the weight alone.";

export const WHY_JOIN = [
  { icon: "🏊", come_for: "Growth",   leave_with: "An athlete — technically precise, physically strong, mentally unbreakable." },
  { icon: "💪", come_for: "Fitness",    leave_with: "A transformed body — not just lighter or faster, but fundamentally healthier in cardiovascular, muscular, and respiratory systems." },
  { icon: "🧠", come_for: "Focus",      leave_with: "A mind that handles pressure, sets goals, and bounces back from failure — skills that will serve your child in every exam, interview, and relationship for the rest of their life." },
  { icon: "🤝", come_for: "Community",  leave_with: "A family — the Dheera Collective — that will stand with you, celebrate your child, and ensure their dream is never limited by your resources." },
  { icon: "🌬️", come_for: "Sports",     leave_with: "A philosophy — the understanding that the body is sacred, effort is worship, and greatness is not given but earned through disciplined daily action." },
  { icon: "🏅", come_for: "A Medal",    leave_with: "A legacy — the knowledge that your child is part of the movement that will one day put India on the Olympic swimming podium." }
];

export const GWALIOR_PROMISE_OPENER = "There is a child in Gwalior today — perhaps in Lashkar, perhaps in Morar, perhaps near the Fort — who wakes up every morning with a dream that is too big for the world they were born into.";
export const GWALIOR_PROMISE_MIDDLE = "That child has the talent. They may not have the pool. The coach. The support. The\u00A0belief.";
export const GWALIOR_PROMISE_COMMITMENT = "Dheera Sports Foundation makes one promise: we will find that child. We will build the infrastructure they need. We will fund the journey they deserve. And we will stand behind them — as coaches, as mentors, as a community — until the day they stand on the podium.";
export const GWALIOR_HERITAGE_LINE = "Gwalior gave India Tansen. It gave India Rani Lakshmibai. It is the home of LNIPE — India's only sports university. All it needs now is a pool — and the people who believe in what can grow from it.";

export const LEGAL_ABOUT = {
  TAN: "BPLD09393G",
  BANK: "Axis Bank Limited",
  BANK_IFSC: "UTIB0000158",
  REGISTERED_ADDRESS: "A-3 Woods Residency, Sirol, Near District Education Office, Morar, Gwalior – 474006, MP",
  NIC_ACTIVITY: "93110 — Operation of Sports Facilities",
  ROC: "ROC Gwalior │ RD North Western Region │ Status: Active",
  EMAIL: "muktabhinav@gmail.com",
  ALTERNATE_PHONE: "+91-9074063030"
};
