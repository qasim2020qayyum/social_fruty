import React from "react";
import { useSelector } from "react-redux";

const UsersHome = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  return (
    <>
      {/* <div className="widget">
            <div className="widget-advanced"> 
              <div className={`widget-header text-center ${background_color}`}>
                <h3 className="widget-content-light">
                  <a
                    href="/"
                    className="themed-color"
                  >
                    Shirley Wells
                  </a>
                  <br />
                  <small>Web Designer</small>
                </h3>
              </div> 
              <div className="widget-main">
                <a
                  href="/"
                  className="widget-image-container animation-hatch"
                >
                  <img
                    src="img/placeholders/avatars/avatar6.jpg"
                    alt="avatar"
                    className="widget-image img-circle"
                  />
                </a>
                <div className="row text-center animation-fadeIn">
                  <div className="col-xs-4">
                    <h3>
                      <strong>140</strong>
                      <br />
                      <small>Followers</small>
                    </h3>
                  </div>
                  <div className="col-xs-4">
                    <h3>
                      <strong>15</strong>
                      <br />
                      <small>Projects</small>
                    </h3>
                  </div>
                  <div className="col-xs-4">
                    <h3>
                      <strong>980</strong>
                      <br />
                      <small>Sales</small>
                    </h3>
                  </div>
                </div>
              </div> 
            </div>
          </div> */}
      <div className="widget position_home_left">
        <div className="widget-simple">
          <a href="/">
            <img
              src="img/placeholders/avatars/avatar2.jpg"
              alt="avatar"
              className="widget-image img-circle pull-left position_home_left_img img_circle_border"
            />
          </a>
          <h4 className="widget-content text-right">
            <a
              href="/"
              className=""
            >
              <strong>Kyle Ross</strong>
            </a>
            <small>Wholesaler</small>
          </h4>
        </div>
        <div className="widget-extra ">
          <div className="row text-center">
            <div className="col-xs-4 ">
              <h3 className="">
                <small>Followers</small>
                <br />
                <strong>10</strong>
              </h3>
            </div>
            <div className="col-xs-4">
              <h3 className="">
                <small>Projects</small>
                <br />
                <strong>9</strong>
              </h3>
            </div>
            <div className="col-xs-4">
              <h3 className=" ">
                <small>Sales</small>
                <br />
                <strong>15</strong>
              </h3>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-xs-6">
              <button className="position_home_left_followbtn">Follow</button>
            </div>
            <div className="col-xs-6">
              <button className="position_home_left_cancelbtn">Cancel</button>
              
            </div>
             
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersHome;
