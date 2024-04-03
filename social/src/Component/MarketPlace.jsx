import React from "react";
import { useSelector } from "react-redux";

const MarketPlace = () => {
  const name = useSelector((state) => state.showName);
  const background_color = useSelector((state) => state.changeBackgroundColorReducer);
  return (
    <>
      <br />
      <br />
      <div className="row ">
        <div className="col-md-4"> 
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire"> 
              <div
                id="widget-carousel4"
                className="carousel slide remove-margin"
              > 
                <div className="carousel-inner">
                  <div className="active item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel4"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel4"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background"
              >
                <i className="gi gi-music" />
              </a>
              <h4 className="widget-content">
                <a href="javascript:void(0)">
                  {/* <strong>Party</strong> Time */}
                  {name}
                </a>
                <small>
                  in <a href="javascript:void(0)">Personal Album</a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Active Theme Color Widget with Carousel Alternative */}
        </div>
        <div className="col-md-4">
          {/* Specific Theme Color Widget with Carousel Alternative */}
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire">
              {/* Carousel */}
              <div
                id="widget-carousel5"
                className="carousel slide remove-margin"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="active item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel5"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel5"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background-fire"
              >
                <i className="gi gi-pizza" />
              </a>
              <h4 className="widget-content">
                <a href="javascript:void(0)" className="themed-color-fire">
                  <strong>Party</strong> Time
                </a>
                <small>
                  in{" "}
                  <a href="javascript:void(0)" className="themed-color-fire">
                    Personal Album
                  </a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Specific Theme Color Widget with Carousel Alternative */}
        </div>
        <div className="col-md-4">
          {/* Mixed Theme Color Widget 2 with Carousel Alternative */}
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire">
              {/* Carousel */}
              <div
                id="widget-carousel6"
                className="carousel slide remove-margin"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="active item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel6"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel6"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple ">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background-flatie"
              >
                <i className="gi gi-drink" />
              </a>
              <h4 className="widget-content widget-content-light">
                <a href="javascript:void(0)" className="themed-color-flatie">
                  <strong>Party</strong> Time
                </a>
                <small>
                  in{" "}
                  <a href="javascript:void(0)" className="themed-color-flatie">
                    Personal Album
                  </a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Mixed Theme Color Widget 2 with Carousel Alternative */}
        </div>
        <div className="col-md-4">
          {/* Active Theme Color Widget with Carousel Alternative */}
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire">
              {/* Carousel */}
              <div
                id="widget-carousel4"
                className="carousel slide remove-margin"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="active item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel4"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel4"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background"
              >
                <i className="gi gi-music" />
              </a>
              <h4 className="widget-content">
                <a href="javascript:void(0)">
                  <strong>Party</strong> Time
                </a>
                <small>
                  in <a href="javascript:void(0)">Personal Album</a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Active Theme Color Widget with Carousel Alternative */}
        </div>
        <div className="col-md-4">
          {/* Specific Theme Color Widget with Carousel Alternative */}
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire">
              {/* Carousel */}
              <div
                id="widget-carousel5"
                className="carousel slide remove-margin"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="active item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel5"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel5"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background-fire"
              >
                <i className="gi gi-pizza" />
              </a>
              <h4 className="widget-content">
                <a href="javascript:void(0)" className="themed-color-fire">
                  <strong>Party</strong> Time
                </a>
                <small>
                  in{" "}
                  <a href="javascript:void(0)" className="themed-color-fire">
                    Personal Album
                  </a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Specific Theme Color Widget with Carousel Alternative */}
        </div>
        <div className="col-md-4">
          {/* Mixed Theme Color Widget 2 with Carousel Alternative */}
          <div className="widget">
            <div className="widget-extra-full themed-background-dark-fire">
              {/* Carousel */}
              <div
                id="widget-carousel6"
                className="carousel slide remove-margin"
              >
                {/* Wrapper for slides */}
                <div className="carousel-inner">
                  <div className="active item">
                    <img
                      src="img/placeholders/photos/photo13.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo6.jpg" alt="image" />
                  </div>
                  <div className="item">
                    <img
                      src="img/placeholders/photos/photo17.jpg"
                      alt="image"
                    />
                  </div>
                  <div className="item">
                    <img src="img/placeholders/photos/photo7.jpg" alt="image" />
                  </div>
                </div>
                {/* END Wrapper for slides */}
                {/* Controls */}
                <a
                  className="left carousel-control"
                  href="#widget-carousel6"
                  data-slide="prev"
                >
                  <span>
                    <i className="fa fa-chevron-left" />
                  </span>
                </a>
                <a
                  className="right carousel-control"
                  href="#widget-carousel6"
                  data-slide="next"
                >
                  <span>
                    <i className="fa fa-chevron-right" />
                  </span>
                </a>
                {/* END Controls */}
              </div>
              {/* END Carousel */}
            </div>
            <div className="widget-simple ">
              <a
                href="javascript:void(0)"
                className="widget-icon pull-right themed-background-flatie"
              >
                <i className="gi gi-drink" />
              </a>
              <h4 className="widget-content widget-content-light">
                <a href="javascript:void(0)" className="themed-color-flatie">
                  <strong>Party</strong> Time
                </a>
                <small>
                  in{" "}
                  <a href="javascript:void(0)" className="themed-color-flatie">
                    Personal Album
                  </a>
                </small>
              </h4>
            </div>
          </div>
          {/* END Mixed Theme Color Widget 2 with Carousel Alternative */}
        </div>
      </div>
    </>
  );
};

export default MarketPlace;
