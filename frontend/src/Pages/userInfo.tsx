import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../BackendUrl";
import { Input } from "../components/input";
import { Button } from "../components/Button";

export function UserInfo() {
    const usernameRef = useRef<HTMLInputElement>();
    const mobileNoRef = useRef<HTMLInputElement>();
    const collegeRef = useRef<HTMLInputElement>();
    const cityRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const [type, setType] = useState("");
    const navigate = useNavigate();

    async function userinfo() {
        const username = usernameRef.current?.value;
        const mobileNo = mobileNoRef.current?.value;
        const college = collegeRef.current?.value;
        const city = cityRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(
            BACKEND_URL + "/userInfo",
            { username, mobileNo, college, city, email, type,password }
        );
        const jwt = response.data.token;
        console.log(jwt)
        localStorage.setItem("token",jwt);
        alert("Data Saved");
        if (type === "Student") navigate("/studentDashboard");
        if (type === "Landlord") navigate("/llhome");
    }

    return (
        <div className="w-screen bg-gray-900 h-screen flex justify-center items-center">
            <div className="w-[90%] md:w-[80%] h-[85%] bg-gray-800 flex flex-col md:flex-row rounded-lg">
                {/* Left Side - Form */}
                <div className="w-full md:w-[50%] h-full flex justify-center items-center">
                    <div className="w-[90%] md:w-[75%] flex flex-col justify-center h-[95%] rounded-lg">
                        <h1 className="font-bold text-3xl text-white text-center">
                            Create your Profile
                        </h1>

                        <div className="mt-4">
                            <Input reference={usernameRef} type="text" placeholder="Full Name" />
                        </div>
                        <div className="mt-4">
                            <Input reference={mobileNoRef} type="text" placeholder="Enter your Mobile No" />
                        </div>
                        <div className="mt-4">
                            <Input reference={collegeRef} type="text" placeholder="Enter your College Name" />
                        </div>
                        <div className="mt-4">
                            <Input reference={cityRef} type="text" placeholder="Enter your City" />
                        </div>
                        <div className="mt-4">
                            <Input reference={emailRef} type="text" placeholder="Enter your registered Email" />
                        </div>
                        <div className="mt-4">
                            <Input reference={passwordRef} type="text" placeholder="Enter your registered Password" />
                        </div>

                        {/* Student & Landlord Buttons */}
                        <div className="mt-4 flex justify-center items-center gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => setType("Student")}
                                text="Student"
                            />
                            <span className="text-gray-300 font-semibold">Or</span>
                            <Button
                                variant="secondary"
                                onClick={() => setType("Landlord")}
                                text="Landlord"
                            />
                        </div>

                        {/* Create Profile Button */}
                        <div className="w-full mt-3 mb-2">
                            <Button variant="signup" onClick={userinfo} text="Create Profile" />
                        </div>
                    </div>
                </div>

                {/* Right Side - Image (Hidden on Mobile) */}
                <div className="hidden md:flex w-[50%] h-full justify-center items-center">
                    <div className="w-[95%] flex justify-center h-[95%] rounded-lg">
                        <img
                            className="rounded-lg"
                            src="https://images.unsplash.com/vector-1739026151915-77b3ac4bb153?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
