import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutAction, userAction } from "../../redux/action";
// import { logoutAction, userAction } from "../redux/action";

const OtpVerification = ({ formType, toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resend, setResend] = useState(false);
  const initialValue = {
    email: "",
    otp: "",
  };

  const [errorMsg, setErrorMsg] = useState(false);
  const [terms, setTerms] = useState();
  const [signUpData, setSignUpData] = useState(initialValue);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.otp) {
      setErrorMsg(true);
      return false;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/fruit/user/otp-request`,
        signUpData
      );
      const { token } = response.data;
      const userData = response.data;
      dispatch(userAction(response.data));
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.user.role);
        sessionStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(logoutAction(true));
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("token");
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <form
      action="index.html"
      method="post"
      id="form-login"
      className={`form-horizontal ${
        formType === "Email Verification" ? "" : "display-none"
      }`}
    >
      <div className="form-group">
        <div className="col-xs-12">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="gi gi-envelope" />
            </span>
            <input
              onChange={handleChange}
              type="email"
              required
              className={` form-control input-lg ${
                errorMsg && !signUpData.email && "border-danger"
              } `}
              name="email"
              placeholder="Email"
            />
          </div>
          {errorMsg && !signUpData.email && (
            <span className="text-danger">Please Enter Email</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="col-xs-12">
          <div className="input-group">
            <span className="input-group-addon">
              <i className="gi gi-asterisk" />
            </span>
            <input
              onChange={handleChange}
              className={`form-control input-lg ${
                errorMsg && !signUpData.phone && "border-danger"
              } `}
              type="number"
              required
              name="otp"
              placeholder="Enter Otp"
            />
          </div>
          {errorMsg && !signUpData.phone && (
            <span className="text-danger">Please Enter OTP</span>
          )}
        </div>
      </div>
      <div className="form-group form-actions">
        <div className="col-xs-12 text-right">
          <button
            type="submit"
            onClick={handleSubmit}
            className="login_btn"
          >
              Submit
          </button>
        </div>
      </div>
      <div className="form-group">
        <div className="col-xs-12 text-center">
          <a onClick={() => toggleForm("Reminder")} className="theme_color_solid login_bottom_btn">
            <small>Forgot password?</small>
          </a>{" "}
          
          <a onClick={() => toggleForm("Otp Resend")} className="theme_color_solid login_bottom_btn">
            <small>Resend</small>
          </a>
        </div>
      </div>
    </form>
  );
};

export default OtpVerification;
