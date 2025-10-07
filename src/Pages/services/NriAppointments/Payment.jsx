import React from "react";
import axios from "axios";

const Payment = () => {
  const handlePayment = async () => {
    try {
      // 1. Create order on backend
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/create-order",
        {
          amount: 500, // INR 500
        },
      );

      console.log(data, "--data--");

      // 2. Open Razorpay checkout
      const options = {
        key: "rzp_test_RJpSf6Y1FFnjFo", // from Razorpay Dashboard (Test Key)
        amount: data.amount,
        currency: data.currency,
        name: "My App",
        description: "Test Transaction",
        order_id: data.id,
        handler: async (response) => {
          // 3. Verify payment on backend
          const verifyRes = await axios.post(
            "http://localhost:4000/api/payment/verify-payment",
            response,
          );
          if (verifyRes.data.success) {
            console.log("Payment successful!");
            alert("success");
          } else {
            console.log("Payment failed!");
            alert("failed");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handlePayment}>Pay ₹500</button>;
};

export default Payment;
