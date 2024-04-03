import React, { useState } from "react";
import Draggable from "react-draggable";
import ChatPage from "./ChatPage";

const Dragable = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {/* Wrap each block with Draggable component */}
      <div onClick={toggleSidebar}>
        <Draggable>
          <div
            className=""
            style={{
              position: "fixed",
              top: "5rem",
              right: "0",
              zIndex: "10000000",
            }}
          >
            <img
              src="img/placeholders/avatars/avatar15.jpg"
              alt="avatar"
              className="widget-image img-circle pull-left"
            />
          </div>
        </Draggable>
      </div>
      <div style={{ display: isSidebarOpen ? "block" : "none" }}>
        {<ChatPage  />}
      </div>
    </>
  );
};

export default Dragable;
