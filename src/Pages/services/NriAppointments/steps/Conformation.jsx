import { useEffect, useState } from "react";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { API_BASE_URL } from "../../../../utils/constants";

const Conformation = () => {
  const [slotInfo, setSlotInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getValues } = useFormContext();
  const formData = getValues(); // ✅ Get all values filled so far

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
    <div className="space-y-6 p-6">
      <h2 className="border-b pb-2 text-xl font-bold">
        Review Your Appointment
      </h2>

      {/* Step 1: Disclaimer */}
      <div>
        <h3 className="text-lg font-semibold">Disclaimer</h3>
        <p>✅ Terms & Conditions accepted</p>
        <p>🌍 Country Zone: {formData.countryzone}</p>
      </div>

      {/* Step 2: Personal Info */}
      <div>
        <h3 className="text-lg font-semibold">Personal Info</h3>
        <ul className="space-y-1">
          <li>
            <b>Name:</b> {formData.name}
          </li>
          <li>
            <b>Email:</b> {formData.email}
          </li>
          <li>
            <b>Mobile:</b> {formData.mobile}
          </li>
          <li>
            <b>Country:</b> {formData.country}
          </li>
          <li>
            <b>Gender:</b> {formData.gender}
          </li>
          <li>
            <b>Date of Birth:</b> {formData.dob}
          </li>
          <li>
            <b>Place of Birth:</b> {formData.placeOfBirth}
          </li>
          <li>
            <b>Preferred Time:</b> {formData.time}
          </li>
        </ul>
      </div>

      {/* Step 3: Slot Info */}
      <div>
        <h3 className="text-lg font-semibold">Selected Slot</h3>
        {loading ? (
          <p className="text-gray-500">Loading slot info...</p>
        ) : slotInfo ? (
          <ul className="space-y-1">
            <li>
              <b>Date:</b> {slotInfo.ref_date}
            </li>
            <li>
              <b>Time:</b> {slotInfo.start_time} - {slotInfo.end_time}
            </li>
            <li>
              <b>Status:</b> {slotInfo.status}
            </li>
            <li>
              <b>Price:</b> ₹{(slotInfo.price_in_paise / 100).toLocaleString()}{" "}
              {slotInfo.currency}
            </li>
            <li>
              <b>Capacity:</b> {slotInfo.capacity}
            </li>
          </ul>
        ) : (
          <p className="text-red-500">No slot info available</p>
        )}
      </div>
    </div>
  );
};

export default Conformation;
