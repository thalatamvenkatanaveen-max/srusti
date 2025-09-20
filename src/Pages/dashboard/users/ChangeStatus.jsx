import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CustomInputSelect from "../../../components/controls/CustomInputSelect";
import CustomTextInput from "../../../components/controls/CustomInputText";
import { API_BASE_URL } from "../../../utils/constants";

const ChangeStatus = ({ handleClose, selectedUser, refreshUsers }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue, getValues } = useForm();

  useEffect(() => {
    if (selectedUser?.status) {
      setValue("status", selectedUser.status);
    }
  }, [selectedUser, setValue]);

  const handleNext = () => {
    const selectedStatus = getValues("status");
    if (selectedStatus === selectedUser?.status) {
      toast.error(`User is already ${selectedStatus}`);
      return;
    }
    setStep(2);
  };

  const onSubmit = async (data) => {
    if (!/^\d{6}$/.test(data.otp)) {
      toast.error("OTP must be a 6-digit number");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/user/${selectedUser.user_id}/status`, {
        status: data.status,
        otp: data.otp,
      });

      toast.success(`Status changed to ${data.status}`);
      refreshUsers();
      handleClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update status. Try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {step === 1 && (
        <div className="space-y-6">
          <CustomInputSelect
            control={control}
            name="status"
            label="Select Status"
            options={[
              { label: "ACTIVE", value: "ACTIVE" },
              { label: "INACTIVE", value: "INACTIVE" },
            ]}
            required={true}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <CustomTextInput
            control={control}
            name="otp"
            label="Enter OTP"
            placeholder="Enter 6-digit OTP"
            required={true}
          />

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
              disabled={loading}
            >
              {loading ? "Processing..." : "Change Status"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ChangeStatus;
