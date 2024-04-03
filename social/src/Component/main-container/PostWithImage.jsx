import React from "react";
import { useSelector } from "react-redux"; 
import dropdown from "../../assets/imgs/post/editpostdropdown.svg";
import like_green from "../../assets/imgs/like/like_green.svg";
import comment_grey from "../../assets/imgs/like/comment_grey.svg";
import share_grey from "../../assets/imgs/like/share_grey.svg";
import like_grey from "../../assets/imgs/like/like_grey.svg";
import inputpicture from "../../assets/imgs/post/picture.svg";
import inputattachment from "../../assets/imgs/post/attachment.svg";
import inputemoji from "../../assets/imgs/post/emoji.svg";
import sendpost from "../../assets/imgs/post/sendpost/send_grey.svg";
import post3 from "../../assets/imgs/post3.png";
import post2 from "../../assets/imgs/post2.png";
import post1 from "../../assets/imgs/post1.png";

const PostWithImage = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  return (
    <div className="widget">
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
              Having fun while farming and eating variety of foods with @Sarah
            </p>
          </div>
        </div>
        <div style={{ margin: "1.2rem", textAlign: "center" }} className="row">
          {/* one image */}
          {/* <div className="col-xs-12">
            <img
               
              src={post3}
              className="one_img_post post_img_radius"
            />
          </div> */}
          {/* end one image */}
          {/* two image */}
          {/* <div className="col-xs-6">
            <img className="two_img_post_imgone post_img_radius" src={post3} />
          </div>
          <div className="col-xs-6">
            <img className="two_img_post_imgtwo post_img_radius" src={post2} />
          </div> */}
          {/* end two image */}
          <div className="col-xs-7">
             <img className="three_img_post_imgone post_img_radius" src={post3}/>
          </div>
          <div className="col-xs-5">
             <img className="three_img_post_imgtwo post_img_radius" src={post2}/> 
             <img className="three_img_post_imgthree post_img_radius" src={post1}/> 
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

      <div className="widget-extra comment_post_section">
        <a href="/">
          <img
            src="img/placeholders/avatars/avatar2.jpg"
            alt="avatar"
            className="widget-image img-circle pull-left img_circle_border"
          />
        </a>
        <form className="form-horizontal comment_section">
          <div className="form-group">
            <div className="col-xs-12">
              <textarea
                id="widget-post3"
                name="widget-post3"
                rows={2}
                className="form-control addpost-center"
                placeholder="What’s on your mind?"
              />
            </div>
          </div>
          <div className="form-group  ">
            <div className="col-xs-6">
              <div className=" ">
                <button
                  type="button"
                  className="addpost-icon"
                  data-toggle="tooltip"
                  title="Add Image"
                >
                  <img src={inputpicture} />
                </button>
                <button
                  type="button"
                  className="addpost-icon"
                  data-toggle="tooltip"
                  title="Add Location"
                >
                  <img src={inputattachment} />
                </button>
                <button
                  type="button"
                  className="addpost-icon"
                  data-toggle="tooltip"
                  title="Add Recording"
                >
                  <img src={inputemoji} />
                </button>
              </div>
            </div>
            <div className="col-xs-6 text-right">
              <button type="submit" className=" addpost-icon">
                <img src={sendpost} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostWithImage;
