import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { BACKEND_URL } from "../BackendUrl";
import axios from "axios";
interface UserProfileProps {
    onClose:()=>void;
    open:boolean
}
export default function UserProfile({ onClose, open }:UserProfileProps) {
  const [user, setUser] = useState(null);
  async function fetchUserData() {
    try {
      const response = await axios.get(`${BACKEND_URL}/getUserInfo`, {
        headers: { "Authorization": localStorage.getItem("token") },
      });
  
      if (response.data.userInfo) {
        setUser(response.data.userInfo); 
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  
    useEffect(()=>{
      fetchUserData();
    },[])
    


  if (!user) return <div className="text-center text-gray-500">Loading...</div>;

  return <div>
    {open && <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold text-center mb-4">User Profile</h2>
        <div className="space-y-3">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobileNo}</p>
          <p><strong>College:</strong> {user.college}</p>
          <p><strong>Role:</strong> {user.type}</p>
        </div>
        <div className="mt-4 text-center">
          <Button variant="secondary" text="Close" onClick={onClose} />
        </div>
      </div>
    </div>

  }

</div>
 
}
