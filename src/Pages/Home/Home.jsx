import React from "react";
import { useNavigate } from "react-router-dom";

import HeroImg from "../../assets/HeroImg.png";
import PlateImg from "../../assets/plate.jpg";
import SunImg from "../../assets/sun.png";
import { NAV_ITEMS, zodiacSymbols } from "../../utils/constants";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="section">
      <section className="mt-12 flex flex-col items-start justify-between md:flex-row">
        {/* Hero + Image */}
        <div className="mx-auto flex flex-1 flex-col items-center justify-between gap-10 lg:flex-row lg:gap-20">
          <img
            src={HeroImg}
            alt="Astrologer portrait"
            className="h-96 w-auto object-cover"
          />
          <div className="space-y-4 text-center text-amber-700 lg:mr-32">
            <h1 className="text-4xl font-bold">ASTROLOGER</h1>
            <h2 className="text-4xl font-semibold">Anantha Chary Guruji</h2>
            <p className="max-w-md text-lg text-amber-500">
              Spiritual guidance & accurate astrology readings from a trusted
              name. Available globally for online consultations.
            </p>
          </div>
        </div>

        {/* Card Links */}
        <aside className="mx-auto px-4 py-8">
          <ul className="space-y-4">
            {NAV_ITEMS.map((card) => (
              <li key={card.path}>
                <div
                  onClick={() => navigate(card.path)}
                  className="relative cursor-pointer rounded-lg bg-cover bg-center px-6 py-2 text-2xl font-bold text-red-900 shadow-md transition-transform hover:scale-105"
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
        <div className="pointer-events-none absolute inset-0 -z-1 hidden items-center justify-center md:flex">
          <div
            className="relative flex h-[300px] w-[300px] animate-spin items-center justify-center rounded-full opacity-30"
            style={{ animationDuration: "180s" }}
          >
            {zodiacSymbols.map((symbol, i) => {
              const angle = i * 30;
              return (
                <span
                  key={i}
                  className="absolute text-5xl"
                  style={{
                    transform: `rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`,
                  }}
                >
                  {symbol}
                </span>
              );
            })}
            <img src={SunImg} alt="Sun" className="h-56 w-56 object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
}
