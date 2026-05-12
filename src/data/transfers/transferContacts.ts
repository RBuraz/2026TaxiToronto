export type ContactInfo = {
  company: string;
  driver: string;
  email: string;
  phone: string;
  whatsApp: string;
};

export type TransferVehicleKey =
  | "car"
  | "monovolumen"
  | "sClass"
  | "van"
  | "vClass"
  | "minibus"
  | "bus"
  | "bestOption";

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

const mladen_nincevic: ContactInfo = {
  company: "S-class",
  driver: "mladen_nincevic",
  email: "mladennincevic@gmail.com",
  phone: "385922476191",
  whatsApp: "385922476191",
};

export const transferVehicleContacts: Record<TransferVehicleKey, ContactInfo> =
  {
    car: tomislav_baricevic, // Zamijenjeno s radoslav_burazin
    monovolumen: tomislav_baricevic,
    sClass: mladen_nincevic,
    van: tomislav_baricevic,
    vClass: tomislav_baricevic,
    minibus: tomislav_baricevic,
    bus: tomislav_baricevic,
    bestOption: tomislav_baricevic,
  };
