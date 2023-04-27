import React from "react";
import HistoryAd from "./HistoryAd";
import Loader from "../Loader";
import { toast } from "react-toastify";
import axios from "axios";
const HistoryTab = ({ id }) => {
  const [ads, setAds] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("personalads/history", {
          params: {
            id,
          },
        });
        setAds(await res.data);
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data);
        } else if (error.code === "ERR_NETWORK") {
          toast.error("Network Error");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {ads.length === 0 && (
        <p className="text-center font-semibold font-quick mb-10 text-gray-500">
          {" "}
          No history found
        </p>
      )}
      <h1 className="text-center font-semibold font-quick mb-10 text-gray-500">
        Your History
      </h1>
      <div className="grid grid-cols-1 gap-x-5  md:grid-cols-2  justify-center w-[80vw] md:px-10 ">
        {ads.map((ad) => (
          <HistoryAd ad={ad} key={ad._id} />
        ))}
      </div>
    </div>
  );
};

export default HistoryTab;
