import React from "react";
import { Link } from "react-router-dom";
import { showName } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import editsuggestions from "../../assets/imgs/suggestioncarousel/editsuggestions.svg";
const FriendRequests = () => {
  const dispatch = useDispatch();
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const suggestions = [
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "Farmer",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "Hammad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "patric",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "stuart broad",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "Aqib",
    },
    
  ];
  return (
    <div style={{ background: "white", borderRadius: "15px", padding: "1rem" }}>
      <div className="suggestion_title">
        <p>Meet New People</p>
        <p>
          <img src={editsuggestions} />
        </p>
      </div>
      {
        suggestions.map((suggestion, index)=>{
          return(
            <>
            <div className="follow_widget_right_modal  center_top_profile">
        <div className="follow_widget_right_full">
          <a href="/">
            <img
              src="img/placeholders/avatars/avatar2.jpg"
              alt="avatar"
              className="follow_widget_right    img_circle_border"
            />
            <strong>{suggestion.title}</strong>
          </a>
          <div style={{ marginTop: "-4rem" }} className="text-right">
            <button className="follow_btn_right theme_color2_background">
              <small>Follow</small>
            </button>
          </div>
        </div>
      </div>
            </>
          )

        })
      }
      
       
      <div className="suggestion_footer1">
          <div className="suggestion_footer">
            <Link to={`/discover-people`}>See All</Link>
          </div>
        </div>
    </div>
  );
};

export default FriendRequests;
