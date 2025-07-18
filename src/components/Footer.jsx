import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaSun,
  FaStar,
  FaStroopwafel,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaCompass,
} from "react-icons/fa";
import { zodiacSymbols } from "../utils/zodic-symbols";
import SrustiLogo from "../assets/srusti-logo.png";
const Footer = () => {
  const quickLinks = [
    { id: "horoscope", label: "Daily Horoscope" },
    { id: "panchang", label: "Panchang" },
    { id: "festivals", label: "Festivals" },
    { id: "book-pooja", label: "Book Pooja" },
    { id: "updates", label: "Updates" },
  ];

  const services = [
    "Personal Consultation",
    "Birth Chart Analysis",
    "Gemstone Consultation",
    "Vastu Shastra",
    "Numerology",
  ];

  return (
    <footer className="bg-gradient-to-br from-amber-500 via-25% to-amber-500 text-indigo-700">
      {/* Zodiac Banner */}
      <div className="border-b border-sky-700">
        <div className="section mx-auto px-4 py-6">
          <h3 className="mb-4 text-center font-serif text-lg font-semibold text-yellow-400">
            Quick Zodiac Access
          </h3>
          <div className="flex items-center justify-center space-x-4 overflow-x-auto md:space-x-8">
            {zodiacSymbols.map((sign) => (
              <button
                key={sign.alt}
                className="group flex flex-col items-center transition hover:text-yellow-400"
                title={sign.alt}
              >
                <div className="text-2xl transition-transform group-hover:scale-110">
                  <img src={sign.image} className="w-10" />
                </div>
                <span className="hidden text-xs md:block">{sign.alt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section mx-auto grid gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* About */}
        <div className="">
          <div className="flex items-center">
            <img src={SrustiLogo} className="w-24" />
            <h3 className="text-2xl font-bold">
              <span className="text-yellow-400">Srusti</span> Astrology
            </h3>
          </div>
          <p className="text-gray-300">
            Experience divine guidance through ancient Vedic wisdom. Our
            spiritual center offers personalized consultations, sacred rituals,
            and celestial insights to illuminate your path.
          </p>
          <div className="mt-8 flex justify-evenly space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="h-6 w-6 cursor-pointer text-gray-300 transition hover:text-yellow-400" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="h-6 w-6 cursor-pointer text-gray-300 transition hover:text-yellow-400" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="h-6 w-6 cursor-pointer text-gray-300 transition hover:text-yellow-400" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="h-6 w-6 cursor-pointer text-gray-300 transition hover:text-yellow-400" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl font-semibold text-yellow-400">
            Quick Links
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.id}>
                <button className="block text-gray-300 transition hover:text-yellow-400">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl font-semibold text-yellow-400">
            Our Services
          </h4>
          <ul className="space-y-2">
            {services.map((service) => (
              <li
                key={service}
                className="cursor-pointer text-gray-300 transition hover:text-yellow-400"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="font-serif text-xl font-semibold text-yellow-400">
            Contact Us
          </h4>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start space-x-3">
              <FaMapMarkerAlt className="mt-0.5 h-5 w-5 text-yellow-400" />
              <p>
                Srusti Astrology Center
                <br />
                123 Spiritual Lane
                <br />
                Hyderabad, SC 12345
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="h-5 w-5 text-yellow-400" />
              <p>info@srusti.com</p>
            </div>
            <div className="flex items-start space-x-3">
              <FaClock className="mt-0.5 h-5 w-5 text-yellow-400" />
              <p>
                Mon - Fri: 9:00 AM - 7:00 PM
                <br />
                Sat - Sun: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mystical Divider */}
      <div className="border-t border-sky-700 py-6">
        <div className="flex justify-center space-x-8">
          <div className="flex items-center space-x-2 text-yellow-400">
            <FaSun className="h-5 w-5 animate-pulse" />
            <span className="text-sm">Solar Wisdom</span>
          </div>
          <div className="flex items-center space-x-2 text-yellow-400">
            <FaCompass className="h-5 w-5 animate-pulse" />
            <span className="text-sm">Vastu Guidance</span>
          </div>
          <div className="flex items-center space-x-2 text-yellow-400">
            <FaStroopwafel className="h-5 w-5 animate-pulse" />
            <span className="text-sm">Astro Services</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-700 bg-amber-500 py-4">
        <div className="section mx-auto flex flex-col items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Srusti Astrology Center. All rights
            reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-300">
            <a href="#" className="hover:text-yellow-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-yellow-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-yellow-400">
              Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
