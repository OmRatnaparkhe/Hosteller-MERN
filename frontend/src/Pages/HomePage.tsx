import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { HomePageLogo } from "../Icons/Logo";
import { useState, useRef } from "react";
import { BACKEND_URL } from "../BackendUrl";
import axios from "axios";
export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const testimonialsRef = useRef(null);
  const homeRef = useRef(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);
  async function SendMessage(){
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const message = messageRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/contactUs`, {
        name,
        email,
        message
      });
  
      console.log("Message Sent!", response.data);
      alert("Message sent successfully!"); 
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  }
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 bg-opacity-80 fixed w-full top-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6">
            <HomePageLogo />
          </div>
          <h1 className="text-lg font-semibold">Hosteller</h1>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg font-semibold">
          <button onClick={() => scrollToSection(homeRef)} className="hover:text-gray-300">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="hover:text-gray-300">About</button>
          <button onClick={() => scrollToSection(testimonialsRef)} className="hover:text-gray-300">Testimonials</button>
          <button onClick={() => scrollToSection(contactRef)} className="hover:text-gray-300">Contact</button>
        </div>
        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <div>
          <Button text="Sign Up" variant="homePage" onClick={() => navigate("/signup")} />
          </div>
          <div>
          <Button text="Sign In" variant="homePage" onClick={() => navigate("/signin")} />
          </div>
         
          
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-800 text-center p-4 absolute w-full top-14 z-10">
          <button onClick={() => scrollToSection(homeRef)} className="py-2">Home</button>
          <button onClick={() => scrollToSection(aboutRef)} className="py-2">About</button>
          <button onClick={() => scrollToSection(testimonialsRef)} className="py-2">Testimonials</button>
          <button onClick={() => scrollToSection(contactRef)} className="py-2">Contact</button>
          <div className="mt-2">
          <Button text="Sign Up" variant="homePage" onClick={() => navigate("/signup")} />
          </div>
          <div className="mt-2">
          <Button text="Sign In" variant="homePage" onClick={() => navigate("/signin")} />
          </div>
          
          
        </div>
      )}

      {/* Hero Section */}
      <div ref={homeRef} className="flex flex-col items-center justify-center text-center h-screen p-6 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Looking for PG rooms?</h1>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">or</h1>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Want to rent out your property?</h1>
        <p className="text-xl text-gray-300 max-w-xl md:max-w-2xl">
          Discover comfortable and affordable rooms near your college, or rent out your property effortlessly.
        </p>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="py-16 px-6 md:px-10 bg-gray-800 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">About Hosteller</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Hosteller is a platform that connects students looking for PGs with landlords renting out rooms. 
          Our goal is to simplify the process and ensure a hassle-free experience for both parties.
        </p>
      </div>

      {/* Testimonials Section */}
      <div ref={testimonialsRef} className="py-16 px-6 md:px-10 bg-gray-700 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Testimonials</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
          See what our users say about Hosteller!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-600 p-6 rounded-lg">
            <p>"Hosteller made it super easy for me to find a PG near my college!"</p>
            <h4 className="mt-2 font-semibold">- A Happy Student</h4>
          </div>
          <div className="bg-gray-600 p-6 rounded-lg">
            <p>"I found tenants quickly without any hassle. Highly recommended!"</p>
            <h4 className="mt-2 font-semibold">- A Satisfied Landlord</h4>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-16 px-6 md:px-10 bg-gray-800 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
          Have questions? Reach out to us and we'll be happy to assist you.
        </p>
        <form className="max-w-lg mx-auto">
          <input ref = {nameRef} type="text" placeholder="Your Name" className="w-full p-3 mb-4 rounded bg-gray-900 text-white" />
          <input ref={emailRef} type="email" placeholder="Your Email" className="w-full p-3 mb-4 rounded bg-gray-900 text-white" />
          <textarea ref={messageRef} placeholder="Your Message" className="w-full p-3 mb-4 rounded bg-gray-900 text-white"></textarea>
          <Button onClick={SendMessage} text="Send Message" variant="homePage" />
        </form>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-gray-900 text-center text-gray-400">
        &copy; 2025 Hosteller. All rights reserved.
      </footer>
    </div>
  );
}
