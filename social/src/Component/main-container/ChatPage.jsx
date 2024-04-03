import React from "react";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const sidebarState = useSelector((state) => state.sidebarReducer);
  return (
    <>
      <div
        id="page-content"
        style={{
          height: "100vh",
          overflowY: "auto",
          zIndex: "9",
        }}
      >
        <div className="block">
          <div className="block-title">
            <div className="block-options pull-right">
              <div className="btn-group btn-group-sm">
                <a
                  href="javascript:void(0)"
                  className="btn btn-alt btn-sm btn-default dropdown-toggle enable-tooltip"
                  data-toggle="dropdown"
                  title="Status"
                >
                  <i className="fa fa-cog" />
                </a>
                <ul className="dropdown-menu dropdown-custom dropdown-menu-right">
                  <li className="active">
                    <a href="javascript:void(0)">
                      <i className="fa fa-check pull-right" />
                      Online
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa fa-circle pull-right" />
                      Away
                    </a>
                    <a href="javascript:void(0)">
                      <i className="fa fa-circle pull-right" />
                      Busy
                    </a>
                  </li>
                  <li className="divider" />
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa fa-power-off pull-right text-muted" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h2>
              <i className="fa fa-pencil animation-pulse" />{" "}
              <strong>Shirley</strong> Wells
            </h2>
          </div>

          <div className="chatui-container block-content-full">
            <div className={`chatui-people ${background_color}`}>
              <div className="chatui-people-scroll">
                {/* Online */}
                <h2 className="chatui-header">
                  <i className="fa fa-circle text-success pull-right" />
                  <strong>Online</strong>
                </h2>
                <div className="list-group">
                  <a
                    href="javascript:void(0)"
                    className="list-group-item active"
                  >
                    <span className="badge">2</span>
                    <img
                      src="img/placeholders/avatars/avatar6.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Shirley</strong> Wells
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <span className="badge">5</span>
                    <img
                      src="img/placeholders/avatars/avatar9.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Craig</strong> West
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <span className="badge">1</span>
                    <img
                      src="img/placeholders/avatars/avatar10.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Brenda</strong> Silva
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <img
                      src="img/placeholders/avatars/avatar15.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>George</strong> Peterson
                    </h5>
                  </a>
                </div>
                {/* END Online */}
                {/* Away */}
                <hr />
                <h2 className="chatui-header">
                  <i className="fa fa-circle text-warning pull-right" />
                  <strong>Away</strong>
                </h2>
                <div className="list-group">
                  <a href="javascript:void(0)" className="list-group-item">
                    <img
                      src="img/placeholders/avatars/avatar4.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>John</strong> West
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <img
                      src="img/placeholders/avatars/avatar16.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Matteo</strong> Galli
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <span className="badge">6</span>
                    <img
                      src="img/placeholders/avatars/avatar8.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Dimitri</strong> Robin
                    </h5>
                  </a>
                </div>
                {/* END Away */}
                {/* Busy */}
                <hr />
                <h2 className="chatui-header">
                  <i className="fa fa-circle text-danger pull-right" />
                  <strong>Busy</strong>
                </h2>
                <div className="list-group">
                  <a href="javascript:void(0)" className="list-group-item">
                    <img
                      src="img/placeholders/avatars/avatar5.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Louis</strong> Peters
                    </h5>
                  </a>
                  <a href="javascript:void(0)" className="list-group-item">
                    <span className="badge">4</span>
                    <img
                      src="img/placeholders/avatars/avatar12.jpg"
                      alt="Avatar"
                      className="img-circle"
                    />
                    <h5 className="list-group-item-heading">
                      <strong>Julia</strong> Warren
                    </h5>
                  </a>
                </div>
                {/* END Busy */}
              </div>
            </div>

            <div className="chatui-talk ">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div
                  className={`${sidebarState ? "col-md-10  col-lg-offset-2" : " "} `}
                >
                  <div className="chatui-talk-scroll">
                    <ul>
                      <li className="text-center">
                        <small>yesterday, 23:10</small>
                      </li>
                      <li className="chatui-talk-msg">
                        <img
                          src="img/placeholders/avatars/avatar6.jpg"
                          alt="Avatar"
                          className="img-circle chatui-talk-msg-avatar"
                        />{" "}
                        Hey admin?
                      </li>
                      <li className="chatui-talk-msg">
                        <img
                          src="img/placeholders/avatars/avatar6.jpg"
                          alt="Avatar"
                          className="img-circle chatui-talk-msg-avatar"
                        />{" "}
                        How are you?
                      </li>
                      <li className="text-center">
                        <small>just now</small>
                      </li>
                      <li className="chatui-talk-msg chatui-talk-msg-highlight themed-border">
                        <img
                          src="img/placeholders/avatars/avatar2.jpg"
                          alt="Avatar"
                          className="img-circle chatui-talk-msg-avatar"
                        />{" "}
                        I'm fine, thanks!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* END Talk */}
            {/* Input */}
            <div className="chatui-input">
              <div className="row">
                <div
                  className={`${
                    sidebarState ? "col-md-10  col-lg-offset-2" : " col-md-12"
                  } `}
                >
                  <form
                    action="page_ready_chat.html"
                    method="post"
                    className="form-horizontal form-control-borderless remove-margin"
                  >
                    <div className="input-group">
                      <span className="input-group-addon">
                        <i className="fa fa-angle-right" />
                      </span>
                      <input
                        type="text"
                        id="chatui-message"
                        name="chatui-message"
                        className="form-control input-lg"
                        placeholder="Type a message and hit enter.."
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
