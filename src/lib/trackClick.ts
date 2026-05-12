export type ClickMethod =
  | "call"
  | "whatsapp"
  | "whatsapp_location"
  | "email";

export type TrackClickPayload = {
  category: string;
  fullPath: string;
  fromLocation?: string;
  toLocation?: string;
  vehicle: string;
  company: string;
  driver: string;
  method: ClickMethod;
  value: number;
};

export async function trackClick(payload: TrackClickPayload) {
  try {
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch (error) {
    console.error("TRACK CLICK ERROR:", error);
  }
}