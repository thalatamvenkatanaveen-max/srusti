import { useNavigate } from "react-router-dom";
import OmSymbol from "../../assets/om.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-100 via-yellow-50 to-amber-200 px-6 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-amber-500/20 shadow-inner">
        <img src={OmSymbol} alt="Om Symbol" className="object-contain" />
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-amber-800 sm:text-6xl">404</h1>
      <p className="mt-4 text-lg text-amber-700">
        Oops! This page is lost in the stars ✨
      </p>

      {/* Action */}
      <button
        onClick={() => navigate("/")}
        className="mt-8 rounded-full bg-amber-600 px-6 py-2 font-medium text-white shadow-md transition hover:bg-amber-700"
      >
        Back to Home
      </button>

      {/* Decorative Divider */}
      <div className="mt-12 h-1 w-24 rounded bg-amber-500/60"></div>

      {/* Footer Note */}
      <p className="mt-6 text-sm text-amber-600">
        🌙 The universe guides you back 🙏
      </p>
    </div>
  );
};

export default NotFound;
