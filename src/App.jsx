import { useState } from "react";
import logo from "./assets/logo.png";

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);

  const [name, setName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [payment, setPayment] = useState("");

  const [tourDate, setTourDate] = useState("");
  const [people, setPeople] = useState(1);

  const rooms = [
    { name: "Single Room", price: 380000, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" },
    { name: "Double Room", price: 540000, image: "https://images.unsplash.com/photo-1551776235-dde6d482980b" },
    { name: "Family House", price: 960000, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b" },
  ];

  const tours = [
    { name: "Pulau Kiluan", price: 850000, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
    { name: "Way Kambas", price: 600000, image: "https://images.unsplash.com/photo-1552410260-0fd9b577afa6" },
    { name: "Kebun Kopi", price: 600000, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" },
  ];

  const calculateHotelTotal = () => {
    if (!checkIn || !checkOut || !selectedRoom) return 0;
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const room = rooms.find((r) => r.name === selectedRoom);
    return days > 0 ? days * room.price : 0;
  };

  const calculateTourTotal = () => {
    if (!selectedTour) return 0;
    const tour = tours.find((t) => t.name === selectedTour);
    return tour ? tour.price * people : 0;
  };

  const totalAll = calculateHotelTotal() + calculateTourTotal();

  const handleCheckout = () => {
    if (!name || !payment) {
      alert("Lengkapi data!");
      return;
    }

    window.open(
      `https://wa.me/62818160685?text=DETAIL PESANAN%0A` +
      `Nama: ${name}%0A` +
      `Kamar: ${selectedRoom || "-"}%0A` +
      `Check-in: ${checkIn || "-"}%0A` +
      `Check-out: ${checkOut || "-"}%0A` +
      `Wisata: ${selectedTour || "-"}%0A` +
      `Tanggal Wisata: ${tourDate || "-"}%0A` +
      `Jumlah Orang: ${people}%0A` +
      `Metode Bayar: ${payment}%0A` +
      `TOTAL: Rp${totalAll.toLocaleString()}`
    );
  };

  return (
    <div className="bg-[#2e7d5b] text-white min-h-screen p-6">

      {/* HEADER */}
      <div className="text-center mb-10">
        
        <div className="flex justify-center items-center gap-0">
          <img src={logo} alt="logo" className="w-32 h-32 object-contain" />
          <h1 className="text-6xl font-bold">Rumahku</h1>
        </div>

        {/* TAGLINE SUPER NEMPEL */}
        <p
          className="text-2xl leading-none -mt-5"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Senyaman Rumah Sendiri
        </p>

      </div>

      {/* ROOMS */}
      <h2 className="text-2xl text-center mb-4">Our Rooms</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.name} className="bg-yellow-400 text-black p-4 rounded">
            <img src={room.image} className="h-40 w-full object-cover" />
            <h3>{room.name}</h3>
            <p>Rp{room.price.toLocaleString()}</p>
            <button
              onClick={() => setSelectedRoom(room.name)}
              className="bg-green-700 text-white w-full mt-2 p-2"
            >
              Pilih
            </button>
          </div>
        ))}
      </div>

      {/* FORM HOTEL */}
      {selectedRoom && (
        <div className="bg-yellow-300 text-black p-4 mt-6 rounded">
          <h3>Booking: {selectedRoom}</h3>
          <input placeholder="Nama" onChange={(e)=>setName(e.target.value)} className="w-full p-2 mb-2"/>
          <input type="date" onChange={(e)=>setCheckIn(e.target.value)} className="w-full p-2 mb-2"/>
          <input type="date" onChange={(e)=>setCheckOut(e.target.value)} className="w-full p-2 mb-2"/>
        </div>
      )}

      {/* WISATA */}
      <h2 className="text-2xl text-center mt-10 mb-4">Paket Wisata</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.name} className="bg-yellow-400 text-black p-4 rounded">
            <img src={tour.image} className="h-40 w-full object-cover" />
            <h3>{tour.name}</h3>
            <p>Rp{tour.price.toLocaleString()}</p>
            <button
              onClick={() => setSelectedTour(tour.name)}
              className="bg-green-700 text-white w-full mt-2 p-2"
            >
              Pilih
            </button>
          </div>
        ))}
      </div>

      {/* FORM WISATA */}
      {selectedTour && (
        <div className="bg-yellow-300 text-black p-4 mt-6 rounded">
          <h3>Booking: {selectedTour}</h3>
          <input type="date" onChange={(e)=>setTourDate(e.target.value)} className="w-full p-2 mb-2"/>
          <input type="number" value={people} onChange={(e)=>setPeople(e.target.value)} className="w-full p-2 mb-2"/>
        </div>
      )}

      {/* CART */}
      <div className="bg-white text-black p-6 mt-10 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Keranjang Pesanan</h2>

        <p><b>Nama:</b> {name || "-"}</p>

        <hr className="my-2"/>

        <p><b>Kamar:</b> {selectedRoom || "-"}</p>
        <p><b>Check-in:</b> {checkIn || "-"}</p>
        <p><b>Check-out:</b> {checkOut || "-"}</p>
        <p><b>Total Hotel:</b> Rp{calculateHotelTotal().toLocaleString()}</p>

        <hr className="my-2"/>

        <p><b>Wisata:</b> {selectedTour || "-"}</p>
        <p><b>Tanggal:</b> {tourDate || "-"}</p>
        <p><b>Orang:</b> {people}</p>
        <p><b>Total Wisata:</b> Rp{calculateTourTotal().toLocaleString()}</p>

        <hr className="my-2"/>

        <select
          value={payment}
          onChange={(e)=>setPayment(e.target.value)}
          className="w-full p-2 mb-3"
        >
          <option value="">Pilih Pembayaran</option>
          <option>Transfer Bank</option>
          <option>Credit Card</option>
          <option>Bayar di Tempat</option>
        </select>

        <h3 className="text-lg font-bold">
          TOTAL: Rp{totalAll.toLocaleString()}
        </h3>

        <button
          onClick={handleCheckout}
          className="bg-green-700 text-white w-full mt-3 p-3 rounded"
        >
          Checkout Sekarang
        </button>
      </div>

    </div>
  );
}