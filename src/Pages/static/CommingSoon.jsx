import { useEffect } from "react";
import { FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import OmSymbol from "../../assets/om.png";

const ComingSoon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/comming-soon");
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 px-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-amber-500/20 shadow-inner">
        <img src={OmSymbol} alt="Om Symbol" className="object-contain" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-amber-800 sm:text-5xl">
        Coming Soon
      </h1>
      <p className="mt-4 max-w-xl text-lg text-amber-700">
        We are preparing something divine for you ✨ Stay tuned for upcoming
        features.
      </p>

      {/* Clock / Wait Indicator */}
      <div className="mt-8 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md">
        <FiClock className="text-amber-600" />
        <span className="font-medium text-amber-700">Launching Soon</span>
      </div>

      {/* Decorative Divider */}
      <div className="mt-12 h-1 w-24 rounded bg-amber-500/60"></div>

      {/* Footer Note */}
      <p className="mt-6 text-sm text-amber-600">
        🌙 Your patience will be rewarded 🙏
      </p>

      {/* Back to Home */}
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-amber-600 px-6 py-2 text-sm font-medium text-white shadow transition-colors duration-200 hover:bg-amber-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ComingSoon;
