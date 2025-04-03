import { useRef, useState } from "react";
import { Input } from "./input";
import axios from "axios";
import { Button } from "./Button";
import { CloseLogo } from "../Icons/close";
interface RoomProps {
    modal: boolean;
    onClose: () => {};
}
export function AddRoom({ modal, onClose }: RoomProps) {
    const addressRef = useRef<HTMLTextAreaElement>(null);
    const rentRef = useRef<HTMLInputElement>(null);
    const membersRef = useRef<HTMLInputElement>(null);
    const contactRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files || null;
        if(files){
            setSelectedImages(Array.from(files));
        }
        
    };
    async function addroom() {
        const address = addressRef.current?.value;
        const rent = rentRef.current?.value;
        const members = membersRef.current?.value;
        const contact = contactRef.current?.value;
        const city = cityRef.current?.value;

        if (!address || !rent || !members || !contact || !selectedImages || !city) {
            alert("Please fill all the fields and upload an image");
            return;
        }
        const formData = new FormData();
        formData.append("address", address);
        formData.append("rent", rent);
        formData.append("members", members);
        formData.append("contact", contact);
        formData.append("city", city);
        selectedImages.forEach((image)=>{
            formData.append("images", image);
        })
        

        try {
            await axios.post("http://localhost:3000/rooms", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": localStorage.getItem("token")
                }
            });
            alert("Room Added Successfully");
            onClose();
        } catch (error) {
            console.error("Error occurred while uploading Room:", error);
            alert("Error occurred while uploading Room. Check console for details.");
        }
    }
    return (modal && <div className="w-screen h-screen top-0 left-0 fixed bg-slate-400/50  flex justify-center items-center">
        <div className="flex flex-col gap-3 bg-white p-8 rounded-lg">
            <div onClick={onClose} className="flex relative w-full h-full ">
                <div className="font-bold text-xl w-full flex justify-center">
                    Add Room Details
                </div>
                <div className="position  top-0 right-0 absolute">
                <CloseLogo />
                </div>
               
            </div>

            <textarea ref={addressRef} className="bg-gray-600 rounded-lg p-2" placeholder={"Address"} />
            <Input reference={rentRef} placeholder={"Rent"} type="text" />
            <Input reference={membersRef} placeholder={"Max members"} type="text" />
            <Input reference={contactRef} placeholder={"Contact"} type="text" />
            <Input reference={cityRef} placeholder={"City"} type="text" />
            <input onChange={handleFileChange} placeholder={"Add images"} type="file" multiple />
            <Button variant="secondary" text={"Add"} onClick={addroom} />
        </div>

    </div>
    )

}