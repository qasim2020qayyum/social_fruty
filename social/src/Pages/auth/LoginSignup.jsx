import React, { useState } from "react";
import Modal from "./Modal";
import AuthLeft from "./AuthLeft";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";
import OtpVerification from "./OtpVerification";
import OtpResend from "./OtpResend";
import google from "../../assets/imgs/google.png";

const LoginSignup = () => {
  const [formType, setFormType] = useState("Login");

  const toggleForm = (type) => {
    setFormType(type);
  };
  return (
    <>
      <div style={{ background: "white" }} className="">
        <div className="row">
          <AuthLeft />
          <div
            style={{ marginTop: "5rem" }}
            className="col-md-5 col-md-offset-1 "
          >
            <div className="">
              <p className="login_title_right">Welcome,</p>
              <p className="login_title_right_a">
                {formType} to Fruity Chat Community{" "}
              </p>
              <p className={`login_title_right_b ${formType === "Register" ? "display-none" : ""}`}>
                Enter your email address and password below{" "}
              </p>
              <div className="login_google_btn_sep">
                <button className="login_google_btn">
                  <span>
                    <img src={google} alt="google" />{" "}
                  </span>{" "}
                  Sign Up with Google
                </button>
                <p className="login_google_email">
                  <span>____________________</span> Or use Email{" "}
                  <span>____________________</span>
                </p>
              </div>
            </div>

            <div className="">
              <Login formType={formType} toggleForm={toggleForm} />
              <ForgetPassword formType={formType} toggleForm={toggleForm} />
              <Register formType={formType} toggleForm={toggleForm} />
              <OtpVerification formType={formType} toggleForm={toggleForm} />
              <OtpResend formType={formType} toggleForm={toggleForm} />
            </div>
          </div>
        </div>
      </div>
      <Modal />
    </>
  );
};

export default LoginSignup;
