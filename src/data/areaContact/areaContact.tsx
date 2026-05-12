export const vehicleInfo = {
  car: {
    image: "/fleet-jpg/sedan.jpg",
    title: "Standard Car",
    description:
      "Comfortable 4-door sedan with A/C. Ideal for 1-4 passengers with 3 suitcases.",
    defaultPrice: 15,
  },
  monovolumen: {
    image: "/fleet-jpg/monovolumen-new.jpg",
    title: "Monovolume / MPV",
    description:
      "Spacious family vehicle. Fits 4-6 passengers and luggage (up to 6 suitcases).",
    defaultPrice: 20,
  },
  van: {
    image: "/fleet-jpg/van.jpg",
    title: "Passenger Van",
    description:
      "Large group transport. Perfect for 8 passengers with 6 suitcases.",
    defaultPrice: 25,
  },
  vClass: {
    image: "/fleet-jpg/v-class.jpg",
    title: "Mercedes-Benz V-Class",
    description:
      "Luxury van with premium leather seats. Ideal for business or events. Fits up to 7 passengers with 6 suitcases.",
    defaultPrice: 30,
  },
};

// Tip za kontakt podatke tvrtke
type ContactInfo = {
  company: string;
  driver: string;
  email: string;
  phone: string;
  whatsApp: string;
};

// Tip za sva vozila - definiraj točno koja vozila postoje
export type VehicleType =
  | "car"
  | "monovolumen"
  | "van"
  | "vClass"
  | "minibus"
  | "bus";

// Tip za jednu lokaciju - svako vozilo ima ContactInfo
type LocationVehicles = {
  [key in VehicleType]: ContactInfo;
};

// Tip za cijeli areaContact objekt
type AreaContact = {
  [location: string]: LocationVehicles;
};

// Tvoji podaci
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

export const areaServed = {
  split: {
    cityName: "Split",
    path: "split",
    image: "/city/split.jpg",
    description:
      "Reliable taxi service in Split - whether you're traveling alone or in a group. We'll drive you on time to any address in the city. Your trusted transport provider in Split.",
    latitude: 43.51501771339725,
    longitude: 16.443305923846232,
  },
  "split-airport": {
    cityName: "Split Airport (RES)",
    path: "split-airport",
    image: "/city/split-airport.jpg",
    description:
      "Taxi service at Split Airport - waiting for you upon arrival with no reservation needed. For solo travelers and families, with or without luggage. The fastest way to your destination.",
    latitude: 43.53669085625234,
    longitude: 16.299727388585865,
  },
  "split-ferry-port": {
    cityName: "Split Ferry Port",
    path: "split-ferry-port",
    image: "/city/split-ferry-port.jpg",
    description:
      "Taxi transport at Split port - we welcome all ferries and catamarans. We organize transport for groups and individuals to all parts of the city and surrounding areas.",
    latitude: 43.50137473043062,
    longitude: 16.44173938657217,
  },
  trogir: {
    cityName: "Trogir",
    path: "trogir",
    image: "/city/trogir.jpg",
    description:
      "Your taxi in Trogir - for all needs, 24/7. We drive tourists to hotels, locals to work, groups on excursions. Safe and comfortable transport for everyone.",
    latitude: 43.51613182804004,
    longitude: 16.25174795955415,
  },
  omis: {
    cityName: "Omiš",
    path: "omis",
    image: "/city/omis.jpg",
    description:
      "Taxi service in Omiš - for all types of transport. Whether you need to go to the airport, Split, or nearby towns, we're here for you. For individuals and groups, always fair.",
    latitude: 43.443295707327955,
    longitude: 16.693082622456426,
  },
  kastela: {
    cityName: "Kaštela",
    path: "kastela",
    image: "/city/kastela.jpg",
    description:
      "Reliable taxi in Kaštela - years of experience in passenger transport. We serve locals and guests, for daily needs and special occasions. For 1 to 8 people.",
    latitude: 43.55911975263889,
    longitude: 16.36514019465052,
  },
  podstrana: {
    cityName: "Podstrana",
    path: "podstrana",
    image: "/city/podstrana.jpg",
    description:
      "Taxi transport in Podstrana - professional and punctual. We organize transfers for tourists, transport for weddings, events, and daily city rides. Alone or in a group, you're welcome.",
    latitude: 43.49350153691856,
    longitude: 16.552507481665476,
  },
  solin: {
    cityName: "Solin",
    path: "solin",
    image: "/city/solin.jpg",
    description:
      "Taxi service in Solin - for all generations. We drive you to work, shopping, doctor's appointments, or evening outings. Flexible, affordable, always available.",
    latitude: 43.53618767218408,
    longitude: 16.490186046548896,
  },
  dugopolje: {
    cityName: "Dugopolje",
    path: "dugopolje",
    image: "/city/dugopolje.jpg",
    description:
      "Taxi in Dugopolje - specialized for highway transport. Ideal for travelers who need to quickly reach Split or the airport. We drive solo passengers and entire groups without any problem.",
    latitude: 43.58201501573663,
    longitude: 16.598832437814355,
  },
  klis: {
    cityName: "Klis",
    path: "klis",
    image: "/city/klis.jpg",
    description:
      "Reliable taxi service in Klis - for locals and fortress visitors. We organize transport to the city, bus station, or for onward journeys. For all your needs.",
    latitude: 43.560858772606906,
    longitude: 16.521939094944358,
  },
};

export const areaContact: AreaContact = {
  split: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  "split-airport": {
    car: tomislav_baricevic,
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  "split-ferry-port": {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  trogir: {
    car: tomislav_baricevic,
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  omis: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  dugopolje: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  klis: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  kastela: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  podstrana: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
  solin: {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
  },
};
