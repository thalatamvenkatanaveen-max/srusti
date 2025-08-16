import { useNavigate } from "react-router-dom";

import HeroImg from "../../assets/HeroImg.png";
import PlateImg from "../../assets/plate.png";
import { NAV_ITEMS } from "../../utils/constants";
import ZodicWheel from "./ZodicWheel";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="section">
      <section className="mt-4 flex flex-col items-center justify-between md:flex-row lg:items-start">
        {/* Hero + Image */}
        <div className="mx-auto mt-12 flex flex-1 flex-col items-center justify-between gap-10 lg:flex-row lg:gap-20">
          <img
            src={HeroImg}
            alt="Astrologer portrait"
            className="h-96 w-auto object-cover"
          />
          <div className="space-y-4 text-center text-amber-700 lg:mr-44">
            <h1 className="text-4xl font-bold text-pink-600">ASTROLOGER</h1>
            <h2 className="text-4xl font-semibold">Anantha Chary Guruji</h2>
            <p className="max-w-md text-lg font-bold text-blue-800">
              Spiritual guidance & accurate astrology readings from a trusted
              name. Available globally for online consultations.
            </p>
          </div>
        </div>

        {/* Card Links */}
        <aside className="mx-auto my-6 px-6">
          <ul className="space-y-2">
            {NAV_ITEMS.map((card) => (
              <li key={card.path}>
                <div
                  onClick={() => navigate(card.path)}
                  className="text-MD relative cursor-pointer bg-cover bg-center px-8 py-4 text-center font-bold text-yellow-200 hover:scale-105"
                  style={{ backgroundImage: `url(${PlateImg})` }}
                >
                  {card.path === "/nri-appointment" && (
                    <span className="absolute -top-2 -right-2 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white">
                      NRI’s Only
                    </span>
                  )}
                  {card.label}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Zodiac Wheel */}
        <ZodicWheel />
      </section>
    </div>
  );
}
