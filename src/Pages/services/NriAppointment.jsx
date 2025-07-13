import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../components/controls/CustomInutText";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTimeInput from "../../components/controls/CustomInputTime";
import { genderOptions } from "../../utils/constants";
import { nriAppointmentSchema } from "../../validations/nriAppointment.schema";

export default function NriAppointment() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(nriAppointmentSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="m-6 mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">NRI Appointment</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <CustomTextInput
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter your full name"
          required
          className="col-span-2"
        />

        <CustomTextInput
          name="email"
          control={control}
          label="Email Address"
          placeholder="you@example.com"
          required
          className="col-span-1"
        />

        <CustomTextInput
          name="mobile"
          control={control}
          label="Mobile Number"
          placeholder="+1‑202‑555‑0123"
          required
          className="col-span-1"
        />

        <CustomTextInput
          name="country"
          control={control}
          label="Country"
          placeholder="Your country"
          required
          className="col-span-2"
        />

        <CustomRadioGroup
          name="gender"
          control={control}
          label="Gender"
          options={genderOptions}
          required
          className="col-span-2"
        />

        <CustomInputDate
          name="dob"
          control={control}
          label="Date of Birth"
          required
          className="col-span-1"
        />

        <CustomTextInput
          name="placeOfBirth"
          control={control}
          label="Place of Birth"
          placeholder="e.g., New Delhi"
          required
          className="col-span-1"
        />

        <CustomTimeInput
          name="time"
          control={control}
          label="Time of Birth"
          required
          className="col-span-1"
        />

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full rounded-lg bg-amber-600 py-2 font-semibold text-white transition hover:bg-amber-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
