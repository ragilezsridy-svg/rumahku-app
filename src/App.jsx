import { useState } from "react";

export default function App() {
  // HOTEL STATE
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [payment, setPayment] = useState("");

  // TOUR STATE
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourDate, setTourDate] = useState("");
  const [people, setPeople] = useState(1);

  // DATA HOTEL
  const rooms = [
    {
      name: "Deluxe Room",
      price: 300000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
    {
      name: "Executive Room",
      price: 500000,
      image: "https://images.unsplash.com/photo-1551776235-dde6d482980b",
    },
    {
      name: "Suite Room",
      price: 900000,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
  ];

  // DATA WISATA
  const tours = [
    {
      name: "Pulau Kiluan",
      price: 850000,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      name: "Way Kambas",
      price: 600000,
      image: "https://images.unsplash.com/photo-1552410260-0fd9b577afa6",
    },
    {
      name: "Kebun Kopi",
      price: 600000,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
  ];

  // HITUNG HOTEL
  const calculateTotal = () => {
    if (!checkIn || !checkOut || !selectedRoom)
      return { total: 0, days: 0 };

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const room = rooms.find((r) => r.name === selectedRoom);
    if (!room || days <= 0) return { total: 0, days: 0 };

    return {
      total: days * room.price,
      days,
    };
  };

  // HITUNG WISATA
  const calculateTourTotal = () => {
    if (!selectedTour) return 0;
    const tour = tours.find((t) => t.name === selectedTour);
    return tour ? tour.price * people : 0;
  };

  // BOOKING HOTEL
  const handleBooking = () => {
    if (!name || !checkIn || !checkOut || !payment) {
      alert("Isi semua data!");
      return;
    }

    const { total, days } = calculateTotal();

    if (days <= 0) {
      alert("Tanggal tidak valid!");
      return;
    }

    window.open(
      `https://wa.me/62818160685?text=Booking Hotel%0A` +
        `Kamar: ${selectedRoom}%0A` +
        `Nama: ${name}%0A` +
        `Check-in: ${checkIn}%0A` +
        `Check-out: ${checkOut}%0A` +
        `Durasi: ${days} malam%0A` +
        `Pembayaran: ${payment}%0A` +
        `Total: Rp${total.toLocaleString()}`,
      "_blank"
    );
  };

  // BOOKING WISATA
  const handleTourBooking = () => {
    if (!tourDate || !people) {
      alert("Isi semua data wisata!");
      return;
    }

    const total = calculateTourTotal();

    window.open(
      `https://wa.me/62818160685?text=Booking Wisata%0A` +
        `Wisata: ${selectedTour}%0A` +
        `Tanggal: ${tourDate}%0A` +
        `Jumlah: ${people} orang%0A` +
        `Total: Rp${total.toLocaleString()}`,
      "_blank"
    );
  };

  return (
    <div className="font-sans">

      {/* HERO */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1501117716987-c8e1ecb2100d)",
        }}
      >
        <div className="text-center bg-black bg-opacity-50 p-6 rounded">
          <h1 className="text-4xl font-bold">Rumahku</h1>
          <p>Senyaman Rumah Sendiri</p>
        </div>
      </section>

      {/* ROOMS */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">Our Rooms</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.name} className="bg-white shadow rounded overflow-hidden">
              <img src={room.image} className="w-full h-48 object-cover" />

              <div className="p-4">
                <h3 className="text-lg font-semibold">{room.name}</h3>
                <p>Rp{room.price.toLocaleString()} / malam</p>

                <button
                  onClick={() => setSelectedRoom(room.name)}
                  className="mt-2 bg-blue-600 text-white w-full py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WISATA */}
      <section className="p-10 bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Paket Wisata</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour.name} className="bg-gray-100 shadow rounded overflow-hidden">
              <img src={tour.image} className="w-full h-40 object-cover" />

              <div className="p-4">
                <h3>{tour.name}</h3>
                <p>Rp{tour.price.toLocaleString()} / orang</p>

                <button
                  onClick={() => setSelectedTour(tour.name)}
                  className="mt-2 bg-green-600 text-white w-full py-2 rounded"
                >
                  Pilih Wisata
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL HOTEL */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h2>{selectedRoom}</h2>

            <input placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 mb-2" />

            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border p-2 mb-2" />
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border p-2 mb-2" />

            <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full border p-2 mb-2">
              <option value="">Metode Pembayaran</option>
              <option>Transfer Bank</option>
              <option>DANA</option>
              <option>OVO</option>
              <option>GoPay</option>
            </select>

            <p>Total: Rp{calculateTotal().total.toLocaleString()}</p>

            <button onClick={handleBooking} className="bg-blue-600 text-white w-full p-2 rounded">Pesan</button>
            <button onClick={() => setSelectedRoom(null)} className="mt-2 w-full">Batal</button>
          </div>
        </div>
      )}

      {/* MODAL WISATA */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-80">
            <h2>{selectedTour}</h2>

            <input type="date" value={tourDate} onChange={(e) => setTourDate(e.target.value)} className="w-full border p-2 mb-2" />

            <input type="number" min="1" value={people} onChange={(e) => setPeople(e.target.value)} className="w-full border p-2 mb-2" />

            <p>Total: Rp{calculateTourTotal().toLocaleString()}</p>

            <button onClick={handleTourBooking} className="bg-green-600 text-white w-full p-2 rounded">Pesan Wisata</button>
            <button onClick={() => setSelectedTour(null)} className="mt-2 w-full">Batal</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-white text-center p-4">
        <p>© 2026 Rumahku</p>
      </footer>
    </div>
  );
}