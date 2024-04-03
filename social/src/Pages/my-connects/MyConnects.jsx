import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserToConnectReq,
  postFollowPersonReq,
  unFollowPersonReq,
} from "./__requests/RequestUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { altSidebarContactLoadingAction } from "../../redux/action";


const MyConnects = () => {
  const loggedInUser = useSelector((state) => state.loginUserReducer);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const [userData, setUserData] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const getUsersData = async () => {
    try {
      setUserLoading(true);
      const response = await getUserToConnectReq();
      setUserData(response.data.users);
      setUserLoading(false);
    } catch (error) {
      toast.error("Whoops! something wrong");
      setUserLoading(false);
    }
  };

  const followPerson = async (user_id) => {
    try {
      const response = await postFollowPersonReq(user_id, loggedInUser._id);
      toast.success(response.data.message);
      // Update the userData state to reflect that the user is now being followed
      setUserData((prevUserData) =>
        prevUserData.map((user) => {
          if (user._id === user_id) {
            return { ...user, isFollowing: true };
          }
          return user;
        })
      );
      dispatch(altSidebarContactLoadingAction(true))
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };
  
  const unFollowPerson = async (user_id) => {
    try {
      const response = await unFollowPersonReq(user_id, loggedInUser._id);
      toast.success(response.data.message);
      // Update the userData state to reflect that the user is now being followed
      setUserData((prevUserData) =>
        prevUserData.map((user) => {
          if (user._id === user_id) {
            return { ...user, isFollowing: false };
          }
          return user;
        })
      ); 
      dispatch(altSidebarContactLoadingAction(true))
    } catch (error) {
      toast.error("Whoops! something wrong");
    }
  };

  

  // const followPerson = async (user_id) => {
  //   try {
  //     const response = await postFollowPersonReq(user_id, loggedInUser._id);
  //     toast.success(response.data.message);
  //     // Update the userData state to reflect that the user is now being followed
  //     setUserData((prevUserData) =>
  //       prevUserData.map((user) => {
  //         if (user._id === user_id) {
  //           return { ...user, isFollowing: true };
  //         }
  //         return user;
  //       })
  //     );
  //     socket.emit("altbar-contactList", loggedInUser._id);
  //   } catch (error) {
  //     toast.error("Whoops! something wrong");
  //   }
  // };
  // const unFollowPerson = async (user_id) => {
  //   try {
  //     const response = await unFollowPersonReq(user_id, loggedInUser._id);
  //     toast.success(response.data.message);
  //     // Update the userData state to reflect that the user is now being followed
  //     setUserData((prevUserData) =>
  //       prevUserData.map((user) => {
  //         if (user._id === user_id) {
  //           return { ...user, isFollowing: false };
  //         }
  //         return user;
  //       })
  //     );
  //     socket.emit("altbar-contactList", loggedInUser._id);
  //   } catch (error) {
  //     toast.error("Whoops! something wrong");
  //   }
  // };

  useEffect(() => {
    if (userLoading) {
      getUsersData();
    }
  }, [userLoading]);

  return (
    <>
      <div id="page-content">
        {userLoading ? (
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
            <div
              style={{
                margin: "2rem 0",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
              }}
            >
              {userData.length > 0 ? (
                userData.map((user) => {
                  return (
                    <>
                      <div
                        className="widget"
                        style={{
                          padding: "0 1rem",
                          width: "21.5rem",
                          margin: "1rem",
                        }}
                      >
                        <div className="widget-simple text-center">
                          <a>
                            <img
                              src={
                                user.profilePicture
                                  ? user.profilePicture
                                  : "img/placeholders/avatars/avatar15.jpg"
                              }
                              // "img/placeholders/avatars/avatar15.jpg"
                              alt="avatar"
                              className="widget-image img-circle"
                            />
                          </a>
                          <h4 className="widget-content">
                            <a>
                              <strong>{user.name}</strong>
                            </a>
                          </h4>
                        </div>
                        <div className="row text-center ">
                          {
                            user.isFollowing ? 
                          <Link
                            type="button"
                            style={{ width: "20rem" }}
                            className={`btn btn-primary ${background_color}`}
                            onClick={() => unFollowPerson(user._id)}
                          >
                             
                            Following
                          </Link>
                             
                            :
                          <Link
                            type="button"
                            style={{ width: "20rem" }}
                            className={`btn btn-primary ${background_color}`}
                            onClick={() => followPerson(user._id)}
                          >
                             
                            Follow
                          </Link>
                          }
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    height: "100vh",
                    paddingTop: "20rem",
                  }}
                >
                  <h3>Opps! No Data Found</h3>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyConnects;
