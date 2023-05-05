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
 

  const items = [
    { name: "Profile", tab: "profile" },
    { name: "Create Ad", tab: "newad" },
    { name: "Pending Review", tab: "pendingads" },
    { name: "Active Ads ", tab: "listedads" },
    { name: "Sponsor Ad", tab: "sponserad" },
    { name: "Pending Sponser Ads", tab: "sponseredpendingad" },
    { name: "Sponsored Ads", tab: "sponseredad" },
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
        {items.map((item) => {
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
        {activetab === "history" && <HistoryTab id={user.user._id} />}
        {activetab === "listedads" && <ListedAdsTab id={user.user._id} />}
        {activetab === "sponserad" && <SponserAdTab id={user.user._id} />}
        {activetab === "sponseredpendingad" && (
          <SponseredAdPendingTab id={user.user._id} />
        )}
        {activetab === "pendingads" && (
          <PendingAdTab  id={user.user._id} />
        )}
        {activetab === "sponseredad" && <Listedogos id={user.user._id} />}
      </div>
    </div>
  );
};

export default UserDashboard;
