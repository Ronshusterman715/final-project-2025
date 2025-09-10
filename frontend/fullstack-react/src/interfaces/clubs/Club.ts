import type { Address } from "./Address";
import type { Image } from "./Image";

export interface Club {
  _id?: string;
  name: string;
  description: string;
  type: string;
  ageRequirement: string;
  phone: string;
  email: string;
  openDays: string;
  openHours: string;
  image: Image;
  address: Address;
  likes: string[];
  createdAt?: Date;
}
