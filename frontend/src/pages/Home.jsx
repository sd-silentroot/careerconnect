import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
      </div>
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Build Your Career With{" "}
          <span className="text-indigo-600">CareerConnect</span>
        </h1>

        <p className="mt-5 text-lg text-gray-600">
          Explore jobs, track applications, and manage your career journey in
          one simple platform.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-7 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-indigo-600 text-indigo-600 px-7 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
          >
            Register
          </Link>
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Trusted platform for students and job seekers
        </p>
      </div>
    </div>
  );
};

export default Home;
