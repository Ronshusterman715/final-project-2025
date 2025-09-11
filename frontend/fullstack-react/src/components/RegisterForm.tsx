import { useFormik, type FormikValues } from "formik";
import type { FunctionComponent } from "react";
import * as yup from "yup";

interface RegisterFormProps {}

const RegisterForm: FunctionComponent<RegisterFormProps> = () => {
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      image: "",
      alt: "",
    },
    validationSchema: yup.object({
      first: yup
        .string()
        .min(2, "Too Short!")
        .max(256, "Too Long!")
        .required("First name is required"),
      middle: yup.string().min(2, "Too Short!").max(256, "Too Long!"),
      last: yup
        .string()
        .min(2, "Too Short!")
        .max(256, "Too Long!")
        .required("Last name is required"),
      phone: yup
        .string()
        .matches(
          /^(?:\+972|0)(5\d|([2-4]|[7-9]))-?\d{7}$/,
          "Invalid israel phone number"
        )
        .required("Phone number is required"),
      email: yup
        .string()
        .trim()
        .lowercase()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email format"
        )
        .required("Email is required"),
      password: yup
        .string()
        .trim()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
          "Password must contain at least one uppercase letter, lowercase letter, number and special character (@$!%*?&). Length: 8-20 characters."
        )
        .required("Password is required"),
      image: yup
        .string()
        .trim()
        .lowercase()
        .matches(
          /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/,
          "Image must contain a valid url"
        ),
      alt: yup.string().min(2, "Too Short!").max(256, "Too Long!"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <>
      <div className="w-50 mx-auto py-3">
        <h1 className="display-1 text-center mb-4">Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="row g-3">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Jhon"
                  name="first"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first}
                />
                <label htmlFor="firstName">First Name</label>
                {formik.touched.first && formik.errors.first && (
                  <p className="text-danger">{formik.errors.first}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  placeholder=""
                  name="middle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middle}
                />
                <label htmlFor="middleName">Middle Name</label>
                {formik.touched.middle && formik.errors.middle && (
                  <p className="text-danger">{formik.errors.middle}</p>
                )}
              </div>
            </div>
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Doe"
                  name="last"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last}
                />
                <label htmlFor="lastName">Last Name</label>
                {formik.touched.last && formik.errors.last && (
                  <p className="text-danger">{formik.errors.last}</p>
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
                <label htmlFor="tel">Phone Number</label>
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
                  //   disabled={!isCreateMode}
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
          {/* {isCreateMode && (
            <> */}
          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=""
                  name="password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <label htmlFor="password">Password</label>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </div>
            </div>
          </div>
          {/* </>
          )} */}

          <div className="row g-2">
            <div className="col-md">
              <div className="form-floating mb-3">
                <input
                  type="url"
                  className="form-control"
                  id="image"
                  placeholder=""
                  name="image"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.image}
                />
                <label htmlFor="image">Profile Image</label>
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
                  placeholder=""
                  name="alt"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.alt}
                />
                <label htmlFor="alt">Alternative Text</label>
                {formik.touched.alt && formik.errors.alt && (
                  <p className="text-danger">{formik.errors.alt}</p>
                )}
              </div>
            </div>
          </div>

          {/* {isCreateMode ? ( */}
          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className="btn btn-primary mt-4"
          >
            Register
          </button>
          {/* ) : (
            <button
              disabled={!formik.isValid || !formik.dirty}
              type="submit"
              className="btn btn-primary mt-4"
            >
              Edit
            </button>
          )} */}
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
