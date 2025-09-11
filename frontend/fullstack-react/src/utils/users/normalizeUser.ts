import type { FormikValues } from "formik";
import type { User } from "../../interfaces/users/User";

export function normalizeUser(values: FormikValues): User {
  return {
    name: {
      first: values.first,
      middle: values.middle,
      last: values.last,
    },
    phone: values.phone,
    email: values.email,
    password: values.password,
    image: {
      url: values.image,
      alt: values.alt,
    },
  };
}
