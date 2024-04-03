import React from 'react'

const ProfileWidgetLand = () => {
  return (
    <div className="widget center_top_profile">
            <div className="widget-simple">
              <a href="/">
                <img
                  src="img/placeholders/avatars/avatar2.jpg"
                  alt="avatar"
                  className="widget-image img-circle pull-left img_circle_border"
                />
              </a>
              <h4 className="widget-content">
                <a href="/">
                  <strong>Qasim Qayyum</strong>
                </a>
                <small>qasim20qayyum@gmail.com</small>
              </h4>

              <h4
                style={{ marginTop: "-5rem" }}
                className="widget-content text-right"
              >
                <a href="/" className="">
                  <small>Followers</small>
                </a>
                <strong className="theme_color2">3.5k</strong>
              </h4>
            </div>
          </div>
  )
}

export default ProfileWidgetLand
