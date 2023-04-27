import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Receipt from "../../Component/Receipt";
import Loader from "../../Component/Loader";

const Success = () => {
  const [session, setSession] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const paymentId = searchParams.get("paymentId");
  const token = searchParams.get("token");
  const PayerID = searchParams.get("PayerID");

  console.log(paymentId, token, PayerID);
  useEffect(() => {
    async function fetchSession() {
      setLoading(true);
      try {
        const products = await axios.get("/payment/success", {
          params: {
            paymentId: paymentId,
            token: token,
            PayerID: PayerID,
          },
        });

        if (products.status === 200) {
          const productsJson = await products.data;
          console.log(productsJson);
          setSession(productsJson);
        }
      } catch (error) {
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
    }
    fetchSession();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return <div> {session != null && <Receipt payment={session} />} </div>;
};

export default Success;
