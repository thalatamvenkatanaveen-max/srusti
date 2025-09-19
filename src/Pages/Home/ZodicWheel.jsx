import { zodiacSymbols } from "../../utils/zodic-symbols";
import SunImg from "../../assets/sun.png";

const ZodicWheel = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-1 hidden items-center justify-center border md:flex">
      <div
        className="relative flex h-[300px] w-[300px] animate-spin items-center justify-center rounded-full opacity-40"
        style={{ animationDuration: "180s" }}
      >
        {zodiacSymbols.map((item, i) => {
          const angle = i * 30;
          return (
            <span
              key={i}
              className="absolute"
              style={{
                transform: `rotate(${angle}deg) translateX(200px) rotate(-${angle}deg)`,
              }}
            >
              <img src={item.image} alt={item.alt} className="w-22" />
            </span>
          );
        })}
        <img src={SunImg} alt="Sun" className="h-50 w-50 object-contain" />
      </div>
    </div>
  );
};

export default ZodicWheel;
