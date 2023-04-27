import React from "react";

function SponserAd({ imageUrl, link, location }) {
  return (
    <div className="flex  flex-col  rounded-lg ">
      <img
        className=" bg-gray-400  object-center object-cover"
        src={imageUrl}
        alt="Image"
      />

      <div>
        <p>
          <span className="text-lg font-bold">Link: </span>
          <a href={link}>{link}</a>
        </p>
        <p>
          <span className="text-lg font-bold">Location: </span>
          {location === 1 ? "top" : "bottom"}
        </p>
      </div>
    </div>
  );
}

export default SponserAd;
