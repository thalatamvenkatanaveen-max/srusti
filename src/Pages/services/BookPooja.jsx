import { useEffect, useState } from "react";
import axios from "axios";

const BookPooja = () => {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPoojas = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/poojas");
      setPoojas(res.data);
    } catch (err) {
      setError("Failed to fetch poojas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoojas();
  }, []);

  if (loading) return <div className="py-4 text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Available Poojas</h2>

      {poojas.length === 0 ? (
        <p>No poojas available.</p>
      ) : (
        <div className="grid gap-4">
          {poojas.map((pooja) => (
            <div
              key={pooja.id}
              className="rounded-xl border p-4 shadow transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{pooja.poojaName}</h3>
              <p className="text-sm text-gray-600">{pooja.description}</p>
              <div className="mt-2 text-sm">
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
                  <strong>Status:</strong> {pooja.status}
                </p>
              </div>
              <button
                className="mt-4 rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                onClick={() => console.log("Book", pooja.id)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookPooja;
