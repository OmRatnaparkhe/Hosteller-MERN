import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const navigate = useNavigate();

  async function signup() {
    const email = emailRef.current?.value;
    const password = passRef.current?.value;
    const name = nameRef.current?.value;

    await axios.post("http://localhost:3000/signup", {
      email,
      password,
      name,
    });

    alert("You've Signed Up!");
    navigate("/userInfo");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/vector-1739128047893-62bcb49a5808?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signup Illustration"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="font-bold text-2xl md:text-3xl text-white text-center">Create an Account</h1>
          <span className="text-gray-300 mt-2 text-sm md:text-lg">
            Already have an account? <Link className="underline" to="/signin">Log In</Link>
          </span>
          <div className="w-full mt-4">
            <div className="mt-3">
            <Input reference={emailRef} type="text" placeholder="Email"  />
            </div>
            <div className="mt-3">
            <Input reference={passRef} type="password" placeholder="Enter your Password"  />
            </div>
           
            
            
            <label className="text-white flex gap-2 mt-4 text-sm">
              <input type="checkbox" /> I agree to <span className="text-purple-600 underline">terms and conditions</span>
            </label>
            <div className=" mt-5 ">
            <Button variant="primary" onClick={signup} text="Create account" />
            </div>
           
          </div>
          {/* <div className="flex items-center gap-4 mt-6 w-full">
            <div className="h-px flex-1 bg-gray-400"></div>
            <span className="text-gray-400">Or register with</span>
            <div className="h-px flex-1 bg-gray-400"></div>
          </div>
          <div className="flex justify-center items-center border border-gray-400 px-4 py-2 mt-4 rounded-lg w-full max-w-xs cursor-pointer">
            <img className="w-5 h-5" src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google Icon" />
            <span className="ml-2 text-white">Google</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}