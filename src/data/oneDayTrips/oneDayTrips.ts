export interface OneDayTripDestination {
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  distance: string;
  duration: string;
  highlights: string[];
  includes: string[];
  gallery?: string[];
}

export type ContactInfo = {
  company: string;
  driver: string;
  email: string;
  phone: string;
  whatsApp: string;
};

export type VehicleType =
  | "car"
  | "monovolumen"
  | "van"
  | "vClass"
  | "minibus"
  | "bus";

export type OneDayTripVehicleContact = ContactInfo & {
  price: number;
};

type DestinationVehicles = {
  [key in VehicleType]?: OneDayTripVehicleContact;
};

export type OneDayTripsContact = {
  [destination: string]: DestinationVehicles;
};

const tomislav_baricevic: ContactInfo = {
  company: "TORONTO",
  driver: "tomislav_baricevic",
  email: "tbaricevic0207@gmail.com",
  phone: "385955086993",
  whatsApp: "385955086993",
};

const radoslav_burazin: ContactInfo = {
  company: "PRINCIPIS",
  driver: "radoslav_burazin",
  email: "rburaz00@outlook.com",
  phone: "385955690132",
  whatsApp: "385955690132",
};

export const oneDayTripsDestinations: Record<string, OneDayTripDestination> = {
  "krka-national-park": {
    title: "Krka National Park",
    image: "/tours/krka/krka-1.jpg",
    shortDescription:
      "Discover the magnificent waterfalls and natural beauty of Krka National Park. Swim under the stunning Skradinski buk waterfall and explore traditional watermills.",
    fullDescription:
      "Experience the breathtaking beauty of Krka National Park, one of Croatia's most beloved natural wonders. The park is famous for its series of seven magnificent travertine waterfalls, with Skradinski buk being the longest and most impressive. You'll have the opportunity to swim in the crystal-clear waters near the falls (in designated areas), walk along wooden pathways, and explore traditional watermills and ethnographic exhibits. The park is also home to diverse flora and fauna, making it a paradise for nature lovers.",
    distance: "85 km",
    duration: "8-9 hours",
    highlights: [
      "Swim at the base of Skradinski buk waterfall",
      "Walk along scenic wooden pathways",
      "Visit traditional watermills",
      "Explore the ethnographic museum",
      "Boat ride through the national park",
    ],
    includes: [
      "Hotel pickup and drop-off in Split",
      "Private air-conditioned vehicle",
      "English-speaking driver",
      "Bottled water",
      "Free Wi-Fi in vehicle",
      "Flexible schedule",
    ],
    gallery: [
      "/tours/krka/krka-1.jpg",
      "/tours/krka/krka-2.jpg",
      "/tours/krka/krka-3.jpg",
      "/tours/krka/krka-4.jpg",
      "/tours/krka/krka-5.jpg",
      "/tours/krka/krka-6.jpg",
    ],
  },
  "plitvice-lakes": {
    title: "Plitvice Lakes",
    image: "/tours/plitvice/plitvice-1.jpg",
    shortDescription:
      "Visit Croatia's most famous national park, a UNESCO World Heritage site. Marvel at 16 terraced lakes connected by spectacular waterfalls.",
    fullDescription:
      "Embark on an unforgettable journey to Plitvice Lakes National Park, Croatia's oldest and largest national park and a UNESCO World Heritage site. The park is renowned for its 16 terraced lakes, interconnected by a series of waterfalls and cascades. Walk along wooden footbridges that wind through the lakes, take a boat ride across the largest lake, and marvel at the ever-changing colors of the water, from azure to green to gray. The park offers several hiking trails suitable for all fitness levels, allowing you to explore this natural wonder at your own pace.",
    distance: "220 km",
    duration: "11-12 hours",
    highlights: [
      "UNESCO World Heritage site",
      "16 terraced lakes with waterfalls",
      "Scenic boat ride across Kozjak lake",
      "Underground cave formations",
      "Wooden footbridge pathways",
    ],
    includes: [
      "Hotel pickup and drop-off in Split",
      "Private air-conditioned vehicle",
      "English-speaking driver",
      "Bottled water",
      "Free Wi-Fi in vehicle",
      "Flexible return time",
    ],
    gallery: [
      "/tours/plitvice/plitvice-1.jpg",
      "/tours/plitvice/plitvice-2.jpg",
      "/tours/plitvice/plitvice-3.jpg",
      "/tours/plitvice/plitvice-4.jpg",
      "/tours/plitvice/plitvice-5.jpg",
      "/tours/plitvice/plitvice-6.jpg",
    ],
  },
  dubrovnik: {
    title: "Dubrovnik",
    image: "/tours/dubrovnik/dubrovnik-1.jpg",
    shortDescription:
      "Explore the Pearl of the Adriatic. Walk the ancient city walls, discover Game of Thrones filming locations, and soak in the unique atmosphere.",
    fullDescription:
      'Journey to the magnificent city of Dubrovnik, famously known as the "Pearl of the Adriatic". This walled city on the Dalmatian coast is one of the world\'s most perfectly preserved medieval cities and a UNESCO World Heritage site. Walk the iconic city walls for breathtaking views of the Adriatic Sea and the red-roofed old town, explore the marble-paved Stradun, and discover filming locations from Game of Thrones. You\'ll have free time to explore the city\'s narrow streets, visit historical sites, or take a cable car to Mount Srđ for panoramic views.',
    distance: "230 km",
    duration: "12-14 hours",
    highlights: [
      "Walk the ancient city walls",
      "Explore Game of Thrones filming locations",
      "Visit the Rector's Palace",
      "Stroll down Stradun main street",
      "Cable car ride to Mount Srđ",
    ],
    includes: [
      "Hotel pickup and drop-off in Split",
      "Private air-conditioned vehicle",
      "English-speaking driver",
      "Bottled water",
      "Free Wi-Fi in vehicle",
      "Free time for independent exploration",
    ],
    gallery: [
      "/tours/dubrovnik/dubrovnik-1.jpg",
      "/tours/dubrovnik/dubrovnik-2.jpg",
      "/tours/dubrovnik/dubrovnik-3.jpg",
      "/tours/dubrovnik/dubrovnik-4.jpg",
      "/tours/dubrovnik/dubrovnik-5.jpg",
      "/tours/dubrovnik/dubrovnik-6.jpg",
    ],
  },
  zadar: {
    title: "Zadar",
    image: "/tours/zadar/zadar-1.jpg",
    shortDescription:
      "Experience the unique blend of ancient and modern in Zadar. Witness the famous Sea Organ and Greeting to the Sun, and explore Roman ruins.",
    fullDescription:
      "Discover the historic city of Zadar, a place where 3000 years of history meet modern architectural marvels. Walk through Roman ruins, medieval churches, and Venetian fortifications in the old peninsula. Experience the unique Sea Organ, an architectural sound art object that plays music by the waves, and watch a spectacular sunset while sitting on the Greeting to the Sun installation. Visit the Roman Forum, St. Donatus Church, and enjoy the vibrant atmosphere of this coastal gem. The drive along the coast offers spectacular views of the Adriatic islands.",
    distance: "160 km",
    duration: "10-11 hours",
    highlights: [
      "Experience the famous Sea Organ",
      "Watch sunset at Greeting to the Sun",
      "Explore Roman Forum ruins",
      "Visit St. Donatus Church",
      "Walk along the historic city walls",
    ],
    includes: [
      "Hotel pickup and drop-off in Split",
      "Private air-conditioned vehicle",
      "English-speaking driver",
      "Bottled water",
      "Free Wi-Fi in vehicle",
      "Flexible schedule",
    ],
    gallery: [
      "/tours/zadar/zadar-1.jpg",
      "/tours/zadar/zadar-2.jpg",
      "/tours/zadar/zadar-3.jpg",
      "/tours/zadar/zadar-4.jpg",
      "/tours/zadar/zadar-5.jpg",
      "/tours/zadar/zadar-6.jpg",
    ],
  },
};

export const oneDayTripsContact: OneDayTripsContact = {
  "krka-national-park": {
    car: {
      ...tomislav_baricevic, // Zamijenjeno s radoslav_burazin
      price: 220,
    },
    monovolumen: {
      ...tomislav_baricevic,
      price: 250,
    },
    van: {
      ...tomislav_baricevic,
      price: 270,
    },
    vClass: {
      ...tomislav_baricevic,
      price: 300,
    },
  },

  "plitvice-lakes": {
    car: {
      ...tomislav_baricevic, // Zamijenjeno s radoslav_burazin
      price: 500,
    },
    monovolumen: {
      ...tomislav_baricevic,
      price: 560,
    },
    van: {
      ...tomislav_baricevic,
      price: 600,
    },
    vClass: {
      ...tomislav_baricevic,
      price: 700,
    },
  },

  dubrovnik: {
    car: {
      ...tomislav_baricevic, // Zamijenjeno s radoslav_burazin
      price: 500,
    },
    monovolumen: {
      ...tomislav_baricevic,
      price: 550,
    },
    van: {
      ...tomislav_baricevic,
      price: 600,
    },
    vClass: {
      ...tomislav_baricevic,
      price: 700,
    },
  },

  zadar: {
    car: {
      ...tomislav_baricevic, // Zamijenjeno s radoslav_burazin
      price: 400,
    },
    monovolumen: {
      ...tomislav_baricevic,
      price: 450,
    },
    van: {
      ...tomislav_baricevic,
      price: 500,
    },
    vClass: {
      ...tomislav_baricevic,
      price: 600,
    },
  },
};