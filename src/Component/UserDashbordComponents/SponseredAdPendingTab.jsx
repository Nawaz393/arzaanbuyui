import React, { useEffect, useState } from "react";
import SponserAd from "./SponserAd";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader";

const SponseredAdPendingTab = ({ id }) => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/sponserad/user", {
          params: { userid: id },
        });
        if (res.status === 200) {
          setPending(res.data);
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
  }, []);
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-center mt-5">
        {pending.length > 0
          ? "Pending Sponsered  Logos "
          : "No pending sponsered logos"}
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-x-5  md:grid-cols-3 xl:grid-cols-4  justify-center w-[80vw] md:px-10 ">
          {pending.map((item, index) => {
            return (
              <SponserAd
                key={index}
                imageUrl={item.image}
                location={item.location}
                link={item.link}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SponseredAdPendingTab;
