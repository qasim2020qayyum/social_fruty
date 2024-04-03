import { useSelector } from "react-redux";
import LandingPage from "./Pages/LandingPage";
import LoginSignup from "./Pages/auth/LoginSignup";
import Chat from "./Chat";
import "./assets/css/social.css"

function App() {
  //LandingPage
  const logout = useSelector((state) => state.logoutReducer);
  return <>
  {/* <Chat />  */}
  {!logout ? <LoginSignup /> : <LandingPage /> }
  </>;
}

export default App;
