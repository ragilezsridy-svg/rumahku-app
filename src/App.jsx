import { useState, useEffect } from "react";

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Data kamar + gambar
  const rooms = [
    {
      name: "Single Room",
      price: "Rp300.000",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      name: "Double Room",
      price: "Rp480.000",
      image: "https://images.unsplash.com/photo-1551776235-dde6d482980b",
    },
    {
      name: "Family Room",
      price: "Rp780.000",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
  ];

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleBooking = () => {
    if (!name || !date) {
      alert("Isi semua data!");
      return;
    }

    const newBooking = {
      room: selectedRoom,
      name,
      date,
    };

    if (editIndex !== null) {
      const updated = [...bookings];
      updated[editIndex] = newBooking;
      setBookings(updated);
    } else {
      setBookings([...bookings, newBooking]);
    }

    setSelectedRoom(null);
    setName("");
    setDate("");
    setEditIndex(null);
  };

  const deleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
  };

  const startEdit = (booking, index) => {
    setSelectedRoom(booking.room);
    setName(booking.name);
    setDate(booking.date);
    setEditIndex(index);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">

      {/* Header */}
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Rumahku</h1>
        <p className="text-sm">senyaman rumah sendiri</p>
      </header>

      {/* Room List */}
      <section className="p-6 grid gap-6 md:grid-cols-3">
        {rooms.map((room) => (
          <div key={room.name} className="bg-white rounded shadow overflow-hidden">

            <img
              src={room.image}
              alt={room.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-500">{room.price} / malam</p>

              <button
                onClick={() => setSelectedRoom(room.name)}
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded w-full"
              >
                Pesan
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h2 className="font-bold mb-2">{selectedRoom}</h2>

            <input
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-2"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 mb-2"
            />

            <button
              onClick={handleBooking}
              className="bg-blue-600 text-white w-full p-2 rounded"
            >
              {editIndex !== null ? "Update" : "Simpan"}
            </button>

            <button
              onClick={() => {
                setSelectedRoom(null);
                setEditIndex(null);
              }}
              className="mt-2 text-gray-500 w-full"
            >
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Booking List */}
      <section className="p-6">
        <h2 className="text-xl font-bold mb-2">Data Booking</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">Belum ada booking</p>
        ) : (
          <ul className="space-y-2">
            {bookings.map((b, i) => (
              <li
                key={i}
                className="bg-white p-3 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p><b>{b.name}</b> - {b.room}</p>
                  <p className="text-sm text-gray-500">{b.date}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(b, i)}
                    className="text-blue-500 font-bold"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => deleteBooking(i)}
                    className="text-red-500 font-bold"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
}