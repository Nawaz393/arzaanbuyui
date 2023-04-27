import React, { useState, useEffect } from "react";
import ListedAd from "./ListedAd";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";

const ListedAds = ({ id }) => {
  const [listedads, setListedAds] = useState([]);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const res = await axios.get("personalads/approved", {
          params: { userid: id },
        });

        if (res.status === 200) {
          setListedAds(res.data);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [load]);

  const setload = () => {
    setLoad(!load);
  };
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-center mt-5">
        {listedads.length > 0 ? "Listed Ads" : "No Listed Ads"}
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-x-5  md:grid-cols-2  justify-center w-[80vw] md:px-10 ">
          {listedads?.map((item) => {
            return <ListedAd ad={item} key={item._id} setLoad={setload} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ListedAds;
