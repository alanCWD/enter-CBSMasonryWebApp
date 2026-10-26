/**
 * The public service pages: their copy, the upload category that fills each page's gallery,
 * and the single photos (hero, before / after) that are picked in the media library.
 * Adding a service page here wires it into the routes, the navigation and the media library.
 */

import {
  Droplets,
  Flame,
  HardHat,
  Layers,
  LayoutGrid,
  Mountain,
  type LucideIcon,
} from "lucide-react";

export interface ServiceSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  link?: { label: string; href: string };
  /** Set for long lists that read better across the full page width. */
  wide?: boolean;
}

export interface ServicePageDef {
  /** Used in the address, in the slot keys and as the route name. */
  slug: string;
  path: string;
  /** Short label for the navigation, footer and photo badges. */
  navLabel: string;
  icon: LucideIcon;
  /** Hero headline and the one-line subtitle beneath it. */
  title: string;
  subtitle: string;
  /** Upload category whose photos make up this page's project gallery. */
  folder: string;
  introHeading: string;
  lead: string[];
  highlights: string[];
  sections: ServiceSection[];
  media?: {
    videoId?: string;
    videoCaption?: string;
    /** Extra picture under the video, e.g. the AquaPave cross-section. */
    aside?: { slotKey: string; caption: string };
  };
  /** Home page card copy. */
  card: { blurb: string };
}

export interface ServiceSlotKeys {
  hero: string;
  before: string;
  after: string;
}

export const slotKeysForPage = (page: ServicePageDef): ServiceSlotKeys => ({
  hero: `${page.slug}-hero`,
  before: `${page.slug}-before`,
  after: `${page.slug}-after`,
});

/** The AquaPave cross-section drawing, kept from the original AquaPave page. */
export const AQUAPAVE_DIAGRAM_SLOT = "aquapave-diagram";

export const SERVICE_PAGES: ServicePageDef[] = [
  {
    slug: "concrete-construction",
    path: "/services/concrete-construction",
    navLabel: "Concrete Construction",
    icon: Layers,
    title: "Concrete Construction",
    subtitle:
      "Available in a variety of finishes and colours, decorative concrete has come a long way from the age-old square slabs",
    folder: "concrete",
    introHeading: "Decorative Concrete for Every Surface",
    lead: [
      "CBS Masonry Ltd. installs stamped, patterned and exposed aggregate concrete for patios, walkways, driveways, courts and commercial sites across Victoria, BC.",
      "Every finish is built on proper base preparation and drainage, so the surface you choose still performs years after the pour.",
    ],
    highlights: [
      "Stamped and patterned finishes in the surface of the concrete",
      "Exposed aggregate with natural rock and stone embedded by hand",
      "Micro-exposed textures using finer stone or sand",
      "Pigment staining for custom colour and special effects",
      "Patios, walkways, driveways and sport courts",
    ],
    sections: [
      {
        heading: "Stamped Concrete",
        paragraphs: [
          "If you are looking for a fresh look for your concrete surfaces, a pattern finish is an excellent choice and looks great on patios, walkways and driveways.",
          "Popular looks are created by \u2018drawing\u2019 lines into the surface of the concrete before it dries to create decorative patterns. Another method is using a special pattern that is \u2018stamped\u2019 into the concrete before it dries.",
          "Further variety and special effects can be achieved by staining the concrete with a pigment of your choice to create truly stunning effects.",
        ],
      },
      {
        heading: "Exposed Aggregate",
        paragraphs: [
          "Another very trendy and popular look is exposed aggregate, which is when we take natural rock and stones and embed them into the cement by hand so they are slightly exposed on the surface, giving the concrete a very attractive look and texture.",
          "You can also go with a micro-exposed texture where we use smaller stones or even sand to give a much finer texture.",
        ],
        link: { label: "View available finishes and colours", href: "http://www.interstar.ca/Download/ColorCharts" },
      },
    ],
    card: {
      blurb: "Stamped, patterned and exposed aggregate concrete for patios, walkways, driveways and courts.",
    },
  },
  {
    slug: "paving-stone-interlocking-brick",
    path: "/services/paving-stone-interlocking-brick",
    navLabel: "Paving Stone & Interlocking Brick",
    icon: LayoutGrid,
    title: "Paving Stone & Interlocking Brick",
    subtitle:
      "A beautiful way to integrate your landscaping and creating comfortable lounging and seating areas",
    folder: "paving-stone",
    introHeading: "Paving That Makes the Right First Impression",
    lead: [
      "Your driveway and walkways are often the first impression you make on anyone visiting your home, and having a cracked, stained or damaged driveway or patio often leaves a less than satisfactory impression on your guests.",
      "And if you are selling your home, the condition of your driveway, patio and walkways will set an impression on any prospective buyers even before they step foot inside.",
      "CBS Masonry Ltd. offers a full range of custom interlocking brick and paving stone options to suit any property style and design. Give us a call today for a no-obligation quote and assessment of your project needs.",
    ],
    highlights: [
      "Interlocking brick and paving stone driveways",
      "Patios, walkways and comfortable seating areas",
      "Edging, steps and retaining details to tie the project together",
      "Finishes and colours to match any property style",
      "Colour and product selection with our supply partners",
    ],
    sections: [
      {
        heading: "Paving Stone & Interlocking Brick",
        paragraphs: [
          "From compact walkways to full driveways and commercial plazas, we lay paving stone and interlocking brick with the base depth, compaction and joint work that keeps a surface flat and tight for years.",
          "We can help you choose the pattern, colour and border detail that suits your home, then quote the whole job — base preparation, installation and clean-up.",
        ],
      },
      {
        heading: "Colour and Product Options",
        paragraphs: [
          "Want to see what is available for your project? Our supply partners carry block and paver lines in a wide range of colours and styles, and we are happy to look at options together.",
        ],
        link: { label: "Browse block and paver options", href: "http://www.slegg.com/departments/blocks-and-pavers/" },
      },
    ],
    media: {
      videoId: "-E-9GENgOM4",
      videoCaption: "Central Saanich AquaPave\u00ae installation \u2014 CBS Masonry Ltd.",
    },
    card: {
      blurb: "Interlocking brick and paving stone driveways, patios, walkways and seating areas.",
    },
  },
  {
    slug: "natural-rock-stone",
    path: "/services/natural-rock-stone",
    navLabel: "Natural Rock & Stone",
    icon: Mountain,
    title: "Natural Rock & Stone",
    subtitle:
      "Create features that standout and amaze with our attention to detail and quality workmanship",
    folder: "natural-rock",
    introHeading: "Feature Stonework Built to Last",
    lead: [
      "Create awe-inspiring features like steps, sidewalks, patios, columns or facing walls using either natural rock or stone. Both are viable options — for authenticity, we use natural rock.",
      "Each installation is set on a properly prepared, drained base so the stonework holds its lines through West Coast winters.",
    ],
    highlights: [
      "Natural rock and stone steps, patios and sidewalks",
      "Columns, garden walls and facing walls",
      "Flagstone and culture stone applications",
      "Drainage, footing and structural detailing built in",
      "Design consultation to match stone to your home",
    ],
    sections: [
      {
        heading: "Natural Rock & Stone",
        paragraphs: [
          "For authenticity we build with natural rock, selecting pieces that suit the scale of the feature and setting them by hand so the finished work reads as part of the landscape rather than an addition to it.",
          "Steps, sidewalks, patios, columns and facing walls are all within reach — if you can picture it, we can build it.",
        ],
      },
      {
        heading: "Flagstone & Culture Stone",
        paragraphs: [
          "Flagstone and culture stone bring texture and warmth to pathways, patios and wall faces, and pair naturally with our rock work and paving installations.",
          "For authenticity, we use natural rock: bring us your ideas and we will match the material, colour and jointing to your home.",
        ],
      },
    ],
    card: {
      blurb: "Natural rock and stone steps, patios, columns and facing walls built to last.",
    },
  },
  {
    slug: "chimney-works",
    path: "/services/chimney-works",
    navLabel: "Chimney Works",
    icon: Flame,
    title: "Chimney Works",
    subtitle: "Whatever the chimney repair problem, CBS Masonry Ltd. is the solution",
    folder: "chimney",
    introHeading: "Chimney Repair, Restoration & Rebuilding",
    lead: [
      "Deteriorating concrete or mortar, moss build up, leaking and water damage and flaking paint are common signs that you are in need of chimney repair.",
      "Depending on the nature of the damage, you may need a full chimney repair, or a complete or partial rebuild. The only way to know for sure is to give us a call for a thorough inspection — we will give you a competitive estimate.",
    ],
    highlights: [
      "Chimney repairs, re-pointing and re-lining",
      "Partial and complete chimney rebuilds",
      "Reinforced concrete chimney caps, minimum 3 inches thick",
      "New clay tile flue liners and concrete chimney pots",
      "Flashing replacement and water damage repairs",
    ],
    sections: [
      {
        heading: "Chimney Repairs",
        paragraphs: [
          "Deteriorating concrete or mortar, moss build up, leaking and water damage and flaking paint are common signs that you are in need of chimney repair. Depending on the nature of the damage, you may need a full chimney repair, or a complete or partial rebuild.",
          "The only way to know for sure is to give us a call for a thorough inspection. We will give you a competitive estimate that will have your chimney looking amazing and up to code. We only use reputable tradesmen supplying quality workmanship.",
        ],
      },
      {
        heading: "Chimney Restoration & Rebuilding",
        paragraphs: [
          "Occasionally a chimney can become damaged or deteriorated beyond repair and will need either a partial or complete rebuild.",
          "With a complete rebuild, we remove the old chimney and rebuild it from the ground up. We will also inspect the condition of your chimney's foundation to determine whether it needs to be replaced as well.",
          "With a partial rebuild, we remove your old chimney to the minimum level required, and rebuild the chimney with new materials.",
        ],
      },
      {
        heading: "Chimney Re-pointing & Re-lining",
        paragraphs: [
          "Chimney re-lining is used to correct a common defect with chimneys: improper installation and faulty alignment. Chimney re-pointing involves fixing any visible lines on a chimney's framework.",
          "When properly aligned and pointed, your chimney will be more energy-efficient and environment-friendly, as well as help to prevent toxic substances, smoke or water from penetrating and leaking into your home.",
          "To view some of the brick options available for your chimney, we can point you to our local masonry supplier.",
        ],
      },
      {
        heading: "What to ask when obtaining a chimney estimate",
        paragraphs: [
          "These questions will ensure you are using a reputable, established and experienced masonry company, and that the work is carried out to a high standard with quality materials and a recognized guarantee.",
        ],
        bullets: [
          "Request to see a WCB Clearance Certificate for the current month, so their membership is current and protects you against liability for injuries on site.",
          "Request to see a liability insurance coverage certificate.",
          "Request to see a current business licence certificate.",
          "Confirm the scaffolding conforms to WCB rules, regulations and health and safety standards.",
          "Confirm they pour a reinforced concrete chimney cap, minimum 3 inches thick.",
          "Supply and fit of new clay tile chimney flue liners.",
          "Supply and fit of new concrete chimney pots, if required.",
          "Replace existing chimney flashings, if required.",
        ],
        wide: true,
      },
    ],
    card: {
      blurb: "Chimney repairs, rebuilding, re-pointing and re-lining to keep your home dry and safe.",
    },
  },
  {
    slug: "excavation",
    path: "/services/excavation",
    navLabel: "Excavation",
    icon: HardHat,
    title: "Excavation",
    subtitle: "Whatever your excavation needs, CBS Masonry has you covered",
    folder: "excavation",
    introHeading: "Site Work, Waterproofing & Retaining Walls",
    lead: [
      "CBS Masonry Ltd. offers a range of excavation services to cater to both small and large-scale needs. With a fleet of small excavators and larger Bobcats and excavators, we are well-equipped to handle various excavation requirements.",
      "We also handle the work that follows the dig — waterproofing, retaining walls and back filling — so your project is prepared properly from the ground up.",
    ],
    highlights: [
      "Small excavators for tight residential spaces",
      "Bobcats and larger excavators for site clearing and foundations",
      "Trenching, garden features and site preparation",
      "Waterproofing, flashing, sealants and drainage",
      "Retaining walls and back filling",
    ],
    sections: [
      {
        heading: "Small-Scale Excavation",
        paragraphs: [
          "For smaller projects, such as residential landscaping, trenching or site preparation, our small excavators are ideal. These versatile machines can navigate tight spaces and are perfect for digging trenches for utilities, creating garden features, or preparing the ground for small construction projects.",
        ],
      },
      {
        heading: "Large-Scale Excavation",
        paragraphs: [
          "When it comes to larger excavation needs, our larger machines are well suited to the job. They are capable of handling more extensive projects, including site clearing, foundation excavation and earthmoving for commercial and industrial developments.",
        ],
      },
      {
        heading: "Waterproofing",
        paragraphs: [
          "Water and moisture penetration is often found to be the culprit when we look at structural damage to a home, and our West Coast weather doesn't help either. Wind, rain and fluctuating hot and cold temperatures wear on your home over time, and the home needs to keep the water at bay.",
          "Proper flashing around chimneys, patching cracks and holes in stone, brick and stucco walls, and using the right sealants and drainage systems will ensure that your home stays dry. Give us a call for a thorough inspection and a competitive estimate.",
        ],
      },
      {
        heading: "Retaining Walls",
        paragraphs: [
          "Retaining walls can be practical or attractive, or both. Structurally speaking, retaining walls are used to contain earth, hold soil at different elevations and prevent erosion. They can also be used to add function and beauty to your yard.",
          "CBS Masonry has a great deal of experience when it comes to building and repairing retaining walls, and can help you determine what option will work best for your situation.",
        ],
      },
      {
        heading: "Back Filling",
        paragraphs: [
          "Back filling is a critical stage when it comes to new home construction, retaining walls or driveways. It involves filling and compacting areas of a home's concrete foundation, or preparing an area for concrete with specialized materials to ensure proper support and drainage.",
          "By preventing water damage, back filling ensures the long-term durability and stability of the project.",
        ],
      },
    ],
    card: {
      blurb: "Excavation, waterproofing, retaining walls and back filling for residential and commercial sites.",
    },
  },
  {
    slug: "aquapave",
    path: "/services/aquapave",
    navLabel: "AquaPave\u00ae System",
    icon: Droplets,
    title: "AquaPave\u00ae System",
    subtitle: "CBS Masonry Ltd. provides AquaPave\u00ae permeable paving solutions in Victoria, BC",
    folder: "aquapave",
    introHeading: "AquaPave\u00ae Installation",
    lead: [
      "CBS Masonry Ltd. recently completed a 15,000 square foot driveway AquaPave\u00ae System installation in Central Saanich. The AquaPave\u00ae system uses permeable concrete pavers that are eight centimetres in thickness.",
      "Beneath the pavers we install eight inches of three-quarter clear crushed rock with a top layer of bird's eye gravel. The excavation begins approximately 12 to 14 inches below grade, followed by a Geotextile fabric cloth base layer for structural support.",
      "On top of the gravel we apply the SC1000 with an Embitex layer of cloth, which contains living microfibres that clean the water as it drains through the system — making it a truly sustainable, self-permeable solution.",
    ],
    highlights: [
      "Self-permeable — water drains freely with no sand",
      "8 cm concrete pavers over 8 inches of three-quarter clear crushed rock",
      "SC1000 Embitex cloth layer with living microfibres to clean draining water",
      "Geotextile fabric base layer for structural integrity",
      "Concrete edging with three-quarter drain rock perimeter",
      "Suitable for driveways, walkways, courtyards and commercial lots",
    ],
    sections: [
      {
        heading: "How AquaPave\u00ae Works",
        paragraphs: [
          "This is a self-permeable system, so the water drains freely with no sand, and it is all aggregate. Once we are finished with the install of the pavers, we install the concrete edging with three-quarter drain rock to help keep everything tied in together and to give the perimeters of the driveway that extra pop.",
        ],
      },
      {
        heading: "A Sustainable Surface",
        paragraphs: [
          "Because water returns to the ground instead of running off, AquaPave\u00ae suits the West Coast climate — driveways, walkways, courtyards and commercial lots all benefit from a surface that drains freely and stays stable through the wet season.",
        ],
      },
    ],
    media: {
      videoId: "Wbkli6Gqa0w",
      videoCaption: "AquaPave\u00ae System \u2014 CBS Masonry Ltd.",
      aside: {
        slotKey: AQUAPAVE_DIAGRAM_SLOT,
        caption: "Cross-section of the AquaPave\u00ae permeable paving system layers",
      },
    },
    card: {
      blurb: "Permeable paving systems that drain freely and clean the water as it passes through.",
    },
  },
];

export const servicePageBySlug = (slug: string): ServicePageDef | undefined =>
  SERVICE_PAGES.find((page) => page.slug === slug);

/** The service page whose gallery is filled by photos in this upload category. */
export const servicePageForFolder = (folder: string): ServicePageDef | undefined =>
  SERVICE_PAGES.find((page) => page.folder === folder);
