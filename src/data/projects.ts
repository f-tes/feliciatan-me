export type Building = {
  title: string;
  role?: string;
  period?: string;
  goal?: string;
  description?: string;
  bullets?: string[];
  tech?: string[];
  progress?: string;
  updated?: string;
};

// Add entries here; the section renders them automatically.
export const building: Building[] = [
  {
    title: "SSI",
    description: "Building a rocket, launching Dec 5, and helping out on a cubesat slated to launch in Winter 2027.",
    tech: ["rocket · launching Dec 5", "cubesat · Winter 2027"],
  },
  {
    title: "AnyNav",
    description: "Reframing object-goal navigation so that everything the agent perceives becomes a navigable point it can plan toward.",
    tech: ["embodied navigation", "spatial intelligence"],
  },
];

export type Past = {
  title: string;
  blurb: string;
  meta: string; // category / year-ish tag, only what was supplied
  details: string[];
  href?: string;
  image?: string;
  group?: string; // optional sub-heading in the archive
};

/** Optional one-line intro shown under a group heading. */
export const groupNotes: Record<string, string> = {
  "physics research": "Modelling and experiment under imperfect physical models: the same simulation-to-reality problem that embodied AI runs into.",
};

export const past: Past[] = [
  {
    title: "Zing",
    meta: "2026 – present",
    blurb: "Co-founder & CTO of an AI-native news platform that turns complex news into personalised, conversational audio, now live on the App Store and Google Play.",
    details: [
      "Co-Founder & Chief Technology Officer (CTO), 2026 – present",
      "Spearheaded the technical architecture and end-to-end development of Zing",
      "Engineered a multimodal AI content-generation pipeline integrating Claude Sonnet and ElevenLabs, with production infrastructure on Supabase and Railway",
      "Led product engineering from concept to public launch on the Apple App Store and Google Play, securing institutional contracts with 7 GP tuition centres and government schools in Singapore",
      "Tech stack: Claude Sonnet, ElevenLabs API, Supabase, Railway",
    ],
  },
  {
    title: "ECOSORT",
    meta: "robotics",
    blurb: "An amphibious robot that collects floating debris, with computer vision overseeing its operation. Deployed at three farms in Hainan with a 27% efficiency gain, and crowned International Champion at the Young Inventors Challenge.",
    details: ["Deployed at three farms in Hainan", "27% efficiency improvement", "International Champion, Young Inventors Challenge"],
  },
  {
    title: "GGS WTD",
    meta: "lead",
    blurb: "As lead, developed a web-based augmented reality experience used by 1000+ participants to resolve queue bottlenecks, and engineered a system tracking 30k of event logistics that replaced manual processes.",
    details: [
      "Developed a web AR experience used by 1000+ participants to resolve queue bottlenecks",
      "Engineered a system to track 30k of event logistics, replacing manual processes",
    ],
  },
  {
    title: "Exploro",
    meta: "app",
    blurb: "Co-developed and launched a SwiftUI app using MapKit that helps youths explore 150 city locations and stay active.",
    details: [
      "Designed the UI and built location-based challenges",
      "Released on the App Store and presented to Apple's Southeast Asia Head of Development",
      "Built through the Swift Accelerator",
    ],
  },
  {
    title: "Feathers",
    meta: "web",
    blurb: "A points-tracking platform for students, built with Next.js and Firebase: around 2,400 students served and about 400 monthly active users.",
    details: ["Next.js + Firebase", "~2,400 students served, ~400 monthly active users"],
  },
  {
    title: "Magnetic Gear",
    group: "physics research",
    meta: "computational dynamics & electromagnetic systems",
    blurb: "Non-contact rotational energy transfer between magnetically coupled systems, modelled numerically in Wolfram Mathematica and compared with experiment.",
    details: [
      "Investigated non-contact rotational energy transfer between magnetically coupled systems, studying how electromagnetic interactions govern angular motion and synchronization",
      "Developed numerical models in Wolfram Mathematica to simulate coupled rotational dynamics, incorporating magnetic torque, friction, and moment of inertia",
      "Compared simulated trajectories against experimental observations, investigating discrepancies between theoretical predictions and physical system behavior",
    ],
  },
  {
    title: "Jet Refraction",
    group: "physics research",
    meta: "computational fluid dynamics",
    blurb: "Computational fluid dynamics and experiments on how fluid jets deflect off inclined porous surfaces, with findings defended in technical debate.",
    details: [
      "Investigated the nonlinear behavior of fluid jets interacting with inclined porous surfaces, examining how flow conditions and surface geometry influence jet deflection",
      "Applied computational fluid dynamics (CFD) and experimental analysis to study jet trajectories, fluid–surface interactions, and the underlying mechanisms governing refraction",
      "Evaluated theoretical models against experimental observations and defended findings through scientific presentations and technical debate",
    ],
  },
  {
    title: "SHEcodes",
    group: "stem empowerment work",
    meta: "founder",
    blurb: "Founded a computing education initiative for girls: 210+ reached across 10 schools, monthly workshops, and a 50-hour AI/web incubator where 60 participants built for social causes.",
    href: "https://shecodesinsg.org/",
    details: [
      "210+ girls reached across 10 schools, with monthly workshops",
      "50-hour AI/web incubator: 60 participants building for social causes",
      "Science Castle partnership",
      "11 participants presented research to an international audience from five countries",
    ],
  },
  {
    title: "STEM Changemakers",
    group: "stem empowerment work",
    meta: "project lead",
    blurb: "Project Lead of an international STEM education programme across 3 countries, launched on $20K in grant funding, with a curriculum that reached 800+ students and 50 trained educators.",
    details: [
      "Secured $20K in grant funding to launch the programme",
      "Co-developed a scalable curriculum reaching 800+ students and trained 50 educators, enabling long-term sustainability and expansion",
    ],
  },
  {
    title: "NYLF Fellow",
    group: "stem empowerment work",
    meta: "fellowship",
    blurb: "Selected as one of 40 fellows from 400+ applications.",
    details: ["Co-planned and organised a youth volunteering fair for 327 attendees"],
  },
];
