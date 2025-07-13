import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTextInput from "../../components/controls/CustomInutText";
import CustomRadioGroup from "../../components/controls/CustomRadioGroup";
import CustomInputDate from "../../components/controls/CustomInputDate";
import CustomTimeInput from "../../components/controls/CustomInputTime";
import CustomInputTextArea from "../../components/controls/CustomInputTextArea";

import { genderOptions } from "../../utils/constants";
import { emailHoroscopeSchema } from "../../validations/emailHoroscope.schema";

export default function EmailHoroscope() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(emailHoroscopeSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted Horoscope Request:", data);
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Email Horoscope Request
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 gap-4"
      >
        <CustomTextInput
          name="name"
          control={control}
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <CustomTextInput
          name="email"
          control={control}
          label="Email Address"
          placeholder="you@example.com"
          required
        />

        <CustomRadioGroup
          name="gender"
          control={control}
          label="Gender"
          options={genderOptions}
          required
        />

        <CustomInputDate
          name="dob"
          control={control}
          label="Date of Birth"
          required
        />

        <CustomTextInput
          name="placeOfBirth"
          control={control}
          label="Place of Birth"
          placeholder="e.g., Mumbai"
          required
        />

        <CustomTimeInput
          name="time"
          control={control}
          label="Time of Birth"
          required
        />

        <CustomInputTextArea
          name="additionalNotes"
          control={control}
          label="Additional Notes"
          placeholder="Mention any specific questions or focus area (optional)"
        />

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-amber-600 py-2 font-semibold text-white transition hover:bg-amber-700"
        >
          Get Horoscope by Email
        </button>
      </form>
    </div>
  );
}
