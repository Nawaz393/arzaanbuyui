import React from "react";
import { Link } from "react-router-dom";

const Receipt = ({ payment }) => {
  console.log(JSON.stringify(payment));
  const { payer, transactions } = payment;

  return (
    <div className=" flex justify-center">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">Payment Receipt</h1>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Payer Information</h2>
          <p>
            {payer.payer_info.first_name} {payer.payer_info.last_name}
          </p>
          <p>{payer.payer_info.email}</p>
          <p>{payer.payer_info.shipping_address.line1}</p>
          <p>
            {payer.payer_info.shipping_address.city},{" "}
            {payer.payer_info.shipping_address.state}{" "}
            {payer.payer_info.shipping_address.postal_code}
          </p>
          <p>{payer.payer_info.country_code}</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Transaction Details</h2>
          {transactions.map((transaction, index) => (
            <div key={index} className="border-b py-4">
              <p className="text-lg font-bold mb-2">
                {transaction.description}
              </p>
              <p>{transaction.amount.total} USD</p>
            </div>
          ))}
        </div>
        <Link
          to="/Userdashboard"
          className="text-blue-700 hover:underline text-center text-lg"
          replace
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Receipt;
