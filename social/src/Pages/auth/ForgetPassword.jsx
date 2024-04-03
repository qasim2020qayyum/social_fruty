import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ForgetPassword = ({ formType, toggleForm }) => {
  const [errorMsg, setErrorMsg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailResend, setEmailResend] = useState({
    email: "",
  });

  const handleEmailChange = (e) => {
    setEmailResend({
      ...emailResend,
      [e.target.name]: e.target.value,
    });
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    if (!emailResend.email) {
      setErrorMsg(true);
      return false;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/fruit/user/forget-password`,
        emailResend
      );
      toggleForm("Login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <>
      <form
        method="post"
        id="form-reminder"
        className={`form-horizontal ${
          formType === "Reminder" ? "" : "display-none"
        }`}
      >
        <div className="form-group">
          <div className="col-xs-12">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="gi gi-envelope" />
              </span>
              <input
                onChange={handleEmailChange}
                className={`form-control input-lg ${
                  errorMsg && !emailResend.email && "border-danger"
                } `}
                type="email"
                required
                name="email"
                placeholder="Email"
              />
            </div>
            {errorMsg && !emailResend.email && (
              <span className="text-danger">Please Enter Email</span>
            )}
          </div>
        </div>
        <div className="form-group form-actions">
          <div className="col-xs-12 text-right">
            <button onClick={resendOtp} type="submit" className="login_btn">
              Reset Password
            </button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12 text-center">
            <small>Did you remember your password?</small>{" "}
            <a onClick={() => toggleForm("Login")} className="theme_color_solid login_bottom_btn">
              <small>Login</small>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgetPassword;
