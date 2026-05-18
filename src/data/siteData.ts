import policyImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.14 PM (1).jpeg';
import ruralImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg';
import heritageImg from '../assets/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg';

export const NAV_MAIN = [
  "ABOUT US", "ADMISSIONS", "ACADEMICS", "Vedic Studies", "RESEARCH", "GURUKULAMS", "PUBLICATIONS", "CAMPUS LIFE", "RESOURCES", "ANNOUNCEMENTS"
];

export const NAV_SECONDARY = [
  "MEDIA ROOM", "AWARDS", "CONTACT US", "ALUMNI LOGIN", "HELP DESK", "GRIEVANCE PORTAL"
];

export const CAPACITY_PROGRAMS = [
  {
    text: "BUILD WITH AI - मई 2026\nHackDay Agra - Partnership Announcement\nTriyambakam Gurukulam Association - Official Co-Organiser",
    link: "https://drive.google.com/file/d/1qh_i5m78sX6ffAlZGEzeinNaGFf2w_-C/view?usp=drive_link"
  }
];

export const EDUCATION_ITEMS = [
  { title: "Vedic Vidya Peeth (Vedic Studies)\nIntegrated Course", subtitle: "Ancient scriptures meets modern logic", new: true, tag: "Admission 2026 Open: Apply Now for Personal Interview" },
  { title: "Admission Process for 18th Batch of Leadership Development 2026-28", subtitle: "Know More", new: false },
  { title: "Massive Open Online Course (MOOC)", subtitle: "MOOC on 'Vedic AI Ethics'", new: true, tag: "Know More" },
  { title: "Certificate Course on Cultural Management (CCCM)", subtitle: "Know More", new: true }
];

export const PUBLICATIONS = [
  { title: "Cultivating Intelligence", img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?w=200&q=80" },
  { title: "Importance of Languages", img: "https://images.unsplash.com/photo-1582213713374-132d439f0469?w=200&q=80" },
  { title: "Compendium of Vedic Studies", img: heritageImg }
];

export const POLICY_BRIEFS = [
  { title: "Vedic Education Policy", img: policyImg },
  { title: "Empowering Rural Schools", img: ruralImg },
  { title: "Cultural Heritage Preservation", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&q=80" }
];

export const NEWSLETTERS = [
  { title: "Gurukulam News Vol 4. Issue. 4", date: "Vol. 14, No. 4/2026" },
  { title: "Vol. 14, No. 4/2026", date: "Vol. 14, No. 4/2026" },
  { title: "Vol. 14, No. 3/2026", date: "Vol. 14, No. 3/2026" }
];

export const KEY_RESOURCES = [
  { title: "Annual Report 2025" },
  { title: "Vision 2050" },
  { title: "Academic Calendar" }
];

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
