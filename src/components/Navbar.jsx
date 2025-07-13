import React from "react";
import OmSymbol from "../assets/om.png";
import LordGanesha from "../assets/lord-ganesha.png";
import SunLogo from "../assets/sun.png";
import LordVenkateswara from "../assets/lord-venkateswara.png";
import SwastikSymbol from "../assets/swastik.png";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600">
      <div className="section flex items-center justify-between py-4">
        {/* Left Images */}
        <div className="flex items-center space-x-4">
          <img
            src={OmSymbol}
            alt="Om Symbol"
            className="h-22 w-22 object-cover"
          />
          <img
            src={LordGanesha}
            alt="Lord Ganesha"
            className="h-22 w-22 object-cover"
          />
        </div>

        {/* Center Logo */}
        <div>
          <img
            src={SunLogo}
            alt="Sun Logo"
            className="h-22 w-auto object-cover"
          />
        </div>

        {/* Right Images */}
        <div className="flex items-center space-x-4">
          <img
            src={LordVenkateswara}
            alt="Lord Venkateswara"
            className="h-22 w-22 object-cover"
          />
          <img
            src={SwastikSymbol}
            alt="Swastik Symbol"
            className="h-22 w-22 object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
