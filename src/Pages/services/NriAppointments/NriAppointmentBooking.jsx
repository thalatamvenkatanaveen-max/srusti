import MultiStepWizard from "../../../layouts/MultiStepWizard";
import { NriAppointmentBookingSteps } from "./config/nriStepConfig";

const NriAppointmentBooking = () => {
  const handleFinish = (data) => {
    console.log(data, "jio");
  };

  return (
    <div>
      <MultiStepWizard
        steps={NriAppointmentBookingSteps}
        handleFinish={handleFinish}
      />
    </div>
  );
};

export default NriAppointmentBooking;
