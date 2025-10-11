import { useFormik, type FormikValues } from "formik";
import * as yup from "yup";
import { useEffect, useState, type FunctionComponent } from "react";
import { normalizeClub } from "../utils/clubs/normalizeClub";
import { createClub, getClubById, updateClub } from "../services/clubsService";
import { errorMessage, successMessage } from "../utils/ui/alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Club } from "../interfaces/clubs/Club";

interface ClubFormProps {}

const ClubForm: FunctionComponent<ClubFormProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isCreateMode = !id;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateFormValues = (club: Club) => {
    formik.setValues({
      name: club.name,
      description: club.description,
      type: club.type,
      phone: club.phone,
      email: club.email,
      ageRequirement: club.ageRequirement,
      openDays: club.openDays,
      openHours: club.openHours,
      image: club.image.url,
      alt: club.image.alt,
      country: club.address.country,
      city: club.address.city,
      street: club.address.street,
      houseNumber: club.address.houseNumber,
      floor: club.address.floor,
    });
  };

  useEffect(() => {
    if (id && location.state) {
      updateFormValues(location.state);
      setIsLoading(false);
    } else if (id) {
      getClubById(id)
        .then((res) => {
          updateFormValues(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleCreateSubmit = async (values: FormikValues) => {
    try {
      const normalizedClub = normalizeClub(values);
      const res = await createClub(normalizedClub);
      successMessage(`${res.data.name} created successfully`);
      navigate("/");
    } catch (err: any) {
      if (err.response.data)
        errorMessage(`failed to create card - ${err.response.data}`);
      else {
        errorMessage(`failed to create card`);
      }
    }
  };

  const handleEditSubmit = async (values: FormikValues) => {
    try {
      const normalizedClub = normalizeClub(values);
      const res = await updateClub(id!, normalizedClub);
      successMessage(`${res.data.name} updated successfully`);
      navigate("/");
    } catch (err: any) {
      if (err.response.data)
        errorMessage(`failed to create card - ${err.response.data}`);
      else {
        errorMessage(`failed to create card`);
      }
    }
  };

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      name: "",
      description: "",
      type: "",
      phone: "",
      email: "",
      ageRequirement: "",
      openDays: "",
      openHours: "",
      image: "",
      alt: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      floor: "",
    },
    validationSchema: yup.object({
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
      openHours: yup
        .string()
        .min(2)
        .max(256)
        .required("Open Hours is required"),
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
    }),
    onSubmit: isCreateMode ? handleCreateSubmit : handleEditSubmit,
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-50 mx-auto py-3">
        <h1 className="display-1 text-center mb-4">
          {isCreateMode ? "Card Creation" : "Card Edit"}
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="club name"
                  name="name"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <label htmlFor="name">Name</label>
                {formik.touched.name && formik.errors.name && (
                  <p className="text-danger">{formik.errors.name}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Club Description"
                  name="description"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                <label htmlFor="description">Description</label>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-danger">{formik.errors.description}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  placeholder="Club type"
                  name="type"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                />
                <label htmlFor="type">Type</label>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-danger">{formik.errors.type}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="tel"
                  className="form-control"
                  id="tel"
                  placeholder="+972"
                  name="phone"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <label htmlFor="tel">Phone</label>
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-danger">{formik.errors.phone}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="jhon@doe.com"
                  name="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                <label htmlFor="email">Email</label>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="ageRequirement"
                  placeholder="16+"
                  name="ageRequirement"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ageRequirement}
                />
                <label htmlFor="ageRequirement">Age Requirement</label>
                {formik.touched.ageRequirement &&
                  formik.errors.ageRequirement && (
                    <p className="text-danger">
                      {formik.errors.ageRequirement}
                    </p>
                  )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="openDays"
                  placeholder="Sunday, Monday, Wednesday"
                  name="openDays"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.openDays}
                />
                <label htmlFor="openDays">Days Open</label>
                {formik.touched.openDays && formik.errors.openDays && (
                  <p className="text-danger">{formik.errors.openDays}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="openHours"
                  placeholder="15:00 - 20:00"
                  name="openHours"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.openHours}
                />
                <label htmlFor="openHours">Hours Open</label>
                {formik.touched.openHours && formik.errors.openHours && (
                  <p className="text-danger">{formik.errors.openHours}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  placeholder="https://www.example.com/image.jpg"
                  name="image"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image}
                />
                <label htmlFor="image">Image url</label>
                {formik.touched.image && formik.errors.image && (
                  <p className="text-danger">{formik.errors.image}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="alt"
                  placeholder="Alternative text"
                  name="alt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.alt}
                />
                <label htmlFor="alt">Alternative text</label>
                {formik.touched.alt && formik.errors.alt && (
                  <p className="text-danger">{formik.errors.alt}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder=""
                  name="country"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country}
                />
                <label htmlFor="country">Country</label>
                {formik.touched.country && formik.errors.country && (
                  <p className="text-danger">{formik.errors.country}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  name="city"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                />
                <label htmlFor="city">City</label>
                {formik.touched.city && formik.errors.city && (
                  <p className="text-danger">{formik.errors.city}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder=""
                  name="street"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
                <label htmlFor="street">Street</label>
                {formik.touched.street && formik.errors.street && (
                  <p className="text-danger">{formik.errors.street}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="houseNumber"
                  placeholder=""
                  name="houseNumber"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseNumber}
                />
                <label htmlFor="houseNumber">House Number</label>
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <p className="text-danger">{formik.errors.houseNumber}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="floor"
                  placeholder=""
                  name="floor"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.floor}
                />
                <label htmlFor="floor">Floor Number</label>
                {formik.touched.floor && formik.errors.floor && (
                  <p className="text-danger">{formik.errors.floor}</p>
                )}
              </div>
            </div>
          </div>

          {isCreateMode ? (
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn btn-primary mt-4"
            >
              Create
            </button>
          ) : (
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn btn-primary mt-4"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default ClubForm;
