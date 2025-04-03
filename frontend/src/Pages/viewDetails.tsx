import { useState } from "react";
import { BACKEND_URL } from "../BackendUrl";
import { CloseLogo } from "../Icons/close";
import { LeftSide } from "../Icons/LeftSide";
import { RightSide } from "../Icons/RightSide";

interface DetailsProps {
    rent: string;
    contact: string;
    members: string;
    address: string;
    city: string;
    imageFilenames: string[];
    onClose: () => void;
}

export function ViewDetails({ rent, contact, members, address, city, imageFilenames, onClose }: DetailsProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageFilenames.length);
    };


    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageFilenames.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[70%] h-[85%] flex">
                
                <div className="w-[50%] h-full flex flex-col justify-center items-center relative">
                    <img
                        src={`${BACKEND_URL}/images/${imageFilenames[currentImageIndex]}`}
                        alt="Room"
                        className="w-full h-[80%] object-cover rounded-lg shadow-md"
                    />

                    {/* Previous & Next Buttons */}
                    <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                        <LeftSide/>
                    </button>
                    <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
                        <RightSide/>
                    </button>
                </div>

                {/* Right Side: Room Details */}
                <div className="w-[50%] h-full p-6 border-l flex flex-col justify-center gap-6 font-semibold text-lg">
                    <div className="flex justify-end">
                        <button onClick={onClose}>
                            <CloseLogo />
                        </button>
                    </div>
                    <div>
                        <h3>Address :</h3>
                        <p className="text-gray-500">{address}</p>
                    </div>
                    <div>
                        <h3>Monthly Rent :</h3>
                        <p className="text-gray-500">{rent}</p>
                    </div>
                    <div>
                        <h3>Maximum members allowed :</h3>
                        <p className="text-gray-500">{members}</p>
                    </div>
                    <div>
                        <h3>City :</h3>
                        <p className="text-gray-500">{city}</p>
                    </div>
                    <div>
                        <h3>Contact :</h3>
                        <p className="text-gray-500">{contact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
