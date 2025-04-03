import { FiPlusCircle, FiList, FiBarChart2, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddRoom } from "../components/AddRoomModal";
import { DeleteIcon } from "../Icons/delete";
import { Button } from "../components/Button";
import { HomeLogo } from "../Icons/home";
import { PropertyLogo } from "../Icons/Property";
import UserProfile from "./UserProfilePage";
import { UserProfileLogo } from "../Icons/UserProfile";
import { ViewDetails } from "./viewDetails";

interface Room {
    _id: string;
    address: string;
    rent: string;
    members: string;
    contact: string;
    city: string;
    imageFilenames: [string];
    setDetails: boolean;
}

export function LLHome() {
    const [roomsCount, setRoomsCount] = useState(0);
    const [rentedCount, setRentedCount] = useState(0);
    const [details, setDetails] = useState(false);
    const [modal, setModal] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [type, setType] = useState("Home");
    const navigate = useNavigate();

    async function fetchStats() {
        try {
            const response = await axios.get(`${BACKEND_URL}/llroomsinfo`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            const rooms = response.data.rooms || [];
            setRoomsCount(rooms.length);
            setRentedCount(rooms.filter((room) => room.isRented).length);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    }

    async function getRooms() {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/llroomsinfo`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setRooms(response.data.rooms || []);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    }

    async function DeleteCard(id: string) {
        try {
            await axios.delete(`${BACKEND_URL}/deleteproperty/${id}`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            console.log("Room deleted successfully");
            setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
        } catch (error) {
            console.error("Error while deleting Room", error);
        }
    }

    async function fetchUserData() {
        try {
            const response = await axios.get(`${BACKEND_URL}/getUserInfo`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setUser(response.data.userInfo);
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    useEffect(() => {
        fetchUserData();
        getRooms();
        fetchStats();
    }, []);

    if (!user) return <div className="text-center text-gray-500">Loading...</div>;
    const name = user.username;

    return (
        <div className="min-h-screen bg-gray-100   ">
            {/* Sidebar */}
            <div className="flex ">
            <div className="h-screen overflow-hidden bg-white shadow-lg p-6 hidden md:flex flex-col ">
                <div className="flex flex-col border border-gray-300 p-5 items-center justify-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-2xl font-bold rounded-full shadow-lg">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="mt-3 text-xl text-center font-semibold">{user.username}</h2>
                    <div className="w-3/4 border-b border-gray-300 mt-2"></div>
                </div>
                <nav className="hidden md:flex flex-col space-y-6">
                    <button
                        onClick={() => {
                            navigate("/llhome");
                            setType("Home");
                        }}
                        className="flex items-center space-x-3 text-gray-600 p-3 hover:bg-gray-200 rounded"
                    >
                        <HomeLogo /> <span className="font-semibold text-lg text-gray-600">Home</span>
                    </button>
                    <button
                        onClick={() => {
                            setType("Myproperties");
                        }}
                        className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded"
                    >
                        <PropertyLogo /> <span className="font-semibold text-lg text-gray-600">My Properties</span>
                    </button>
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded"
                    >
                        <UserProfileLogo /> <span className="font-semibold text-lg text-gray-600">My Profile</span>
                    </button>
                </nav>
                
                <div className="mt-auto"> 
                    <Button
                        variant="third"
                        text={"Sign out"}
                        onClick={() => {
                            navigate("/signin");
                        }}
                    />
                </div>
            </div>
           
            {type === "Home" ? (
                <div className="flex-1 p-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h1 className="text-3xl font-semibold">Welcome, Landlord!</h1>
                        <p className="text-gray-600">Manage your properties efficiently and keep track of rentals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <FiList className="text-blue-500 text-3xl mx-auto mb-2" />
                            <h2 className="text-2xl font-semibold">{roomsCount}</h2>
                            <p className="text-gray-600">Total Properties Listed</p>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <FiBarChart2 className="text-green-500 text-3xl mx-auto mb-2" />
                            <h2 className="text-2xl font-semibold">{rentedCount}</h2>
                            <p className="text-gray-600">Properties Rented</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
                            onClick={() => {
                                console.log("Navigate to Add Property")
                                setModal(true);
                            }}
                        >
                            <FiPlusCircle className="mr-2" /> Add Property
                        </button>
                        <button
                            className="flex items-center bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-600"
                            onClick={() => {
                                console.log("Navigate to My Properties")
                            setType("Myproperties")}}
                        >
                            <FiList className="mr-2" /> View Properties
                        </button>
                        <AddRoom
                        modal={modal}
                        onClose={() => {
                            setModal(false);
                            getRooms();
                        }}/>
                    </div>
                    {open && (
                        <UserProfile
                            open={open}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />
                    )}
                </div>
            ) : (
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold">My Properties</h1>
                        <button
                            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600"
                            onClick={() => setModal(true)}
                        >
                            <FiPlusCircle className="mr-2" /> Add Property
                        </button>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading rooms...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {rooms.length > 0 ? (
                                rooms.map((property) => (
                                    <RoomCard
                                        key={property._id}
                                        details={details}
                                        setDetails={setDetails}
                                        property={property}
                                        DeleteCard={DeleteCard}
                                    />
                                ))
                            ) : (
                                <p className="col-span-3 text-center text-gray-500">No property added</p>
                            )}
                        </div>
                    )}
                    {open && (
                        <UserProfile
                            open={open}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />
                    )}
                    <AddRoom
                        modal={modal}
                        onClose={() => {
                            setModal(false);
                            getRooms();
                        }}
                    />
                    
                </div>
                
            )}
            </div>
            <div className="w-screen overflow-hidden bg-white shadow-lg p-3 flex md:flex-col md:hidden">
            <nav className="flex md:flex-col gap-8 justify-center ml-4">
                    <button
                        onClick={() => {
                            navigate("/llhome");
                            setType("Home");
                        }}
                        className="flex items-center space-x-3 text-gray-600 p-3 hover:bg-gray-200 rounded"
                    >
                        <HomeLogo /> <span className="font-semibold text-lg text-gray-600"></span>
                    </button>
                    <button
                        onClick={() => {
                            setType("Myproperties");
                        }}
                        className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded"
                    >
                        <PropertyLogo /> <span className="font-semibold text-lg text-gray-600"></span>
                    </button>
                    <button
                        onClick={() => {
                            setOpen(true);
                        }}
                        className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded"
                    >
                        <UserProfileLogo /> <span className="font-semibold text-lg text-gray-600"></span>
                    </button>
                    <div className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-200 rounded">
                    <button  onClick={() => navigate("/signin")}  ><FiLogOut /></button>
                    </div>
                    
                </nav>
               
            </div>
        </div>
    );
}

function RoomCard({ property, DeleteCard }: { property: Room; DeleteCard: (id: string) => void }) {
    const [details, setDetails] = useState(false);
    return (
        <div className="bg-white p-4 shadow rounded-lg mb-4">
            <div className="flex justify-end mb-2 cursor-pointer" onClick={() => DeleteCard(property._id)}>
                <DeleteIcon />
            </div>

            <img
                src={`${BACKEND_URL}/images/${property.imageFilenames[0]}`}
                alt="Room"
                className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold mt-2">Address: {property.address}</h3>
            <p className="text-black font-semibold">Rent: ₹{property.rent}</p>
            <p className="text-black font-semibold">Members Allowed: {property.members}</p>
            <p className="text-black font-semibold">City: {property.city}</p>
            <p className="text-black font-semibold">Contact: {property.contact}</p>

            <div className="mt-3">
                <Button onClick={() => setDetails(true)} variant="secondary" text="View Details" />
            </div>
            {details && (
                <div className="flex justify-center items-center">
                    <ViewDetails
                        onClose={() => {
                            setDetails(false);
                        }}
                        imageFilenames={property.imageFilenames}
                        rent={property.rent}
                        contact={property.contact}
                        city={property.city}
                        members={property.members}
                        address={property.address}
                    />
                </div>
            )}
        </div>
    );
}