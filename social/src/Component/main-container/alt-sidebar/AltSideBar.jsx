import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsReq } from "./__request/RequestContacts";
import { altSidebarContactLoadingAction, chatboxAction, chatboxToggleAction, recieverIdAction } from "../../../redux/action";


import { io } from "socket.io-client";
const socket = io(`${process.env.REACT_APP_BASE_URL}`, {
  transports: ["websocket", "polling", "flashsocket"],
});

const AltSideBar = () => {
  const altSidebarState = useSelector((state) => state.altSidebarReducer);
  const  contactLoading = useSelector((state) => state.altbarContactLoadingReducer);
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loginUserReducer);
  const [contactsData, setContactsData] = useState([]);
  // const [userLoading, setUserLoading] = useState(true);
  // const getContactsData = async () => {
  //   try {
  //     setUserLoading(true);
  //     const response = await getContactsReq(loggedInUser._id);
  //     setContactsData(response.data.contacts);
  //     setUserLoading(false);
  //   } catch (error) {
  //     // toast.error("Whoops! something wrong");
  //     setUserLoading(false);
  //   }
  // };
  





  useEffect(() => {
    socket.emit("altbar-contactList", loggedInUser._id);
    socket.on('contactList-altbar', (data) => { 
      console.log("contactList-altbar run in listner in alt");
      if (data.success) {
        setContactsData(data.contacts);
        console.log("contacts: ", data.contacts);
        dispatch(altSidebarContactLoadingAction(false)) 
        } else { 
            console.error(data.error || data.message);
            dispatch(altSidebarContactLoadingAction(false)) 
        }
    }); 
    return () => {
        socket.off('contactList-altbar');
    };
}, [contactLoading]);



  // useEffect(() => {
  //   if (userLoading) {
  //     getContactsData();
  //   }
  // }, [userLoading]);

  const chatboxToggle = (state) => {
    console.log("altbar state: ", state);
    dispatch(chatboxAction(true));
    dispatch(chatboxToggleAction(true));
    dispatch(recieverIdAction(state));
  };
  return (
    <>
      <div style={{ display: altSidebarState ? "block" : "none" }}>
        <div
          style={{
            margin: "5rem 0 0 0",
            padding: "0 0 3rem 0",
            position: "fixed",
            height: "100vh",
            overflowY: "auto",
            zIndex: "9",
          }}
          className={`chatui-people ${background_color}`}
        >
          <div className="sidebar-content">
            <a href="page_ready_inbox.html" className="sidebar-title">
              <i className="fa fa-envelope pull-right" />{" "}
              <strong>Messages</strong> (5)
            </a>
            <div className="chatui-people-scroll">
              {/* Online */}
              <h2 className="chatui-header">
                <i className="fa fa-circle text-success pull-right" />
                <strong>Online</strong>
              </h2>
              <div className="list-group">
                {/* <a
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
                  </a> */}
                {contactLoading ? (
                  <div
                    style={{
                      textAlign: "center",
                      height: "100vh",
                      paddingTop: "20rem",
                    }}
                  >
                    <i className="fa fa-spinner fa-4x fa-spin"></i>
                  </div>
                ) : (
                  <>
                    {contactsData.map((contact) => {
                      return (
                        <>
                          <a
                            onClick={() => chatboxToggle(contact)}
                            // onClick={() => chatboxToggle(contact.user_id)}
                            style={{ cursor: "pointer" }}
                            className="list-group-item"
                          >
                            <span className="badge">5</span>
                            <img
                              src={
                                contact.profilePicture
                                  ? contact.profilePicture
                                  : "img/placeholders/avatars/avatar15.jpg"
                              }
                              // "img/placeholders/avatars/avatar9.jpg"
                              alt="Avatar"
                              className="img-circle"
                            />
                            <h5 className="list-group-item-heading">
                              <strong>{contact.name}</strong>
                            </h5>
                          </a>
                        </>
                      );
                    })}
                  </>
                )}
                {/* <a href="javascript:void(0)" className="list-group-item">
                <span className="badge">5</span>
                <img
                  src="img/placeholders/avatars/avatar9.jpg"
                  alt="Avatar"
                  className="img-circle"
                />
                <h5 className="list-group-item-heading">
                  <strong>Craig</strong> West
                </h5>
              </a> */}
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
            {/* END Messages */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AltSideBar;
