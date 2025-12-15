/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendMessage = () => {
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-indigo-100"
      >
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-2">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-10">
          We’re here to help. Feel free to reach out anytime!
        </p>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div className="text-center">
            <Phone className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-gray-700 font-semibold">Phone</p>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="text-center">
            <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-gray-700 font-semibold">Email</p>
            <p className="text-gray-600">support@careerconnect.com</p>
          </div>

          <div className="text-center">
            <MapPin className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-gray-700 font-semibold">Location</p>
            <p className="text-gray-600">Chandigarh, India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleChange}
              className="p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <textarea
            name="message"
            rows="5"
            placeholder="Your Message..."
            onChange={handleChange}
            className="mt-6 p-3 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>

          <button
            onClick={sendMessage}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Send Message
          </button>
        </div>
      </motion.div>
    </div>
  );
}
