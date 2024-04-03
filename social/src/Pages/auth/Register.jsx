import axios from "axios";
import { useState } from "react";

const Register = ({ formType, toggleForm }) => {
  const initialValue = {
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dob: "",
    role: "customer",
  };
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState(false);
  const [terms, setTerms] = useState();
  const [signUpData, setSignUpData] = useState(initialValue);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const [errIdMsg, setErrIdMsg] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !signUpData.name ||
      !signUpData.email ||
      !signUpData.phone ||
      !signUpData.password ||
      !signUpData.gender ||
      !signUpData.dob ||
      signUpData.password !== confirmPassword ||
      !terms
    ) {
      setErrorMsg(true);
      return false;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/fruit/user/`,
        signUpData
      );
      toggleForm("Email Verification");
      setSignUpData(initialValue);
      setErrIdMsg("");
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 400) {
        setErrIdMsg(error.response.data.error);
        return false;
      }
    }
  };

  return (
    <>
      {errIdMsg ? (
        <div className=" login-title themed-background-fire text-center">
          <p className="text-light">{errIdMsg} </p>
        </div>
      ) : (
        <></>
      )}
      <form
        className={`form-horizontal ${
          formType === "Register" ? "" : "display-none"
        }`}
      >
        <div className="form-group">
          <div className="col-xs-6">
            <div
              className={`input-group ${
                errorMsg && !signUpData.name && "has-error"
              } `}
            >
              <span className="input-group-addon">
                <i className="gi gi-user" />
              </span>
              <input
                type="text"
                required
                onChange={handleChange}
                id="register-firstname"
                name="name"
                className={`form-control input-lg `}
                placeholder="Name"
              />
            </div>
            {errorMsg && !signUpData.name && (
              <span className="text-danger">
                Please Enter User Name before SignUp
              </span>
            )}
          </div>
          <div className="col-xs-6">
            <div className={`input-group ${
                errorMsg && !signUpData.email && "has-error"
              } `}>
              <span className="input-group-addon">
                <i className="gi gi-envelope" />
              </span>
              <input
                onChange={handleChange}
                type="email"
                required
                name="email"
                className={`form-control input-lg `}
                placeholder="Email"
              />
            </div>
            {errorMsg && !signUpData.email && (
              <span className="text-danger">
                Please Enter Email before SignUp
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-6">
            <input
              onChange={handleChange}
              className={` form-control input-lg ${
                errorMsg && !signUpData.phone && "has-error"
              } `}
              type="number"
              required
              name="phone"
              placeholder="Phone Number"
            />
            {errorMsg && !signUpData.phone && (
              <span className="text-danger">
                Please Enter Phone Number Before SignUp
              </span>
            )}
          </div>
          <div className="col-xs-6">
            <input
              onChange={handleChange}
              type="date"
              required
              name="dob"
              className={` form-control input-lg ${
                errorMsg && !signUpData.dob && "has-error"
              } `}
              placeholder="Date of Birth"
            />
            {errorMsg && !signUpData.dob && (
              <span className="text-danger">
                Enter Date of Birth Before Signup
              </span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="col-xs-3 radio-inline ">Gender</label>
          <div className="col-xs-9">
            <label className="radio-inline" htmlFor="male">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label className="radio-inline" htmlFor="female">
              <input
                id="female"
                type="radio"
                name="gender"
                value="female"
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label className="radio-inline" htmlFor="other">
              <input
                id="other"
                type="radio"
                name="gender"
                value="other"
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
          {errorMsg && !signUpData.gender && (
            <span className="text-danger">Select Gender Before Signup</span>
          )}
        </div>

        <div className="form-group">
          <div className="col-xs-12">
            <div className={`input-group ${
                errorMsg && !signUpData.password && "has-error"
              } `}>
              <span className="input-group-addon">
                <i className="gi gi-asterisk" />
              </span>
              <input
                required
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={` form-control input-lg  `}
              />
            </div>
            {errorMsg && !signUpData.password && (
              <span className="text-danger">Enter Password Before Signup</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <div className={`input-group ${
                errorMsg && !signUpData.confirmPassword && "has-error"
              } `}>
              <span className="input-group-addon">
                <i className="gi gi-asterisk" />
              </span>

              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`form-control input-lg  `}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
              />
            </div>
            {errorMsg && signUpData.password !== confirmPassword && (
              <span className="text-danger">Password Does Not Match</span>
            )}
          </div>
        </div>
        <div className="form-group form-actions">
          <div className="col-xs-12">
          <label
              className="switch switch-primary"
              data-toggle="tooltip"
              title="Agree to the terms"
              htmlFor="exampleCheckbox12"
            >
              <input
                onChange={(e) => setTerms(e.target.checked)}
                className="checkbox_accept"
                type="checkbox"
                name="terms"
                id="exampleCheckbox12"
                defaultValue=""
              />
              {/* <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/> */}
              <span />
            </label>
            <a
              href="#modal-terms"
              data-toggle="modal"
              className=" theme_color_solid login_bottom_btn"
            >
              I agree with the Terms & Conditions of Clarity
            </a>
            
            {errorMsg && !terms && (
              <span className="text-danger">Accept Terms</span>
            )}
          </div>
          <div className="col-xs-6 text-right"></div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} className="login_btn">
            {" "}
            Register Account
          </button>
        </div>
        <div className="form-group">
          <div className="col-xs-12 text-center">
            <small>Do you have an account?</small>{" "}
            <a
              onClick={() => toggleForm("Login")}
              className="theme_color_solid login_bottom_btn"
            >
              <small>Login</small>
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
