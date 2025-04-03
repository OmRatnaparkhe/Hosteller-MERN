import {  useRef, useState } from "react";
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { FiHome, FiBookmark, FiUser, FiLogOut } from "react-icons/fi";
import { SidebarItems } from "../components/SidebarItems";
import { BACKEND_URL } from "../BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfilePage";
import { ViewDetails } from "./viewDetails";

interface Room {
  _id: string;
  address: string;
  rent: string;
  members: string;
  contact: string;
  city: string;
  imageFilenames: string[];
}

export default function StudentDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modal, setModal] = useState(false);
  const cityRef = useRef<HTMLInputElement>(null);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  async function handleSearch() {
    try {
      const cityValue = cityRef.current?.value;
      if (!cityValue) {
        console.log("Please enter a city name");
        return;
      }
      const response = await axios.get(`${BACKEND_URL}/roomsinfo`, {
        params: { city: cityValue },
      } , );
      setRooms(response.data.rooms || []);
      setCity(cityValue);
    } catch (error) {
      console.error("No rooms available");
      setRooms([]);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-[20%] bg-white shadow-lg flex md:flex-col justify-around md:justify-start items-center p-2 md:p-6 fixed bottom-0 md:static md:h-full">
        {/* Logo - Only on Desktop */}
        <div className="hidden md:flex w-auto mx-auto rounded-full p-3 items-center justify-center bg-black">
          <span className="text-2xl font-bold text-white">Hosteller</span>
        </div>

        <nav className="flex flex-col space-x-4 md:space-x-0 md:space-y-8  mt-5 w-full justify-center">
          <div className="hidden md:flex flex-col gap-4">
            <SidebarItems
              onClick={() => {
                setRooms([]);
                setCity("");
              }}
              logo={<FiHome />}
              text="Home"
            />
            <SidebarItems logo={<FiBookmark />} text="Bookmarks" />
            <SidebarItems logo={<FiUser />} onClick={() => setModal(true)} text="Profile" />
          </div>

          {/* Mobile Icons Only */}
          <div className="flex md:hidden gap-2 justify-center">
            <SidebarItems logo={<FiHome />} text="" />
            <SidebarItems logo={<FiBookmark />} text="" />
            <SidebarItems logo={<FiUser />} onClick={() => setModal(true)} text="" />
            <SidebarItems logo={<FiLogOut />} onClick={() => navigate("/signin")} text="" />
          </div>
        </nav>

        {/* Sign Out Button - At Bottom on Desktop */}
        <div className="hidden md:flex mt-auto">
          <Button variant="third" text={"Sign out"} onClick={() => navigate("/signin")} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <UserProfile open={modal} onClose={() => setModal(false)} />

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-end space-y-2 md:space-y-0 md:space-x-4 mb-6 w-full max-w-lg mx-auto">
          <Input
            type="text"
            placeholder="Search by City"
            reference={cityRef}
            value={city}
            onChange={(e: string) => setCity(e.target.value)}
          />
          <Button variant="search" text="Search" onClick={handleSearch} />
        </div>

        {/* Room Listings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {rooms.length > 0 ? (
            rooms.map((room) => <RoomCard key={room._id} room={room} />)
          ) : (
            <p className="col-span-3 text-center text-gray-500">No rooms available</p>
          )}
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room }: { room: Room }) {
  const [details, setDetails] = useState(false);
  return (
    <div className="bg-white p-4 shadow rounded-lg">
        <img
          src={`${BACKEND_URL}/images/${room.imageFilenames[0]}`}
          alt="Room"
          className="w-full h-40 object-cover rounded"
          onError={() => console.log("Image failed:", room.imageFilenames[0])}
        />
      <h3 className="font-semibold mt-2">Address: {room.address}</h3>
      <p className="text-black font-semibold">Rent: ₹{room.rent}</p>
      <p className="text-black font-semibold">Members Allowed: {room.members}</p>
      <p className="text-black font-semibold">City: {room.city}</p>
      <p className="text-black font-semibold">Contact: {room.contact}</p>
      <div className="mt-3">
        <Button onClick={() => setDetails(true)} variant="secondary" text="View Details" />
      </div>
      {details && (
        <div className="flex justify-center items-center">
          <ViewDetails
            onClose={() => {
              setDetails(false);
            }}
            imageFilenames={room.imageFilenames}
            rent={room.rent}
            contact={room.contact}
            city={room.city}
            members={room.members}
            address={room.address}
          />
        </div>)}
    </div>
  );
}