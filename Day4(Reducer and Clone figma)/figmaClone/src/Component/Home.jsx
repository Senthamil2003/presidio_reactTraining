import React from "react";
import Navbar from "./Navbar";
import "./home.css";
import hero from "../assets/Images/Hero.png"

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="home-cont">
        <div className="home-left">
          <div className="home-main-txt">
            Live on <br />
            <span className="home-green-txt"> fruits & vegetables</span>
            <br />
            to live Healthy
          </div>
          <div className="home-underline">
          100% Healthy & Fresh
          </div>
          <button className="shop-now">Shop Now</button>
        </div>
        <div className="home-right">
          <div className="home-hero-img">
            <img src={hero} alt="" />
          </div>
        </div>
        
      </div>
    </div>
  );
}
