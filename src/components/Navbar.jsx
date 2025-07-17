import OmSymbol from "../assets/om.png";
import LordGanesha from "../assets/lord-ganesha.png";
import Logo from "../assets/logo.png";
import LordVenkateswara from "../assets/lord-venkateswara.png";
import SwastikSymbol from "../assets/swastik.png";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-600 shadow-md">
      <div className="section flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <img
            src={OmSymbol}
            alt="Om Symbol"
            className="h-20 w-20 object-contain"
          />
          <img
            src={LordGanesha}
            alt="Lord Ganesha"
            className="h-20 w-20 object-contain"
          />
        </div>

        <div className="flex-shrink-0">
          <img
            src={Logo}
            alt="Main Logo"
            className="mx-auto h-16 object-contain"
          />
        </div>

        <div className="flex items-center gap-4">
          <img
            src={LordVenkateswara}
            alt="Lord Venkateswara"
            className="h-20 w-20 object-contain"
          />
          <img
            src={SwastikSymbol}
            alt="Swastik Symbol"
            className="h-20 w-20 object-contain"
          />
        </div>
      </div>
    </nav>
  );
}
