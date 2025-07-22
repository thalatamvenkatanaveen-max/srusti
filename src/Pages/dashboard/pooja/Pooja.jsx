import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../../../components/CustomModal";
import AddPooja from "./AddPooja";

const Pooja = () => {
  const [poojas, setPoojas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(false);

  const fetchPoojas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/poojas");
      setPoojas(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError("Failed to fetch poojas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (status) => {
    setFilter(status);
    if (status === "all") {
      setFiltered(poojas);
    } else {
      setFiltered(poojas.filter((p) => p.status.toLowerCase() === status));
    }
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  if (loading) return <div className="py-4 text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <div className="">
      <CustomModal open={visible} handleClose={handleClose} title="Add pooja">
        <AddPooja />
      </CustomModal>

      {/* Header Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Poojas</h2>
        <button
          className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
          onClick={() => setVisible(true)}
        >
          Add Pooja
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex gap-3">
        {["all", "active", "completed", "inactive"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`rounded px-3 py-1 text-sm font-medium capitalize transition ${
              filter === status
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Pooja Cards */}
      {filtered.length === 0 ? (
        <p>No poojas available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((pooja) => (
            <div
              key={pooja.id}
              className="rounded-xl border p-4 shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{pooja.poojaName}</h3>
              <p className="line-clamp-2 text-sm text-gray-600">
                {pooja.description}
              </p>
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p>
                  <strong>Date:</strong> {pooja.poojaDate}
                </p>
                <p>
                  <strong>Time:</strong> {pooja.poojaTime}
                </p>
                <p>
                  <strong>Duration:</strong> {pooja.duration}
                </p>
                <p>
                  <strong>Price:</strong> ₹{pooja.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{pooja.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pooja;
