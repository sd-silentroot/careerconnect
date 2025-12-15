/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Users, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-6 py-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-10 border border-indigo-100"
      >
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-4">
          About CareerConnect
        </h1>

        <p className="text-center text-gray-700 text-lg mb-10">
          Empowering students & professionals by bridging the gap between talent
          and opportunity.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {/* Vision */}
          <div className="flex gap-4">
            <Target className="text-indigo-600 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Our Mission
              </h2>
              <p className="text-gray-600">
                We aim to provide a simple and clean platform where users can
                explore genuine job opportunities, grow their careers, and
                connect with companies.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="flex gap-4">
            <Users className="text-indigo-600 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Our Team
              </h2>
              <p className="text-gray-600">
                A passionate group of developers, creators, and thinkers working
                together to build career tools for everyone—simple, fast, and
                authentic.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex gap-4">
            <Sparkles className="text-indigo-600 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
                Our Vision
              </h2>
              <p className="text-gray-600">
                To become the most trusted career platform for freshers and job
                seekers, delivering transparent, verified, and real
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
