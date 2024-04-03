import React, { useState } from "react";
import AltSideBar from "../Component/main-container/alt-sidebar/AltSideBar";
import MainContainer from "../Component/MainContainer";
import { Route, Routes } from "react-router-dom";
import ChatPage from "../Component/main-container/ChatPage";
import Header from "../Component/main-container/Header";
import MarketPlace from "../Component/MarketPlace";
import SideBar from "../Component/SideBar";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import TextArea from "../Component/main-container/TextArea";
import MyConnects from "./my-connects/MyConnects";

const LandingPage = () => {
  const background_color = useSelector(
    (state) => state.changeBackgroundColorReducer
  );
  const sidebarState = useSelector((state) => state.sidebarReducer);

  return (
    <div id="page-wrapper">
      <div
        id="page-container"
        className={`${
          sidebarState
            ? "sidebar-partial sidebar-visible-lg sidebar-visible-sm"
            : ""
        } `}
      >
        {/* <Dragable /> */}

        <AltSideBar />
        <div style={{ display: sidebarState ? "block" : "none" }}>
          <SideBar />
        </div>

        <TextArea />
        <Header />
        <br />
        <div className={`${background_color}`} id="main-container">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<MainContainer />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/market-place" element={<MarketPlace />} />
              <Route path="/discover-people" element={<MyConnects />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
