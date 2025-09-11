import type { FormikValues } from "formik";
import type { Auth } from "../../interfaces/Auth/Auth";

export function normalizeAuth(values: FormikValues): Auth {
  return {
    email: values.email,
    password: values.password,
  };
}
