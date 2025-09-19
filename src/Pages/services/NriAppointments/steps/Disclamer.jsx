import { useFormContext } from "react-hook-form";
import CustomInputCheckbox from "../../../../components/controls/CustomInputCheckbox";
import CustomInputSelect from "../../../../components/controls/CustomInputSelect";
import { countries } from "../../../../utils/constants";

const Disclamer = () => {
  const { control } = useFormContext();
  return (
    <div>
      <CustomInputSelect
        control={control}
        name="countryzone"
        label="Country (Timezone)"
        options={countries}
        required
        className="mb-3 w-full sm:w-1/2"
      />
      <p className="mb-3 text-sm text-gray-700">
        <b>Important:</b> By booking an appointment, you agree to the following
      </p>
      Terms & Conditions:
      <ul className="mt-2 list-disc pl-6">
        <li>
          Your selected appointment slot may be rescheduled due to unforeseen
          reasons (official work, emergencies, or unavoidable circumstances).
          You will be notified in advance in such cases.
        </li>
        <li>
          Please keep your contact details updated so that we can reach you for
          any changes.
        </li>
        <li>
          Appointment fees are non-refundable except in case of cancellation by
          us.
        </li>
        <li>
          Ensure you join on time. Delays may lead to reduced consultation time.
        </li>
        <li>
          By proceeding, you acknowledge that you have read and understood these
          terms.
        </li>
      </ul>
      <CustomInputCheckbox
        name="tnc"
        control={control}
        label={
          <>
            I agree to the{" "}
            <a href="/terms" className="text-amber-600">
              terms and conditions
            </a>
          </>
        }
        required
        className="mt-3"
      />
    </div>
  );
};

export default Disclamer;
