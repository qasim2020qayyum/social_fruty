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
  const [categoriesActive, setCategoriesActive] = useState(false);
  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const toggleCategories = () => {
    setCategoriesActive(!categoriesActive);
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
          <div className="sidebar-content">
            <Link to="/" className=" sidebar-logo">
              <img className="" src={logo} />
            </Link>
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
            </div>

            <ul className="sidebar-nav ">
              <li className={categoriesActive ? "active" : ""}>
                <a
                  className="sidebar-nav-menu theme_color"
                  onClick={toggleCategories}
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
              <li className="sidebar-footer">
                <p className="sidebar-footer-item">About</p>
                <p className="sidebar-footer-item">Get the app</p>
                <p className="sidebar-footer-item">Cookie Policy</p>
                <p className="sidebar-footer-item">Privacy & Terms</p>
                <p className="sidebar-footer-item">Copyright Policy</p>
                <p className="sidebar-footer-item">Community Guidelines</p>
              </li>
              <li style={{ textAlign: "center" }} className="sidebar-footer ">
                <p>E- Network © 2024. All rights reserved.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
