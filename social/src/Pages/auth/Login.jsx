import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeBackgroundColor, logoutAction, userAction } from "../../redux/action";

const Login = ({ formType, toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };
  const [errorMsg, setErrorMsg] = useState(false);
  const [signUpData, setSignUpData] = useState(initialValue);

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };
  const [errIdMsg, setErrIdMsg] = useState("");
  const [errStatus, setErrStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!signUpData.email || !signUpData.password) {
      setErrorMsg(true);
      return false;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/fruit/user/login`,
        signUpData
      );
      const { token } = response.data;
      dispatch(userAction(response.data.user));
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.user.role);
        sessionStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(changeBackgroundColor("themed-background-dark-default  themed-border-night"))
        navigate("/");
        dispatch(logoutAction(true));
      }
    } catch (error) {
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        setErrStatus(error.response.status);
        setErrIdMsg(error.response.data.error);
        return false;
      } else if (error.response && error.response.status === 403) {
        setErrStatus(error.response.status);
        setErrIdMsg(error.response.data.error);
        return false;
      } else if (error.response && error.response.status === 422) {
        setErrStatus(error.response.status);
        setErrIdMsg(error.response.data.error);
        return false;
      }
    }
  };

  return (
    <>
      <form
        action="index.html"
        method="post"
        id="form-login"
        className={`form-horizontal ${
          formType === "Login" ? "" : "display-none"
        }`}
      >
        <div className="form-group">
          <div className="col-xs-12">
            <div
              className={`input-group ${
                errorMsg && !signUpData.email && "has-error"
              } `}
            >
              <span className="input-group-addon">
                <i className="gi gi-envelope" />
              </span>
              <input
                onChange={handleChange}
                type="text"
                required
                className={`form-control input-lg  `}
                name="email"
                placeholder="Email"
              />
            </div>
            {errorMsg && !signUpData.email && (
              <span className="text-danger">Email is Required</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-12">
            <div
              className={`input-group ${
                errorMsg && !signUpData.password && "has-error"
              } `}
            >
              <span className="input-group-addon">
                <i className="gi gi-asterisk" />
              </span>
              <input
                onChange={handleChange}
                required
                className={`form-control input-lg `}
                type="password"
                name="password"
                placeholder="Your password *"
              />
            </div>
            {errorMsg && !signUpData.password && (
              <span className="text-danger">Password is Required</span>
            )}
          </div>
        </div>
        <div className="form-group form-actions">
          <div className="col-xs-12 text-right">
            <button
              type="submit"
              name="login"
              onClick={handleSubmit}
              className="login_btn"
            >
              Login
            </button>
          </div>
        </div>
        {/* <div className="form-group"> */}
          <div  className="col-xs-12 text-center">
            <a  className="theme_color_solid login_bottom_btn" onClick={() => toggleForm("Reminder")} >
              <small>Forgot password?</small>
            </a>{" "}
            -
            <a className="theme_color_solid login_bottom_btn" onClick={() => toggleForm("Register")} >
              <small>Create a new account</small>
            </a>
          </div>
        {/* </div> */}
      </form>
    </>
  );
};

export default Login;
