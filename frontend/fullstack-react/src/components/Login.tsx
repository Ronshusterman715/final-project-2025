import type { FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, type FormikValues } from "formik";
import { loginUser } from "../services/authService";
import { normalizeAuth } from "../utils/auth/normalizeAuth";
import { errorMessage } from "../utils/ui/alert";

interface LoginProps {
  loginEvent: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ loginEvent }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FormikValues) => {
    try {
      const auth = normalizeAuth(values);
      const authResponse = await loginUser(auth);
      sessionStorage.setItem("token", authResponse.data);
      navigate("/");
      loginEvent();
    } catch (error) {
      errorMessage("Invalid email or password");
      console.log(error);
    }
  };

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
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
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="w-50 mx-auto py-3">
        <h1 className="display-1 text-center mb-4">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="johndoe@example.com"
              name="email"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <label htmlFor="email">Email Address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
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

          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
