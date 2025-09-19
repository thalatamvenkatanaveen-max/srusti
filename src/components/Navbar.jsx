import OmSymbol from "../assets/om.png";
import LordGanesha from "../assets/lord-ganesha.png";
import LogoFull from "../assets/logo.png";
import Logo from "../assets/srusti-logo.png";
import LordVenkateswara from "../assets/lord-venkateswara.png";
import SwastikSymbol from "../assets/swastik.png";
import { useEffect, useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiGrid, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);

  const { pathname } = useLocation();
  const isRoot = pathname === "/";

  useEffect(() => {
    if (isRoot) setHide(false);
  }, [isRoot]);

  return (
    <>
      <nav className="relative bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 shadow-md">
        {/* Toggle handle */}
        {!isRoot && (
          <button
            type="button"
            onClick={() => setHide((v) => !v)}
            aria-expanded={!hide}
            aria-controls="navbar-content"
            title={hide ? "Show header" : "Hide header"}
            className="absolute right-3 -bottom-8 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-amber-800 shadow ring-1 ring-black/5 hover:bg-white"
          >
            {hide ? (
              <FiChevronDown className="text-lg" />
            ) : (
              <FiChevronUp className="text-lg" />
            )}
            <span className="text-xs font-medium">
              {hide ? "Show" : "Hide"}
            </span>
          </button>
        )}

        {/* Collapsible wrapper: grid-rows trick for smooth height transition */}
        <div
          id="navbar-content"
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            hide ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="section flex items-center justify-between gap-3 py-3 sm:gap-6">
              {/* Left Icons */}
              <div className="flex items-center gap-2 sm:gap-4">
                <img
                  src={OmSymbol}
                  alt="Om Symbol"
                  className="h-12 w-12 object-contain sm:h-20 sm:w-20"
                  onClick={() => navigate("/")}
                />
                <img
                  src={LordGanesha}
                  alt="Lord Ganesha"
                  className="h-12 w-12 object-contain sm:h-20 sm:w-20"
                />
              </div>

              {/* Logo (responsive switch) */}
              <div className="flex flex-shrink-0 flex-col items-center">
                {/* Large Device Logo */}
                <img
                  src={LogoFull}
                  alt="Main Logo Full"
                  className="mx-auto hidden h-12 object-contain sm:block sm:h-16"
                />
                {/* Small Device Logo */}
                <img
                  src={Logo}
                  alt="Main Logo Small"
                  className="mx-auto block h-20 object-contain sm:hidden"
                />
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-2 sm:gap-4">
                <img
                  src={LordVenkateswara}
                  alt="Lord Venkateswara"
                  className="h-12 w-12 object-contain sm:h-20 sm:w-20"
                />
                <img
                  src={SwastikSymbol}
                  alt="Swastik Symbol"
                  className="h-12 w-12 object-contain sm:h-20 sm:w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="section flex items-center justify-between">
        <div className="cursor-pointer">Home</div>
        <div className="flex gap-5">
          <div className="cursor-pointer">Dahboard</div>
          <div className="cursor-pointer">Login</div>
        </div>
      </div> */}
      <div className="section flex items-center justify-between py-3 text-amber-900">
        <Link
          to="/"
          className="flex items-center gap-1 font-medium transition-colors duration-200 hover:text-amber-600"
        >
          <FiHome className="text-lg" />
          Home
        </Link>
        <div className="flex gap-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 font-medium transition-colors duration-200 hover:text-amber-600"
          >
            <FiGrid className="text-lg" />
            Dashboard
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-1 font-medium transition-colors duration-200 hover:text-amber-600"
          >
            <FiLogIn className="text-lg" />
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
