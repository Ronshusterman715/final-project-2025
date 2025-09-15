import type { FormikValues } from "formik";
import type { Club } from "../../interfaces/clubs/Club";

export function normalizeClub(values: FormikValues): Club {
  return {
    name: values.name,
    description: values.description,
    type: values.type,
    phone: values.phone,
    email: values.email,
    ageRequirement: values.ageRequirement,
    openDays: values.openDays,
    openHours: values.openHours,
    image: {
      url: values.image,
      alt: values.alt,
    },
    address: {
      country: values.country,
      city: values.city,
      street: values.street,
      houseNumber: values.houseNumber,
      floor: values.floor,
    },
  };
}
