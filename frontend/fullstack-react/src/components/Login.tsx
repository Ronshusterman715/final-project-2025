import { useState, type FunctionComponent } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, type FormikValues } from "formik";
import { loginUser } from "../services/authService";
import { normalizeAuth } from "../utils/auth/normalizeAuth";
import { errorMessage } from "../utils/ui/alert";
import { saveToken } from "../utils/storage";

interface LoginProps {
  loginEvent: () => void;
}

const Login: FunctionComponent<LoginProps> = ({ loginEvent }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (values: FormikValues) => {
    try {
      const auth = normalizeAuth(values);
      const authResponse = await loginUser(auth);
      saveToken(authResponse.data, rememberMe);
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
          "Password must contain at least one uppercase letter, one lowercase letter, at least 4 numbers, and at least one special character (!@#$%^&*_-). No spaces allowed. Length: 8-20 characters."
        )
        .required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className="w-50 mx-auto py-3">
        <h1 className="display-1 text-center mb-4">Login</h1>
        <p className="text-muted mb-3">
          <span style={{ color: "red" }}>*</span> Indicates required field
        </p>
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
            <label htmlFor="email">
              Email Address <span style={{ color: "red" }}>*</span>
            </label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <label htmlFor="password">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <button
              type="button"
              className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                textDecoration: "none",
                zIndex: 10,
                marginTop: "-0.5rem",
              }}
            >
              <i className={`fas fa-eye${showPassword ? "-slash" : ""}`}></i>
            </button>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
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
