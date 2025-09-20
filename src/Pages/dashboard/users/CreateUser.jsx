import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomTextInput from "../../../components/controls/CustomInputText";
import CustomInputPassword from "../../../components/controls/CustomInputPassword";
import { API_BASE_URL } from "../../../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { createUserSchema } from "../../../validations/dashboard/createUser.schema";

const CreateUser = ({ handleClose, isEdit, selectedUser, refreshUsers }) => {
  const required = true;

  // Use schema dynamically based on isEdit
  const { control, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(createUserSchema(isEdit)),
  });

  const [loading, setLoading] = useState(false);

  // Set values when editing
  useEffect(() => {
    if (isEdit && selectedUser) {
      setValue("name", selectedUser.name);
      setValue("mobile", selectedUser.mobile);
      setValue("email", selectedUser.email); // optional, disabled in UI
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, selectedUser]);

  // Create user
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const id = toast.loading("Saving user...");

      await axios.post(`${API_BASE_URL}/user`, data);

      toast.update(id, {
        render: "User created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      reset();
      handleClose();
      refreshUsers();
    } catch (err) {
      toast.error("Failed to save user. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update user
  const onUpdate = async (data) => {
    try {
      setLoading(true);
      const id = toast.loading("Updating user...");

      await axios.put(`${API_BASE_URL}/user/${selectedUser.user_id}`, data);

      toast.update(id, {
        render: "User updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      reset();
      handleClose();
      refreshUsers();
    } catch (err) {
      toast.error("Failed to update user. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(isEdit ? onUpdate : onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Name */}
        <CustomTextInput
          control={control}
          name="name"
          label="Name"
          placeholder="Enter full name"
          required={required}
        />

        {/* Email */}
        {!isEdit && (
          <CustomTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email address"
            required={required}
          />
        )}

        {/* Mobile */}
        <CustomTextInput
          control={control}
          name="mobile"
          label="Mobile"
          placeholder="Enter 10-digit mobile"
          required={required}
        />

        {/* Password */}
        {!isEdit && (
          <CustomInputPassword
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            required={required}
          />
        )}

        {/* Submit */}
        <div className="sticky right-0 bottom-0 left-0 border-t border-gray-300 bg-white py-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg py-2 font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {loading ? "Please wait..." : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
