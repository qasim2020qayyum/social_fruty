import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  altSidebarAction,
  logoutAction,
  sidebarAction,
} from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import timeline from "../../assets/imgs/navicons/Home.svg";
import marketplace from "../../assets/imgs/navicons/market.svg";
import discoverpeople from "../../assets/imgs/navicons/meetpeople.svg";
import website from "../../assets/imgs/navicons/website.svg";
import contact from "../../assets/imgs/navicons/contact.svg";
import messages1 from "../../assets/imgs/navicons/messages.svg";
import notification1 from "../../assets/imgs/navicons/notification.svg";
const Header = () => {
  const altSidebarState = useSelector((state) => state.altSidebarReducer);
  const sidebarState = useSelector((state) => state.sidebarReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/fruit/user/logout`
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        dispatch(logoutAction(false));
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      <header
        className={`navbar navbar-default upper_navbar ${
          !sidebarState ? "widthset" : "widthset2"
        }`}
      >
        {/* Navbar Header */}
        <div className="navbar-header">
          {/* Horizontal Menu Toggle + Alternative Sidebar Toggle Button, Visible only in small screens (< 768px) */}

          <ul className="nav navbar-nav-custom pull-right visible-xs ">
            <li>
              <form className="">
                <div className="form-group">
                  <input
                    type="text"
                    className="navbar-form-input"
                    placeholder="Search for your keywords.."
                  />
                </div>
              </form>
            </li>
            <li className="dropdown">
              <a
                href="javascript:void(0)"
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <img className="noti_msg" src={notification1} alt="avatar" />
              </a>
              <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
                <li className="dropdown-header text-center">Notifications</li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa fa-clock-o fa-fw pull-right" />
                    <span className="badge pull-right">10</span>
                    Profile
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa fa-clock-o fa-fw pull-right" />
                    <span className="badge pull-right">10</span>
                    noti america
                  </a>
                </li>
              </ul>
            </li>
            <li
              onClick={() =>
                dispatch(altSidebarAction(altSidebarState ? false : true))
              }
            >
              <Link>
                <img className="noti_msg" src={messages1} />
              </Link>
            </li>
            {/* <li>
              <a
                href="javascript:void(0)"
                data-toggle="collapse"
                data-target="#horizontal-menu-collapse"
              >
                Menu
              </a>
            </li> */}
          </ul>
          <ul className="nav navbar-nav-custom pull-right  visible-xs"> 
            <li>
              <Link to="/">
                {" "}
                <img className="icon_nav_cls" src={timeline} />
              </Link>
            </li>
            <li>
              <Link to="/market-place">
                {" "}
                <img className="icon_nav_cls" src={marketplace} />{" "}
              </Link>
            </li>

            <li>
              <Link to="/discover-people">
                <img className="icon_nav_cls" src={discoverpeople} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img className="icon_nav_cls" src={contact} />
              </Link>
            </li>

            <li>
              <a href="http://localhost:3000/" target="_blank">
                <img className="icon_nav_cls" src={website} />
              </a>
            </li>

             
          </ul> 
          {/* END Horizontal Menu Toggle + Alternative Sidebar Toggle Button */}
          {/* Main Sidebar Toggle Button */}
          <ul className="nav navbar-nav-custom">
            {/* <li>
        <a
          href="javascript:void(0)"
          onclick="App.sidebar('toggle-sidebar');this.blur();"
        >
          <i className="fa fa-bars fa-fw" />
        </a>
      </li> */}
            <li>
              <a
                onClick={() =>
                  dispatch(sidebarAction(sidebarState ? false : true))
                }
              >
                <i className="fa fa-bars fa-fw" />
              </a>
            </li>
          </ul>
          {/* END Main Sidebar Toggle Button */}
        </div>
        {/* END Navbar Header */}
        {/* Alternative Sidebar Toggle Button, Visible only in large screens (> 767px) */}
        <ul className="nav navbar-nav-custom pull-right hidden-xs">
          <li
            onClick={() =>
              dispatch(altSidebarAction(altSidebarState ? false : true))
            }
          >
            <Link>
              {/* <i className="gi gi-share_alt" /> */}
              {/* <i className="gi gi-comments" /> */}
              <img className="noti_msg" src={messages1} />
              {/* <span className="label label-primary label-indicator animation-floating">
              6
            </span> */}
            </Link>
          </li>

          <li className="dropdown">
            <a
              href="javascript:void(0)"
              className="dropdown-toggle"
              data-toggle="dropdown"
            >
              <img className="noti_msg" src={notification1} alt="avatar" />
            </a>
            <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
              <li className="dropdown-header text-center">Notifications</li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-clock-o fa-fw pull-right" />
                  <span className="badge pull-right">10</span>
                  Profile
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-clock-o fa-fw pull-right" />
                  <span className="badge pull-right">10</span>
                  noti america
                </a>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <a
              href="javascript:void(0)"
              className="dropdown-toggle"
              data-toggle="dropdown"
            >
              <img
                className="nav_avatar"
                src="img/placeholders/avatars/avatar.jpg"
                alt="avatar"
              />{" "}
              <i className="fa fa-angle-down" />
            </a>
            <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
              <li className="dropdown-header text-center">Header</li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-clock-o fa-fw pull-right" />
                  <span className="badge pull-right">10</span>
                  Profile
                </a>
                <a href="javascript:void(0)">
                  <i className="fa fa-envelope-o fa-fw pull-right" />
                  <span className="badge pull-right">5</span>
                  Messages
                </a>
                <a href="javascript:void(0)">
                  <i className="fa fa-magnet fa-fw pull-right" />
                  <span className="badge pull-right">3</span>
                  Profile
                </a>
                <a href="javascript:void(0)">
                  <i className="fa fa-question fa-fw pull-right" />
                  <span className="badge pull-right">11</span>
                  market Place
                </a>
              </li>
              <li className="divider" />
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-cog fa-fw pull-right" />
                  Settings
                </a>
                <a onClick={logout}>
                  <i className="fa fa-user fa-fw pull-right" />
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
        {/* END Alternative Sidebar Toggle Button */}
        {/* Horizontal Menu + Search */}
        <div id="horizontal-menu-collapse" className="collapse navbar-collapse">
          <form
            action="page_ready_search_results.html"
            className="navbar-form navbar-left"
          >
            <div className="form-group">
              <input
                type="text"
                className="navbar-form-input"
                placeholder="Search for your keywords.."
              />
            </div>
          </form>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">
                {" "}
                <img src={timeline} />
              </Link>
            </li>
            <li>
              <Link to="/market-place">
                {" "}
                <img src={marketplace} />{" "}
              </Link>
            </li>

            <li>
              <Link to="/discover-people">
                <img src={discoverpeople} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={contact} />
              </Link>
            </li>

            <li>
              <a href="http://localhost:3000/" target="_blank">
                <img src={website} />
              </a>
            </li>

            {/* <li className="dropdown">
            <a
              href="javascript:void(0)"
              className="dropdown-toggle"
              data-toggle="dropdown"
            >
              Settings <i className="fa fa-angle-down" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-asterisk fa-fw pull-right" /> General
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-lock fa-fw pull-right" /> Security
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-user fa-fw pull-right" /> Account
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-magnet fa-fw pull-right" /> Subscription
                </a>
              </li>
              <li className="divider" />
              <li className="dropdown-submenu">
                <a href="javascript:void(0)" tabIndex={-1}>
                  <i className="fa fa-chevron-right fa-fw pull-right" /> More
                  Settings
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="javascript:void(0)" tabIndex={-1}>
                      Second level
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Second level</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Second level</a>
                  </li>
                  <li className="divider" />
                  <li className="dropdown-submenu">
                    <a href="javascript:void(0)" tabIndex={-1}>
                      <i className="fa fa-chevron-right fa-fw pull-right" />{" "}
                      More Settings
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="javascript:void(0)">Third level</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Third level</a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">Third level</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="dropdown">
            <a
              href="javascript:void(0)"
              className="dropdown-toggle"
              data-toggle="dropdown"
            >
              Contact <i className="fa fa-angle-down" />
            </a>
            <ul className="dropdown-menu">
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-envelope-o fa-fw pull-right" /> By Email
                </a>
              </li>
              <li>
                <a href="javascript:void(0)">
                  <i className="fa fa-phone fa-fw pull-right" /> By Phone
                </a>
              </li>
            </ul>
          </li> */}
          </ul>
        </div>

        {/* END Horizontal Menu + Search */}
      </header>
    </div>
  );
};

export default Header;
