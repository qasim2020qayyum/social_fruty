import React from "react";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import FriendRequests from "./FriendRequests"; 
import UsersHome from "./UsersHome";
import { useSelector } from "react-redux";
import ProfileWidgetLand from "./ProfileWidgetLand";
import AddPostLand from "./AddPostLand";
import PostWithComment from "./PostWithComment";
import PostWithImage from "./PostWithImage";
import FriendSuggestions from "./FriendSuggestions";

const PageContent = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  return (
    <div id="page-content">
      <br />
      <br />
      
      <div className="row ">
        <div className="col-lg-3">
          <UsersHome />
          <UsersHome />
        </div>
        <div className="col-lg-5 ">
          <ProfileWidgetLand/>
          <AddPostLand/>
           
          <PostWithImage />
          <Posts />
          <PostWithComment />
          <div className="row"> 
          <div className="col-lg-12 ">

            <FriendSuggestions />  
          </div>
          </div>
          

          <Posts />
          
        </div>
        <div className="col-lg-3 ">
          <FriendRequests /> 
        </div>
      </div>
    </div>
  );
};

export default PageContent;
