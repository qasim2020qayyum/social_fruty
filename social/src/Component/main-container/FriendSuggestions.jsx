import React from "react";
import { Link } from "react-router-dom";
import leftarrow from "../../assets/imgs/suggestioncarousel/leftarrow.svg";
import rightarrow from "../../assets/imgs/suggestioncarousel/rightarrow.svg";
import editsuggestions from "../../assets/imgs/suggestioncarousel/editsuggestions.svg";

const FriendSuggestions = () => {
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
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "Zeesh",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "iqbal",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "hamza",
    },
    {
      imgSrc: "img/placeholders/avatars/avatar15.jpg",
      title: "omer",
    },
  ];

  const renderSuggestions = () => {
    const rows = [];
    for (let i = 0; i < suggestions.length; i += 3) {
      const row = suggestions.slice(i, i + 3).map((suggestion, index) => (
        
        <div className="col-sm-4" key={index}>
          <div className=" suggestions_box">
            <div className="widget-simple text-center">
              <a href="/">
                <img
                  src={suggestion.imgSrc}
                  alt={suggestion.title}
                  className="widget-image img-circle"
                />
              </a>
              <h4 className="widget-content">
                <a href="/"><strong>{suggestion.title}</strong></a>
              </h4>
            </div>
            <div className="row text-center">
              <div className="col-xs-12">
                <Link type="button" className={`btn  theme_color2_background`}>
                  Follow
                </Link>
              </div>
            </div>
          </div>
        </div>
      ));
      rows.push(
        <div className={i === 0 ? "active item gallery" : "item gallery"}>
        <div className="row" key={i}>
          
          {row}
        </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <div className="block">
        <div  className="suggestion_title">
          <p>Meet New People</p>
          <p><img src={editsuggestions}/></p>
          
        </div>
        <div id="example-carousel4" className="carousel slide">
          <div className="carousel-inner">
            {renderSuggestions()}
          </div>
          <a className="left carousel-control no-hover" href="#example-carousel4" data-slide="prev">
            <span><img src={leftarrow}/></span>
          </a>
          <a className="right carousel-control no-hover" href="#example-carousel4" data-slide="next">
            <span><img src={rightarrow}/></span>
          </a>
        </div>
        <div className="suggestion_footer1">
          <div className="suggestion_footer">
            <Link to={`/discover-people`}>See All</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendSuggestions;