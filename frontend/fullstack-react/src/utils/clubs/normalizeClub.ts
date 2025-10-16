import type { FormikValues } from "formik";
import type { Club } from "../../interfaces/clubs/Club";

export function normalizeClub(values: FormikValues): Club {
  const address: any = {
    country: values.country,
    city: values.city,
    street: values.street,
    houseNumber: values.houseNumber,
  };

  if (
    values.floor !== "" &&
    values.floor !== null &&
    values.floor !== undefined
  ) {
    address.floor = values.floor;
  }

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
    address: address,
  };
}
