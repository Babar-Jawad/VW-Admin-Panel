import React from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
// import axios from "axios";
// import { useState, useEffect } from "react";

const Card = (props) => {
  // const [totalUsers, setTotalUser] = useState(0);
  // const [totalAdv, setTotalAdvr] = useState(0);

  // useEffect(() => {
  //   const getTotalUsers_Adv = async () => {
  //     const res = await axios.get(
  //       "http://localhost:4000/admin/getTotalUsers_Adv"
  //     );
  //     setTotalUser(res.data.totalUsers);
  //     setTotalAdv(res.data.totalAdv);
  //   };
  //   getTotalUsers_Adv();
  // }, []);

  const Png = props.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
        <span>{props.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${props.value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
};

export default Card;
