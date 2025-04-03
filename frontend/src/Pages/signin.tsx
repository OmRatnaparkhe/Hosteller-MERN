import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { Button } from "../components/Button";

export function Signin() {
    const emailRef = useRef<HTMLInputElement>();
    const passRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signin() {
        const email = emailRef.current?.value;
        const password = passRef.current?.value;
        const response = await axios.post("http://localhost:3000/signin", {
            email,
            password
        } ,{ headers:{
            "Authorization":localStorage.getItem("token")
        }});
        const UserType = response.data.existingUser;
        console.log(UserType)
        alert("You've Signed in!");
        if (UserType.type === "Student") navigate("/studentDashboard");
        if (UserType.type === "Landlord") navigate("/llhome");
    }
    return (
        <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
            <div className="bg-gray-800 w-[80%] h-[85%] flex flex-col md:flex-row rounded-lg">
                <div className="w-full md:w-[50%] h-full hidden md:flex justify-center items-center">
                    <div className="w-[95%] flex justify-center h-[95%] rounded-lg">
                        <img className="rounded-lg" src="https://images.unsplash.com/vector-1739128047893-62bcb49a5808?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </div>
                </div>
                <div className="w-full md:w-[50%] h-full flex justify-center items-center">
                    <div className="w-[75%] flex flex-col justify-center h-[95%] rounded-lg mt-4">
                        <h1 className="font-bold text-3xl text-white text-center">Sign in to your Account</h1>

                        <div className="mt-6">
                            <Input reference={emailRef} type="text" placeholder="Email" />
                        </div>
                        <div className="mt-4">
                            <Input reference={passRef} type="password" placeholder="Enter your Password" />
                        </div>

                        <label htmlFor="checkbox" className="text-white flex gap-2 mt-4 text-sm ">
                            <input id="checkbox" type="checkbox" />
                            <span className="flex gap-1">I agree to <span className="text-purple-600 underline">terms and conditions</span></span>
                        </label>
                        <div className="w-full mt-5">
                            <Button variant="primary" onClick={signin} text={"Log In"}></Button>
                        </div>

                        {/* <div className="flex items-center gap-4 mt-4">
                            <div className="h-px flex-1 bg-gray-400"></div>
                            <span className="text-gray-400">Or Log in with</span>
                            <div className="h-px flex-1 bg-gray-400"></div>
                        </div>
                        <div className="px-2 border-gray-400 border flex justify-center w-[50%] mx-auto mt-4">
                            <div className="flex justify-center items-center gap-1">
                                <img className="w-4 h-4" src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="" />
                                <span className="font-semibold text-1xl text-white p-2">Google</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
