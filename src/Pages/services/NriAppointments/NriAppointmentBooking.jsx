import MultiStepWizard from "../../../layouts/MultiStepWizard";
import { NriAppointmentBookingSteps } from "./config/nriStepConfig";

const NriAppointmentBooking = () => {
  return (
    <div>
      <MultiStepWizard steps={NriAppointmentBookingSteps} />
    </div>
  );
};

export default NriAppointmentBooking;
