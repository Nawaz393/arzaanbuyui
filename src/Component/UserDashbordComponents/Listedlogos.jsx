import React, { useEffect, useState } from "react";
import SponserAd from "./SponserAd";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader";
const Listedogos = ({ id }) => {
  const [listed, setListed] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/sponserad/approved", {
          params: { userid: id },
        });
        if (res.status === 200) {
          setListed(res.data);
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
        {listed.length > 0 ? "Active on website Logos " : "No  active logos"}
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-x-5  md:grid-cols-3 xl:grid-cols-4  justify-center w-[80vw] md:px-10 ">
          {listed?.map((item, index) => {
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

export default Listedogos;
