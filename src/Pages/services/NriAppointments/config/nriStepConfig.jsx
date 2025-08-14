import AppointmentDisclamer from "../steps/AppointmentDisclamer";
import Conformation from "../steps/Conformation";
import PersonalInfo from "../steps/PersonalInfo";
import SlotSelection from "../steps/SlotSelection";

export const NriAppointmentBookingSteps = [
  {
    title: "Disclimar",
    component: AppointmentDisclamer,
    validationSchema: null,
  },
  { title: "Personal Info", component: PersonalInfo, validationSchema: null },
  { title: "Slot Selection", component: SlotSelection, validationSchema: null },
  { title: "Conformation", component: Conformation, validationSchema: null },
];
