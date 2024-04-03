import React from "react";
import { useSelector } from "react-redux";
import dropdown from "../../assets/imgs/post/editpostdropdown.svg";
import like_green from "../../assets/imgs/like/like_green.svg";
import comment_grey from "../../assets/imgs/like/comment_grey.svg";
import share_grey from "../../assets/imgs/like/share_grey.svg";
import like_grey from "../../assets/imgs/like/like_grey.svg";
const Posts = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  return (
    <div style={{ paddingBottom: "1rem" }} className="widget">
      <div style={{ marginBottom: "1rem" }} className="widget-simple ">
        <a className={`pull-right`}>
          <img src={dropdown} />
        </a>
        <a href="/">
          <img
            src="img/placeholders/avatars/avatar2.jpg"
            alt="avatar"
            className="widget-image img-circle pull-left img_circle_border"
          />
        </a>
        <h4 className="widget-content">
          <a href="javascript:void(0)">
            <strong>Hammad Malik</strong>
          </a>
          <small>33 mins ago</small>
        </h4>
      </div>

      <div className="widget-extra ">
        <div className="row ">
          <div className="col-xs-12 ">
            <p className="">
              Being a father is sometimes my hardest but always my most
              rewarding job. Happy Father’s Day to all dads out there. Being a
              father is sometimes my hardest but always my most rewarding job.
              Happy Father’s Day to all dads out there.
            </p>
          </div>
        </div>
        <div className="row text-center  ">
          <div className="col-xs-12">
            <div className="post_btn_group">
              <button
                type="button"
                className="btn_post theme_color2"
                data-toggle="tooltip"
                title="Add Image"
              >
                <img src={like_green} /> Like
              </button>
              <button
                type="button"
                className="btn_post"
                data-toggle="tooltip"
                title="Add Location"
              >
                <img src={comment_grey} /> Comment
              </button>
              <button
                type="button"
                className="btn_post"
                data-toggle="tooltip"
                title="Add Recording"
              >
                <img src={share_grey} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;