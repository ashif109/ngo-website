import policyImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.14 PM (1).jpeg';
import ruralImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg';
import heritageImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg';

export const NAV_MAIN = [
  "ABOUT US", "ADMISSIONS", "ACADEMICS", "Vedic Studies", "RESEARCH", "GURUKULAMS", "PUBLICATIONS", "CAMPUS LIFE", "RESOURCES", "ANNOUNCEMENTS"
];

export const NAV_SECONDARY = [
  "MEDIA ROOM", "AWARDS", "CONTACT US", "ALUMNI LOGIN", "HELP DESK", "GRIEVANCE PORTAL", "ADMIN PORTAL"
];

export const CAPACITY_PROGRAMS = [];

// EDUCATION_ITEMS: fill with real courses/admissions when available from client
export const EDUCATION_ITEMS = [
  /*
  { title: "Vedic Vidya Peeth (Vedic Studies)\nIntegrated Course", subtitle: "Ancient scriptures meets modern logic", new: true, tag: "Admission 2026 Open: Apply Now for Personal Interview" },
  { title: "Admission Process for 18th Batch of Leadership Development 2026-28", subtitle: "Know More", new: false },
  { title: "Massive Open Online Course (MOOC)", subtitle: "MOOC on 'Vedic AI Ethics'", new: true, tag: "Know More" },
  { title: "Certificate Course on Cultural Management (CCCM)", subtitle: "Know More", new: true }
  */
];

// latest publications: fill with real books/publications when available from client
export const PUBLICATIONS = [];

// policy briefs: fill with real research briefs when available from client
export const POLICY_BRIEFS = [];

// newsletters: fill with real newsletters when available from client
export const NEWSLETTERS = [];

// key resources: fill with real downloadable assets when available from client
export const KEY_RESOURCES = [];

export const IMPACT_STATS = [
  { label: "Students Empowered", value: "15,000+", icon: "graduation" },
  { label: "Gurukulams Supported", value: "120+", icon: "building" },
  { label: "Villages Reached", value: "450+", icon: "map" },
  { label: "Research Publications", value: "200+", icon: "book" }
];

export const CORE_CAUSES = [
  {
    title: "Vedic Education",
    desc: "Reviving ancient wisdom for modern minds through structured Gurukulam programs.",
    img: policyImg,
    color: "bg-orange-600"
  },
  {
    title: "Cultural Heritage",
    desc: "Preserving and documenting the intangible heritage of Bharat for future generations.",
    img: heritageImg,
    color: "bg-blue-900"
  },
  {
    title: "Rural Welfare",
    desc: "Bringing sustainable development and education to the heart of rural India.",
    img: ruralImg,
    color: "bg-green-700"
  }
];
