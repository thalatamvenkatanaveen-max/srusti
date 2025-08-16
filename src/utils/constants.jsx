export const NAV_ITEMS = [
  { label: "Online Appointment", path: "/nri-appointment-booking" },
  { label: "Email Horoscope", path: "/email-horoscope" },
  { label: "Vastu Services", path: "/vastu" },
  { label: "Upcoming Festivals", path: "/upcoming-festivals" },
  { label: "Book a Pooja", path: "/book-pooja" },
  { label: "Gallery", path: "/gallery" },
  { label: "Live Programs", path: "/live-programs" },
];

export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
