import React from "react";
import "./OrderSuccess.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircle />

      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
