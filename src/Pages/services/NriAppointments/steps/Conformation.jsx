import { useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { API_BASE_URL } from "../../../../utils/constants";
import { FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import Payment from "../Payment";

const Confirmation = () => {
  const [slotInfo, setSlotInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getValues } = useFormContext();
  const formData = getValues(); // ✅ All form values so far

  useEffect(() => {
    if (formData.selectedSlot) {
      fetchSlotInfo(formData.selectedSlot);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSlotInfo = async (slotId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/nriAppointment/${slotId}`,
      );
      setSlotInfo(res.data?.data || null);
    } catch (error) {
      console.error("Error fetching slot info:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800">
          Review Your Appointment
        </h2>
        <p className="mt-2 text-amber-600">
          Please review your details before proceeding to payment.
        </p>
      </div>

      {/* Personal Information */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-amber-700">
          <FaUser className="text-amber-500" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <p>
            <span className="font-medium text-gray-600">Name:</span>{" "}
            {formData.name}
          </p>
          <p>
            <span className="font-medium text-gray-600">Email:</span>{" "}
            {formData.email}
          </p>
          <p>
            <span className="font-medium text-gray-600">Mobile:</span>{" "}
            {formData.mobile}
          </p>
          <p>
            <span className="font-medium text-gray-600">Country:</span>{" "}
            {formData.country}
          </p>
          <p>
            <span className="font-medium text-gray-600">Gender:</span>{" "}
            {formData.gender}
          </p>
          <p>
            <span className="font-medium text-gray-600">Date of Birth:</span>{" "}
            {formData.dob}
          </p>
          <p>
            <span className="font-medium text-gray-600">Place of Birth:</span>{" "}
            {formData.placeOfBirth}
          </p>
          <p>
            <span className="font-medium text-gray-600">Birth Time:</span>{" "}
            {formData.time}
          </p>
        </div>
      </div>

      {/* Appointment Slot */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <h3 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-amber-700">
          <FaCalendarAlt className="text-amber-500" /> Appointment Slot
        </h3>
        {loading ? (
          <p className="text-gray-500">Loading slot info...</p>
        ) : slotInfo ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p>
              <span className="font-medium text-gray-600">Date:</span>{" "}
              {slotInfo.ref_date}
            </p>
            <p>
              <span className="font-medium text-gray-600">Time:</span>{" "}
              {slotInfo.start_time} – {slotInfo.end_time}
            </p>
            <p>
              <span className="font-medium text-gray-600">Status:</span>{" "}
              {slotInfo.status}
            </p>
            <p>
              <span className="font-medium text-gray-600">Capacity:</span>{" "}
              {slotInfo.capacity}
            </p>
          </div>
        ) : (
          <p className="text-red-500">No slot info available</p>
        )}
      </div>

      {/* Payment Summary */}
      {slotInfo && (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h3 className="mb-4 flex items-center gap-2 border-b pb-2 text-lg font-semibold text-amber-700">
            <FaMoneyBillWave className="text-green-500" /> Payment Summary
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center justify-between border-b pb-2">
              <span>Consultation Fee</span>
              <span className="font-medium">
                ₹{(slotInfo.price_in_paise / 100).toLocaleString()}{" "}
                {slotInfo.currency}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span>Convenience Fee</span>
              <span className="font-medium">₹50</span>
            </div>
            <div className="flex items-center justify-between pt-2 text-lg font-bold text-amber-800">
              <span>Total Payable</span>
              <span>
                ₹{(slotInfo.price_in_paise / 100 + 50).toLocaleString()}{" "}
                {slotInfo.currency}
              </span>
            </div>
          </div>
        </div>
      )}
      <Payment />
    </div>
  );
};

export default Confirmation;
