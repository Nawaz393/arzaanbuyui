import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import NewAdTab from "../Component/UserDashbordComponents/NewAdTab";
import ProfileTab from "../Component/UserDashbordComponents/ProfileTab";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ListedAdsTab from "../Component/UserDashbordComponents/ListedAdTab";
import HistoryTab from "../Component/UserDashbordComponents/HistoryTab";
import SponserAdTab from "../Component/UserDashbordComponents/SponserAdTab";

import PendingAdTab from "../Component/UserDashbordComponents/PendingAdTab";
import SponseredAdPendingTab from "../Component/UserDashbordComponents/SponseredAdPendingTab";
import Listedogos from "../Component/UserDashbordComponents/Listedlogos";
const UserDashboard = () => {
  const user = useSelector((state) => state.user.value);
  const ad = {
    name: "samsung",
    price: 1000,
    description: "samsung phone",
    images: [
      "https://images.unsplash.com/photo-1661956600684-97d3a4320e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MDc4Mzh8MXwxfGFsbHwxfHx8fHx8Mnx8MTY3NTg1NjIzOQ&ixlib=rb-4.0.3&q=80&w=400",
      "https://images.unsplash.com/profile-1609545740442-928866556c38image?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
    ],
    contact: "984567890",
    email: "abc@gmail.com",
    website: "m-nawaz.com",
    whatsapp: "984567890",
  };

  const items = [
    { name: "Profile", tab: "profile" },
    { name: "Create Ad", tab: "newad" },
    { name: "Pending Review", tab: "pendingads" },
    { name: "Active Ads ", tab: "listedads" },
    { name: "Sponsor Logo", tab: "sponserad" },
    { name: "Pending Logos", tab: "sponseredpendingad" },
    { name: "Sponsored Logos", tab: "sponseredad" },
    { name: "History", tab: "history" },
  ];

  const [activetab, setactivetab] = useState("profile");
  return (
    <div className=" ">
      <Menu
        isOpen={true}
        className="sticky  "
        styles={{
          bmBurgerButton: {
            position: "fixed",
            top: "8.7rem",
            left: "0.5rem",

            width: "25px",
            height: "15px",
            padding: "",
          },
          bmBurgerBars: {
            background: "#373a47",
          },

          bmCrossButton: {
            height: "24px",
            width: "24px",
          },
          bmCross: {
            background: "#bdc3c7",
          },

          bmMenu: {
            background: "#212222",
            padding: "2.5em 1.5em 0",
            fontSize: "1.15em",
          },

          bmItemList: {
            color: "#b8b7ad",

            padding: "0.8em",
          },
          bmItem: {
            display: "flex",
          },
          bmOverlay: {
            background: "rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        {items.map((item, index) => {
          return (
            <button
              id="home"
              className="menu-item
        hover:bg-gray-700 hover:rounded-md hover:px-2
        hover:py-1

        
        "
              key={item.name}
              onClick={() => setactivetab(item.tab)}
            >
              {item.name}
            </button>
          );
        })}
      </Menu>

      <div className="flex justify-center mb-10 ">
        <ToastContainer />
        {activetab === "profile" && <ProfileTab id={user.user._id} />}
        {activetab === "newad" && (
          <NewAdTab userid={user.user._id} role={user.user.role} />
        )}
        {activetab === "history" && <HistoryTab id={user.user._id}/>}
        {activetab === "listedads" && <ListedAdsTab id={user.user._id} />}
        {activetab === "sponserad" && <SponserAdTab id={user.user._id} />}
        {activetab === "sponseredpendingad" && (
          <SponseredAdPendingTab id={user.user._id} />
        )}
        {activetab === "pendingads" && (
          <PendingAdTab ad={ad} id={user.user._id} />
        )}
        {activetab==="sponseredad" && <Listedogos id={user.user._id}/>}
      </div>
    </div>
  );
};

export default UserDashboard;
