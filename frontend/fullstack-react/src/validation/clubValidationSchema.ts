import * as yup from "yup";

export const clubValidationSchema = yup.object({
  name: yup.string().min(2).max(256).required("Name is required"),
  description: yup
    .string()
    .min(2)
    .max(1024)
    .required("Description is required"),
  type: yup.string().min(2).max(256).required("Type is required"),
  phone: yup
    .string()
    .matches(
      /^(?:\+972|0)(5\d|([2-4]|[7-9]))-?\d{7}$/,
      "Invalid israel phone number"
    )
    .required("Phone is required"),
  email: yup
    .string()
    .trim()
    .lowercase()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  ageRequirement: yup
    .string()
    .min(1)
    .max(11)
    .required("Age Requirement is required"),
  openDays: yup.string().min(2).max(256).required("Open Days is required"),
  openHours: yup.string().min(2).max(256).required("Open Hours is required"),
  image: yup
    .string()
    .trim()
    .lowercase()
    .matches(
      /^((https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?|\/images\/[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp))$/,
      "Image must contain a valid url"
    ),
  alt: yup.string().min(2).max(256),
  country: yup.string().min(2).max(256).required("Country is required"),
  city: yup.string().min(2).max(256).required("City is required"),
  street: yup.string().min(2).max(256).required("Street is required"),
  houseNumber: yup.number().min(1).required("House Number is required"),
  floor: yup.number().min(0),
});
