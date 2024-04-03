import React from "react";
import inputpicture from "../../assets/imgs/post/picture.svg";
import inputattachment from "../../assets/imgs/post/attachment.svg";
import inputemoji from "../../assets/imgs/post/emoji.svg";
import sendpost from "../../assets/imgs/post/sendpost/send_grey.svg";
const AddPostLand = () => {
  return (
    <div className="widget addpost-area-center">
      <div className="widget-extra-full">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-xs-12">
              <textarea
                id="widget-post3"
                name="widget-post3"
                rows={3}
                className="form-control addpost-center"
                placeholder="What’s on your mind?"
              />
            </div>
          </div>
          <div className="form-group remove-margin-bottom">
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

export default AddPostLand;
