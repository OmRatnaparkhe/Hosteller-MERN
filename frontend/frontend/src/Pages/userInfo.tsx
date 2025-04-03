import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file

export function UserInfo() {
    const usernameRef = useRef<HTMLInputElement>();
    const mobileNoRef = useRef<HTMLInputElement>();
    const collegeRef = useRef<HTMLInputElement>();
    const cityRef = useRef<HTMLInputElement>();
    const emailRef = useRef<HTMLInputElement>();
    const [type, setType] = useState("");
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const mobileNo = mobileNoRef.current?.value;
        const college = collegeRef.current?.value;
        const city = cityRef.current?.value;
        const email = emailRef.current?.value;

        await axios.post(BACKEND_URL + "/userInfo", {
            username,
            mobileNo,
            college,
            city,
            email,
            type: type
        });

        alert("Data Saved");
    }

    return (
        <div className="parent">
            <div className="mother">
                <div className="child2">
                    <div className="child2-content">
                        <h1 className="title">Create your Profile</h1>
                        <div className="input-container">
                            <Input reference={usernameRef} type="text" placeholder="Full Name" />
                        </div>
                        <div className="input-container">
                            <Input reference={mobileNoRef} type="text" placeholder="Enter your Mobile No" />
                        </div>
                        <div className="input-container">
                            <Input reference={collegeRef} type="text" placeholder="Enter your College Name" />
                        </div>
                        <div className="input-container">
                            <Input reference={cityRef} type="text" placeholder="Enter your City" />
                        </div>
                        <div className="input-container">
                            <Input reference={emailRef} type="text" placeholder="Enter your registered Email" />
                        </div>
                        <div className="button-container">
                            <Button variant="secondary" onClick={() => setType("Student")} text="Student" />
                            <span>Or</span>
                            <Button variant="third" onClick={() => setType("Landlord")} text="Landlord" />
                        </div>
                        <div className="button-container">
                            <Button variant="primary" onClick={signup} text="Create Profile" />
                        </div>
                    </div>
                </div>
                <div className="child1">
                    <div>
                        <img src="https://images.unsplash.com/vector-1739026151915-77b3ac4bb153?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" />
                    </div>
                </div>
            </div>
        </div>
    );
}
