import React, { useState, useEffect } from "react";
import Header from "./main-container/Header";
import PageContent from "./main-container/PageContent";
import Footer from "./main-container/Footer";

const MainContainer = () => {
  const [showUpperBar, setShowUpperBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page has been scrolled beyond a certain threshold
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 100; // Adjust this value as needed
      setShowUpperBar(scrollY > threshold);
    };

    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <PageContent />
      <Footer />
    </>
  );
};

export default MainContainer;
