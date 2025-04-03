import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../BackendUrl";
import { Input } from "../components/input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS file

export function Signup() {
    const emailRef = useRef<HTMLInputElement>();
    const passRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const email = emailRef.current?.value;
        const password = passRef.current?.value;

        await axios.post("http://localhost:3000/signup", {
            email,
            password
        });

        alert("You've Signed Up!");
        navigate("/userInfo");
    }

    return (
        <div className="parent">
            <div className="mother">
                <div className="child1">
                    <div>
                        <img src="https://images.unsplash.com/vector-1739128047893-62bcb49a5808?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Signup" />
                    </div>
                </div>
                <div className="child2">
                    <div className="child2-content">
                        <h1 className="title">Create an Account</h1>
                        <h2 className="subtitle">
                            Already have an account? <Link to="/signin">Log In</Link>
                        </h2>
                        <div className="input-container">
                            <Input reference={emailRef} type="text" placeholder="Email" />
                        </div>
                        <div className="input-container">
                            <Input reference={passRef} type="password" placeholder="Enter your Password" />
                        </div>
                        <label htmlFor="checkbox" className="checkbox-container">
                            <input id="checkbox" type="checkbox" />
                            <h3>I agree to <Link to="#" className="terms-link">terms and conditions</Link></h3>
                        </label>
                        <div className="button-container">
                            <Button variant="primary" onClick={signup} text="Create account" />
                        </div>
                        <div className="divider">
                            <div className="divider-line"></div>
                            <span>Or register with</span>
                            <div className="divider-line"></div>
                        </div>
                        <div className="google-button">
                            <img className="icon" src="https://cdn-icons-png.flaticon.com/128/281/281764.png" alt="Google" />
                            <span>Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
