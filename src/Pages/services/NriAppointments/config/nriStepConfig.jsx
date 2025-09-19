import Conformation from "../steps/Conformation";
import Disclamer from "../steps/Disclamer";
import PersonalInfo from "../steps/PersonalInfo";
import SlotSelection from "../steps/SlotSelection";
// import {
//   disclamerSchema,
//   personalInfoSchema,
// } from "./nriAppointmentValidation.schema";

export const NriAppointmentBookingSteps = [
  {
    title: "Disclamer",
    component: Disclamer,
    validationSchema: null,
  },
  {
    title: "Personal Info",
    component: PersonalInfo,
    validationSchema: null,
  },
  { title: "Slot Selection", component: SlotSelection, validationSchema: null },
  { title: "Conformation", component: Conformation, validationSchema: null },
];
