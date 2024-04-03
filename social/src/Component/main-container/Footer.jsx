import React from "react";

const Footer = () => {
  return (
    <footer className="clearfix">
      <div className="pull-right">
        Crafted with <i className="fa fa-heart text-danger" /> by{" "}
        <a href="https://qasim-website.netlify.app" target="_blank">
          Qasim
        </a>
      </div>
      <div className="pull-left">
        <span id="year-copy" /> ©{" "}
        <a href="https://fruitsauction.com/" target="_blank">
          Fruit Auction
        </a>
      </div>
    </footer>
  );
};

export default Footer;
