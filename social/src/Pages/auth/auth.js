// import React, { useState } from "react";
// import Modal from "./Modal";
// import AuthLeft from "./AuthLeft";
// import Login from "./Login";
// import ForgetPassword from "./ForgetPassword";
// import Register from "./Register";
// import OtpVerification from "./OtpVerification";
// import OtpResend from "./OtpResend";

// const LoginSignup = () => {
//   const [formType, setFormType] = useState("Login");

//   const toggleForm = (type) => {
//     setFormType(type);
//   };
//   return (
//     <>
//       <div style={{background:'white'}} className="container">
//         <div className="row">
//           <AuthLeft />
//           <div className="col-md-7">
//             <div id="login-container">
//               <div className="login-title text-center">
//                 <h1>
//                   <strong>Welcome </strong> To <strong>Fruit Auction</strong>
//                 </h1>
//               </div>
//               <div className="login-title text-center">
//                 <h1>
//                   <strong>{formType}</strong>
//                 </h1>
//               </div>
//               <div className="block push-bit">
//                 <Login formType={formType} toggleForm={toggleForm} />
//                 <ForgetPassword formType={formType} toggleForm={toggleForm} />
//                 <Register formType={formType} toggleForm={toggleForm} />
//                 <OtpVerification formType={formType} toggleForm={toggleForm} />
//                 <OtpResend formType={formType} toggleForm={toggleForm} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal />
//     </>
//   );
// };

// export default LoginSignup;











// import React from 'react'

// const AuthLeft = () => {
//   return (
//     <div className="col-md-5 ">
//             <div id="login-alt-container">
//               {/* Title */}
//               <h1 className="push-top-bottom">
//                 <i className="gi gi-flash" /> <strong>Fruit Auction</strong>
//                 <br />
//                 <small>Welcome to Fruit Auction!</small>
//               </h1>
//               {/* END Title */}
//               {/* Key Features */}
//               <ul className="fa-ul text-muted">
//                 <li>
//                   <i className="fa fa-check fa-li text-success" /> Connect &amp;
//                   Chat
//                 </li>
//                 <li>
//                   <i className="fa fa-check fa-li text-success" /> Manager Your Business 
//                 </li>
//                 <li>
//                   <i className="fa fa-check fa-li text-success" /> Select Your Color 
//                 </li>
//                 <li>
//                   <i className="fa fa-check fa-li text-success" /> Share Your Thoughts
//                 </li>
//                 <li>
//                   <i className="fa fa-check fa-li text-success" /> .. and many
//                   more awesome features!
//                 </li>
//               </ul>
//               {/* END Key Features */}
//               {/* Footer */}
//               <footer className="text-muted push-top-bottom">
//                 <small>
//                   <span id="year-copy" /> ©{" "}
//                   <a href="https://fruitsauction.com/" target="_blank">
//                     Fruit Auction
//                   </a>
//                 </small>
//               </footer>
//               {/* END Footer */}
//             </div>
//           </div>
//   )
// }

// export default AuthLeft













// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const ForgetPassword = ({formType,toggleForm}) => {
//     const [errorMsg, setErrorMsg] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [emailResend, setEmailResend] = useState({
//     email: "",
//   });
 
//   const handleEmailChange = (e) => {
//     setEmailResend({
//       ...emailResend,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resendOtp = async (e) => {
//     e.preventDefault();
//     if (!emailResend.email) {
//       setErrorMsg(true);
//       return false;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/fruit/user/forget-password`,
//         emailResend
//       );
//       toggleForm("Login");
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   }; 
//   return (
//     <>
//       <form
//         method="post"
//         id="form-reminder"
//         className={`form-horizontal ${
//           formType === "Reminder" ? "" : "display-none"
//         }`}
//       >
//         <div className="form-group">
//           <div className="col-xs-12">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-envelope" />
//               </span>
//               <input
//                onChange={handleEmailChange}
//                className={`form-control input-lg ${
//                  errorMsg && !emailResend.email && "border-danger"
//                } `}
//                type="email"
//                required
//                name="email"
//                placeholder="Email"
                    
//               />
//             </div>
//             {errorMsg && !emailResend.email && (
//                             <span className="text-danger">
//                               Please Enter Email
//                             </span>
//                           )}
//           </div>
//         </div>
//         <div className="form-group form-actions">
//           <div className="col-xs-12 text-right">
//             <button   onClick={resendOtp} type="submit" className="btn btn-sm btn-primary">
//               <i className="fa fa-angle-right" /> Reset Password
//             </button>
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-12 text-center">
//             <small>Did you remember your password?</small>{" "}
//             <a onClick={() => toggleForm("Login")} id="link-reminder">
//               <small>Login</small>
//             </a>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ForgetPassword;



















// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutAction, userAction } from "../../redux/action";

// const Login = ({ formType, toggleForm }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const initialValue = {
//     email: "",
//     password: "",
//   };
//   const [errorMsg, setErrorMsg] = useState(false);
//   const [signUpData, setSignUpData] = useState(initialValue);

//   const handleChange = (e) => {
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const [errIdMsg, setErrIdMsg] = useState("");
//   const [errStatus, setErrStatus] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!signUpData.email || !signUpData.password) {
//       setErrorMsg(true);
//       return false;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/fruit/user/login`,
//         signUpData
//       );
//       const { token } = response.data;
//       dispatch(userAction(response.data.user));
//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", response.data.user.role);
//         sessionStorage.setItem("token", token);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         navigate("/");
//         dispatch(logoutAction(true));
//       }
//     } catch (error) {
//       console.log("error", error);
//       if (error.response && error.response.status === 401) {
//         setErrStatus(error.response.status);
//         setErrIdMsg(error.response.data.error);
//         return false;
//       } else if (error.response && error.response.status === 403) {
//         setErrStatus(error.response.status);
//         setErrIdMsg(error.response.data.error);
//         return false;
//       } else if (error.response && error.response.status === 422) {
//         setErrStatus(error.response.status);
//         setErrIdMsg(error.response.data.error);
//         return false;
//       }
//     }
//   };

//   return (
//     <>
//       <form
//         action="index.html"
//         method="post"
//         id="form-login"
//         className={`form-horizontal ${
//           formType === "Login" ? "" : "display-none"
//         }`}
//       >
//         <div className="form-group">
//           <div className="col-xs-12">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-envelope" />
//               </span>
//               <input
//                 onChange={handleChange}
//                 type="text"
//                 required
//                 className={`form-control input-lg ${
//                   errorMsg && !signUpData.email && "border-danger"
//                 } `}
//                 name="email"
//                 placeholder="Email"
//               />
//             </div>
//             {errorMsg && !signUpData.email && (
//               <span className="text-danger">Email is Required</span>
//             )}
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-12">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-asterisk" />
//               </span>
//               <input
//                 onChange={handleChange}
//                 required
//                 className={`form-control input-lg ${
//                   errorMsg && !signUpData.password && "border-danger"
//                 } `}
//                 type="password"
//                 name="password"
//                 placeholder="Your password *"
//               />
//             </div>
//             {errorMsg && !signUpData.password && (
//               <span className="text-danger">Password is Required</span>
//             )}
//           </div>
//         </div>
//         <div className="form-group form-actions">
//           <div className="col-xs-12 text-right">
//             <button
//               type="submit"
//               name="login"
//               onClick={handleSubmit}
//               className="btn btn-sm btn-primary"
//             >
//               <i className="fa fa-angle-right" /> Login
//             </button>
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-12 text-center">
//             <a onClick={() => toggleForm("Reminder")} id="link-reminder-login">
//               <small>Forgot password?</small>
//             </a>{" "}
//             -
//             <a onClick={() => toggleForm("Register")} id="link-register-login">
//               <small>Create a new account</small>
//             </a>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Login;





















// import React from 'react'

// const Modal = () => {
//   return (
//     <div
//         id="modal-terms"
//         className="modal"
//         tabIndex={-1}
//         role="dialog"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <button
//                 type="button"
//                 className="close"
//                 data-dismiss="modal"
//                 aria-hidden="true"
//               >
//                 ×
//               </button>
//               <h4 className="modal-title">Terms &amp; Conditions</h4>
//             </div>
//             <div className="modal-body">
//               <h4>Title</h4>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//               <h4>Title</h4>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//               <h4>Title</h4>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//               <p>
//                 Donec lacinia venenatis metus at bibendum? In hac habitasse
//                 platea dictumst. Proin ac nibh rutrum lectus rhoncus eleifend.
//                 Sed porttitor pretium venenatis. Suspendisse potenti. Aliquam
//                 quis ligula elit. Aliquam at orci ac neque semper dictum. Sed
//                 tincidunt scelerisque ligula, et facilisis nulla hendrerit non.
//                 Suspendisse potenti. Pellentesque non accumsan orci. Praesent at
//                 lacinia dolor. Lorem ipsum dolor sit amet, consectetur
//                 adipiscing elit.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default Modal



























// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const OtpResend = ({ formType, toggleForm }) => {
//   const [errorMsg, setErrorMsg] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [emailResend, setEmailResend] = useState({
//     email: "",
//   });

//   const handleEmailChange = (e) => {
//     setEmailResend({
//       ...emailResend,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const resendOtp = async (e) => {
//     e.preventDefault();
//     if (!emailResend.email) {
//       setErrorMsg(true);
//       return false;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/fruit/user/otp-resend`,
//         emailResend
//       );
//       toggleForm("Email Verification");
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   return (
//     <form
//       action="index.html"
//       method="post"
//       id="form-login"
//       className={`form-horizontal ${
//         formType === "Otp Resend" ? "" : "display-none"
//       }`}
//     >
//       <div className="form-group">
//         <div className="col-xs-12">
//           <div className="input-group">
//             <span className="input-group-addon">
//               <i className="gi gi-envelope" />
//             </span>
//             <input
//               onChange={handleEmailChange}
//               type="email"
//               required
//               className={`form-control input-lg ${
//                 errorMsg && !emailResend.email && "border-danger"
//               } `}
//               name="email"
//               placeholder="Email"
//             />
//           </div>
//           {errorMsg && !emailResend.email && (
//             <span className="text-danger">Please Enter Email</span>
//           )}
//         </div>
//       </div>

//       <div className="form-group form-actions">
//         <div className="col-xs-12 text-right">
//           <button
//             type="submit"
//             onClick={resendOtp}
//             className="btn btn-sm btn-primary"
//           >
//             <i className="fa fa-angle-right" /> Resend
//           </button>
//         </div>
//       </div>
//       <div className="form-group">
//         <div className="col-xs-12 text-center">
//           <a onClick={() => toggleForm("Reminder")} id="link-reminder-login">
//             <small>Forgot password?</small>
//           </a>{" "}
//           -
//           <a onClick={() => toggleForm("Login")} id="link-register-login">
//             <small>Login</small>
//           </a>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default OtpResend;






























// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { logoutAction, userAction } from "../../redux/action";
// // import { logoutAction, userAction } from "../redux/action";

// const OtpVerification = ({ formType, toggleForm }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [resend, setResend] = useState(false);
//   const initialValue = {
//     email: "",
//     otp: "",
//   };

//   const [errorMsg, setErrorMsg] = useState(false);
//   const [terms, setTerms] = useState();
//   const [signUpData, setSignUpData] = useState(initialValue);

//   const handleChange = (e) => {
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!signUpData.email || !signUpData.otp) {
//       setErrorMsg(true);
//       return false;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/fruit/user/otp-request`,
//         signUpData
//       );
//       const { token } = response.data;
//       const userData = response.data;
//       dispatch(userAction(response.data));
//       if (token) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("role", response.data.user.role);
//         sessionStorage.setItem("token", token);
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//         dispatch(logoutAction(true));
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   };

//   useEffect(() => {
//     const isLoggedIn = sessionStorage.getItem("token");
//     if (isLoggedIn) {
//       navigate("/");
//     }
//   }, [navigate]);
//   return (
//     <form
//       action="index.html"
//       method="post"
//       id="form-login"
//       className={`form-horizontal ${
//         formType === "Email Verification" ? "" : "display-none"
//       }`}
//     >
//       <div className="form-group">
//         <div className="col-xs-12">
//           <div className="input-group">
//             <span className="input-group-addon">
//               <i className="gi gi-envelope" />
//             </span>
//             <input
//               onChange={handleChange}
//               type="email"
//               required
//               className={` form-control input-lg ${
//                 errorMsg && !signUpData.email && "border-danger"
//               } `}
//               name="email"
//               placeholder="Email"
//             />
//           </div>
//           {errorMsg && !signUpData.email && (
//             <span className="text-danger">Please Enter Email</span>
//           )}
//         </div>
//       </div>
//       <div className="form-group">
//         <div className="col-xs-12">
//           <div className="input-group">
//             <span className="input-group-addon">
//               <i className="gi gi-asterisk" />
//             </span>
//             <input
//               onChange={handleChange}
//               className={`form-control input-lg ${
//                 errorMsg && !signUpData.phone && "border-danger"
//               } `}
//               type="number"
//               required
//               name="otp"
//               placeholder="Enter Otp"
//             />
//           </div>
//           {errorMsg && !signUpData.phone && (
//             <span className="text-danger">Please Enter OTP</span>
//           )}
//         </div>
//       </div>
//       <div className="form-group form-actions">
//         <div className="col-xs-12 text-right">
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="btn btn-sm btn-primary"
//           >
//             <i className="fa fa-angle-right" /> Submit
//           </button>
//         </div>
//       </div>
//       <div className="form-group">
//         <div className="col-xs-12 text-center">
//           <a onClick={() => toggleForm("Reminder")} id="link-reminder-login">
//             <small>Forgot password?</small>
//           </a>{" "}
//           -
//           <a onClick={() => toggleForm("Otp Resend")} id="link-register-login">
//             <small>Resend</small>
//           </a>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default OtpVerification;





























// import axios from "axios";
// import { useState } from "react";

// const Register = ({ formType, toggleForm }) => {
//   const initialValue = {
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "",
//     dob: "",
//     role: "customer",
//   };
//   const [confirmPassword, setConfirmPassword] = useState();
//   const [errorMsg, setErrorMsg] = useState(false);
//   const [terms, setTerms] = useState();
//   const [signUpData, setSignUpData] = useState(initialValue);

//   const handleChange = (e) => {
//     setSignUpData({
//       ...signUpData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const [errIdMsg, setErrIdMsg] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !signUpData.name ||
//       !signUpData.email ||
//       !signUpData.phone ||
//       !signUpData.password ||
//       !signUpData.gender ||
//       !signUpData.dob ||
//       signUpData.password !== confirmPassword ||
//       !terms
//     ) {
//       setErrorMsg(true);
//       return false;
//     }
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_BASE_URL}/fruit/user/`,
//         signUpData
//       );
//       toggleForm("Email Verification");
//       setSignUpData(initialValue)
//       setErrIdMsg("")
//     } catch (error) {
//       console.log("error", error);
//       if (error.response && error.response.status === 400) {
//         setErrIdMsg(error.response.data.error);
//         return false;
//       }
//     }
//   };

//   return (
//     <>
//       {errIdMsg ? (
//         <div className=" login-title themed-background-fire text-center">
//           <p className="text-light">{errIdMsg} </p>
//         </div>
//       ) : (
//         <></>
//       )}
//       <form
//         className={`form-horizontal ${
//           formType === "Register" ? "" : "display-none"
//         }`}
//       >
//         <div className="form-group">
//           <div className="col-xs-6">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-user" />
//               </span>
//               <input
//                 type="text"
//                 required
//                 onChange={handleChange}
//                 id="register-firstname"
//                 name="name"
//                 className={`form-control input-lg ${
//                   errorMsg && !signUpData.name && "has-error"
//                 } `}
//                 placeholder="Name"
//               />
//             </div>
//             {errorMsg && !signUpData.name && (
//               <span className="text-danger">
//                 Please Enter User Name before SignUp
//               </span>
//             )}
//           </div>
//           <div className="col-xs-6">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-envelope" />
//               </span>
//               <input
//                 onChange={handleChange}
//                 type="email"
//                 required
//                 name="email"
//                 className={`form-control input-lg ${
//                   errorMsg && !signUpData.email && "has-error"
//                 } `}
//                 placeholder="Email"
//               />
//             </div>
//             {errorMsg && !signUpData.email && (
//               <span className="text-danger">
//                 Please Enter Email before SignUp
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-6">
//             <input
//               onChange={handleChange}
//               className={` form-control input-lg ${
//                 errorMsg && !signUpData.phone && "has-error"
//               } `}
//               type="number"
//               required
//               name="phone"
//               placeholder="Phone Number"
//             />
//             {errorMsg && !signUpData.phone && (
//               <span className="text-danger">
//                 Please Enter Phone Number Before SignUp
//               </span>
//             )}
//           </div>
//           <div className="col-xs-6">
//             <input
//               onChange={handleChange}
//               type="date"
//               required
//               name="dob"
//               className={` form-control input-lg ${
//                 errorMsg && !signUpData.dob && "has-error"
//               } `}
//               placeholder="Date of Birth"
//             />
//             {errorMsg && !signUpData.dob && (
//               <span className="text-danger">
//                 Enter Date of Birth Before Signup
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="form-group">
//           <label className="col-xs-3 radio-inline ">Gender</label>
//           <div className="col-xs-9">
//             <label className="radio-inline" htmlFor="male">
//               <input
//                 type="radio"
//                 id="male"
//                 name="gender"
//                 value="male"
//                 onChange={handleChange}
//               />{" "}
//               Male
//             </label>
//             <label className="radio-inline" htmlFor="female">
//               <input
//                 id="female"
//                 type="radio"
//                 name="gender"
//                 value="female"
//                 onChange={handleChange}
//               />{" "}
//               Female
//             </label>
//             <label className="radio-inline" htmlFor="other">
//               <input
//                 id="other"
//                 type="radio"
//                 name="gender"
//                 value="other"
//                 onChange={handleChange}
//               />{" "}
//               Other
//             </label>
//           </div>
//           {errorMsg && !signUpData.gender && (
//             <span className="text-danger">Select Gender Before Signup</span>
//           )}
//         </div>

//         <div className="form-group">
//           <div className="col-xs-12">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-asterisk" />
//               </span>
//               <input
//                 required
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 className={` form-control input-lg ${
//                   errorMsg && !signUpData.password && "has-error"
//                 } `}
//               />
//             </div>
//             {errorMsg && !signUpData.password && (
//               <span className="text-danger">Enter Password Before Signup</span>
//             )}
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-12">
//             <div className="input-group">
//               <span className="input-group-addon">
//                 <i className="gi gi-asterisk" />
//               </span>

//               <input
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={`form-control input-lg ${
//                   errorMsg &&
//                   signUpData.password !== confirmPassword &&
//                   "border-danger"
//                 } `}
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm password"
//               />
//             </div>
//             {errorMsg && signUpData.password !== confirmPassword && (
//               <span className="text-danger">Password Does Not Match</span>
//             )}
//           </div>
//         </div>
//         <div className="form-group form-actions">
//           <div className="col-xs-6">
//             <a
//               href="#modal-terms"
//               data-toggle="modal"
//               className="register-terms"
//             >
//               Terms
//             </a>
//             <label
//               className="switch switch-primary"
//               data-toggle="tooltip"
//               title="Agree to the terms"
//               htmlFor="exampleCheckbox12"
//             >
//               <input
//                 onChange={(e) => setTerms(e.target.checked)}
//                 className="form-check-input"
//                 type="checkbox"
//                 name="terms"
//                 id="exampleCheckbox12"
//                 defaultValue=""
//               />
//               <span />
//             </label>
//             {errorMsg && !terms && (
//               <span className="text-danger">Accept Terms</span>
//             )}
//           </div>
//           <div className="col-xs-6 text-right">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="btn btn-sm btn-success"
//             >
//               <i className="fa fa-plus" /> Register Account
//             </button>
//           </div>
//         </div>
//         <div className="form-group">
//           <div className="col-xs-12 text-center">
//             <small>Do you have an account?</small>{" "}
//             <a onClick={() => toggleForm("Login")} id="link-register">
//               <small>Login</small>
//             </a>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Register;
























































import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackgroundColor } from "../redux/action";
import logo from "../assets/imgs/logolight.svg";
import categories from "../assets/imgs/navicons/Categories.svg";
import market from "../assets/imgs/navicons/market.svg";
import chat from "../assets/imgs/navicons/chat.svg";
import following from "../assets/imgs/navicons/following.svg";
import pages from "../assets/imgs/navicons/pages.svg";
import meetpeople from "../assets/imgs/navicons/meetpeople2.svg";
import help from "../assets/imgs/navicons/help.svg";
import setting from "../assets/imgs/navicons/setting.svg";
import logout from "../assets/imgs/navicons/logout.svg";
import saved from "../assets/imgs/navicons/meetpeople2.svg";
import { Link } from "react-router-dom";
const SideBar = () => {
  const dispatch = useDispatch();
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const changeBg = (color) => {
    const changeColor = color
      ? color
      : "themed-background-dark-default  themed-border-night";
    dispatch(changeBackgroundColor(changeColor));
  };

  return (
    <div>
      <div
        className={`${background_color}`}
        style={{
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: "9",
        }}
      >
        <div id="sidebar-scroll">
          {/* Sidebar Content */}
          <div className="sidebar-content">
            {/* Brand */}
            <Link to="/" className=" sidebar-logo">
              <img className="" src={logo} />
            </Link>
            {/* END Brand */}
            {/* User Info */}
            <div
              style={{ height: "50px" }}
              className="sidebar-section sidebar-user clearfix  "
            >
              <div className="sidebar-user-avatar">
                <a href="/">
                  <img src="img/placeholders/avatars/avatar.jpg" alt="avatar" />
                </a>
              </div>
              <div className="sidebar-user-name">Qasim Qayyum</div>
              {/* <div className="sidebar-user-links">
                <a
                  href="javascript:void(0)"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Profile"
                >
                  <i className="gi gi-user" />
                </a>
                <a
                  href="javascript:void(0)"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Messages"
                >
                  <i className="gi gi-envelope" />
                </a>
                <a
                  href="javascript:void(0)"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Settings"
                >
                  <i className="gi gi-cogwheel" />
                </a>
                <a
                  href="javascript:void(0)"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Logout"
                >
                  <i className="gi gi-exit" />
                </a>
              </div> */}
            </div>

            {/* <ul className="sidebar-section sidebar-themes clearfix sidebar-nav-mini-hide">
              
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-default  themed-border-night"
                  onClick={()=>changeBg(
                    "themed-background-dark-default  themed-border-night"
                  )}
                  data-theme="css/themes/night.css"
                  data-toggle="tooltip"
                  title="Night"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-night  themed-border-night"
                  onClick={()=>changeBg(
                    "themed-background-dark-night  themed-border-night"
                  )}
                  data-theme="css/themes/night.css"
                  data-toggle="tooltip"
                  title="Night"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-amethyst themed-border-amethyst"
                  onClick={()=>changeBg(
                    "themed-background-dark-amethyst themed-border-amethyst"
                  )}
                  data-theme="css/themes/amethyst.css"
                  data-toggle="tooltip"
                  title="Amethyst"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-modern themed-border-modern"
                  onClick={()=>changeBg(
                    "themed-background-dark-modern themed-border-modern"
                  )}
                  data-theme="css/themes/modern.css"
                  data-toggle="tooltip"
                  title="Modern"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-autumn themed-border-autumn"
                  onClick={()=>changeBg(
                    "themed-background-dark-autumn themed-border-autumn"
                  )}
                  data-theme="css/themes/autumn.css"
                  data-toggle="tooltip"
                  title="Autumn"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-flatie themed-border-flatie"
                  onClick={()=>changeBg(
                    "themed-background-dark-flatie themed-border-flatie"
                  )}
                  data-theme="css/themes/flatie.css"
                  data-toggle="tooltip"
                  title="Flatie"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-spring themed-border-spring"
                  onClick={()=>changeBg(
                    "themed-background-dark-spring themed-border-spring"
                  )}
                  data-theme="css/themes/spring.css"
                  data-toggle="tooltip"
                  title="Spring"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-fancy themed-border-fancy"
                  onClick={()=>changeBg(
                    "themed-background-dark-fancy themed-border-fancy"
                  )}
                  data-theme="css/themes/fancy.css"
                  data-toggle="tooltip"
                  title="Fancy"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-fire themed-border-fire"
                  onClick={()=>changeBg(
                    "themed-background-dark-fire themed-border-fire"
                  )}
                  data-theme="css/themes/fire.css"
                  data-toggle="tooltip"
                  title="Fire"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-coral themed-border-coral"
                  onClick={()=>changeBg(
                    "themed-background-dark-coral themed-border-coral"
                  )}
                  data-theme="css/themes/coral.css"
                  data-toggle="tooltip"
                  title="Coral"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-lake themed-border-lake"
                  onClick={()=>changeBg(
                    "themed-background-dark-lake themed-border-lake"
                  )}
                  data-theme="css/themes/lake.css"
                  data-toggle="tooltip"
                  title="Lake"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-forest themed-border-forest"
                  onClick={()=>changeBg(
                    "themed-background-dark-forest themed-border-forest"
                  )}
                  data-theme="css/themes/forest.css"
                  data-toggle="tooltip"
                  title="Forest"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-waterlily themed-border-waterlily"
                  onClick={()=>changeBg(
                    "themed-background-dark-waterlily themed-border-waterlily"
                  )}
                  data-theme="css/themes/waterlily.css"
                  data-toggle="tooltip"
                  title="Waterlily"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-emerald themed-border-emerald"
                  onClick={()=>changeBg(
                    "themed-background-dark-emerald themed-border-emerald"
                  )}
                  data-theme="css/themes/emerald.css"
                  data-toggle="tooltip"
                  title="Emerald"
                />
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className="themed-background-dark-blackberry themed-border-blackberry"
                  onClick={()=>changeBg(
                    "themed-background-dark-blackberry themed-border-blackberry"
                  )}
                  data-theme="css/themes/blackberry.css"
                  data-toggle="tooltip"
                  title="Blackberry"
                />
              </li>
            </ul> */}

            {/* END Theme Colors */}
            {/* Sidebar Navigation */}
            <ul className="sidebar-nav ">
              <li className={isActive ? "active" : ""}>
                <a
                  className="sidebar-nav-menu theme_color"
                  onClick={toggleActive}
                >
                  <i className="fa fa-angle-left sidebar-nav-indicator sidebar-nav-mini-hide" />
                  <img className="sidebar-nav-icon" src={categories} />
                  <span className="sidebar-nav-mini-hide ">Categories</span>
                </a>
                <ul>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Seed Vendors
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Machinery Vendors
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Raw Material Vendors
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Transport Vendors
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Wholesaler
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Farmer
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Land Brokers
                    </a>
                  </li>
                  <li>
                    <a className="theme_color" href="javascript:void(0)">
                      Flowers Distributors
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/" className="theme_color active">
                  <i className="gi gi-stopwatch sidebar-nav-icon" />
                  <span className="sidebar-nav-mini-hide">Time Line</span>
                </Link>
              </li>
              <li>
                <Link to="/market-place" className="theme_color">
                  <img className="sidebar-nav-icon" src={market} />
                  <span className="sidebar-nav-mini-hide">Market</span>
                </Link>
              </li>
              <li>
                <Link to="/chat" className="theme_color">
                  <img className="sidebar-nav-icon" src={chat} />
                  <span className="sidebar-nav-mini-hide">Chat</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="theme_color">
                  <img className="sidebar-nav-icon" src={following} />
                  <span className="sidebar-nav-mini-hide">Following</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="theme_color">
                  <img className="sidebar-nav-icon" src={pages} />
                  <span className="sidebar-nav-mini-hide">Pages</span>
                </Link>
              </li>
              <li>
                <Link to="/discover-people" className="theme_color">
                  <img className="sidebar-nav-icon" src={meetpeople} />
                  <span className="sidebar-nav-mini-hide">Meet People</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="theme_color">
                  <img className="sidebar-nav-icon" src={pages} />
                  <span className="sidebar-nav-mini-hide">Saved</span>
                </Link>
              </li>
              <li style={{ margin: "2rem" }}>
                <Link to="/" className="theme_color">
                  <i className="sidebar-nav-icon">_______________________</i>
                </Link>
              </li>

              <li className={isActive ? "active" : ""}>
                <a href="#" className="sidebar-nav-menu" onClick={toggleActive}>
                  <i className="fa fa-angle-left sidebar-nav-indicator sidebar-nav-mini-hide" />
                  {/* <i className="gi gi-cogwheel sidebar-nav-icon" /> */}
                  <img className="sidebar-nav-icon" src={setting} />
                  <span className="sidebar-nav-mini-hide">Settings</span>
                </a>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Change Password</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Contacts</a>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/" className="theme_color">
                  <img className="sidebar-nav-icon" src={help} />
                  <span className="sidebar-nav-mini-hide">Help</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="theme_color2 logoutbtn">
                  <img className="sidebar-nav-icon" src={logout} />
                  <span className="sidebar-nav-mini-hide">Logout Account</span>
                </Link>
              </li>
              <li className="sidebar-footer"
                 
              >
                <p className="sidebar-footer-item" >About</p>
                <p className="sidebar-footer-item" >Get the app</p>
                <p className="sidebar-footer-item" >Cookie Policy</p>
                <p className="sidebar-footer-item" >Privacy & Terms</p>
                <p className="sidebar-footer-item" >Copyright Policy</p>
                <p className="sidebar-footer-item" >Community Guidelines</p>
              </li>
              <li style={{textAlign:'center'}} className="sidebar-footer ">
                <p>E- Network © 2024. All rights reserved.</p>
              </li>
            </ul>
            {/* END Sidebar Navigation */}
          </div>
          {/* END Sidebar Content */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

































// import React from 'react'
// import { Link } from 'react-router-dom'
// import { showName } from '../../redux/action'
// import {useDispatch, useSelector} from 'react-redux'
// const FriendRequests = () => {
//   const dispatch = useDispatch();
//   const background_color = useSelector((state) => state.changeBackgroundColorReducer);
//   return (
   
//           <div className="widget" style={{ padding: " 1rem", width: "25rem" }}>
//             <div className="widget-simple text-center">
//               <a href="/">
//                 <img
//                   src="img/placeholders/avatars/avatar15.jpg"
//                   alt="avatar"
//                   className="widget-image img-circle"
//                 />
//               </a>
//               <h4 className="widget-content">
//                 <a href="/">
//                   <strong>Qasim Jutt</strong>
//                 </a>
//                 <small>Web Designer</small>
//               </h4>
//             </div>
//               <div className="  ">
//                 <div className="row text-center ">
//                   <div className="col-xs-12">
                    
//                     <Link
//                       type="button"
//                       className={`btn btn-primary ${background_color}`}
//                       style={{ padding: "1rem 2.5rem", marginRight: "10px" }}
                      
//                     >
//                       Join 
//                     </Link>
//                     <Link
//                       type="button"
//                       className="btn btn-default"
//                       style={{ padding: "1rem 1.5rem" }}
//                     >
//                       Cancel
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//           </div>
         
//   )
// }

// export default FriendRequests
