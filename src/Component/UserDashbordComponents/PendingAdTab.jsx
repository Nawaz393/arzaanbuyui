import PendingAd from "./PendingAd";
import { axios, useState, useEffect, toast, ToastContainer } from "../Imports";
import Loader from "../Loader";

const PendingAdTab = ({ ad, id }) => {
  const [pendingAds, setPendingAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        var tid = "toast";

        const res = await axios.get("/personalads/pending", { params: { id } });

        if (res.status === 200) {
          setPendingAds(res.data);
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data, { toastId: tid });
        } else if (error.code === "ERR_NETWORK") {
          toast.error("Network Error", { toastId: tid });
        } else {
          toast.error("Something went wrong", { toastId: tid });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <main className="min-h-screen">
        <ToastContainer />

        {loading ? (
          <Loader />
        ) : (
          <div>
            <h1 className="text-xl my-10 text-center ">
              {pendingAds.length > 0 ? "Pending Ads" : "No Pending Ads"}
            </h1>
            <section className="grid grid-cols-1 gap-x-5  md:grid-cols-2  justify-center w-[80vw] md:px-10 ">
              {pendingAds.map((ad) => {
                return <PendingAd ad={ad} key={ad._id} />;
              })}
            </section>
          </div>
        )}
      </main>
    </>
  );
};

export default PendingAdTab;
