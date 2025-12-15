/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Brain, TrendingUp, Star, Target, BookOpen } from "lucide-react";

export default function AIRecommendations() {
  // ✅ Read user profile from sessionStorage
  const storedProfile = sessionStorage.getItem("profile");
  const profile = storedProfile ? JSON.parse(storedProfile) : {};

  // ✅ Extract key details
  const { fullName, degree, education, skills } = profile;

  // ✅ AI-style logic for dynamic recommendations
  const skillBasedSuggestions = () => {
    if (!skills) return ["Start adding your skills to get AI-based guidance!"];

    const lower = skills.toLowerCase();
    if (lower.includes("react") || lower.includes("javascript"))
      return [
        "Explore advanced React patterns and state management (Redux/Zustand).",
        "Learn backend integration with Node.js or Express.",
        "Build a portfolio using MERN stack projects.",
      ];
    if (lower.includes("python") || lower.includes("data"))
      return [
        "Focus on Python libraries like Pandas and NumPy.",
        "Try basic Machine Learning using Scikit-learn.",
        "Build data visualization dashboards using Plotly or Tableau.",
      ];
    if (lower.includes("cyber") || lower.includes("security"))
      return [
        "Practice penetration testing on TryHackMe or HackTheBox.",
        "Learn about network protocols and security tools.",
        "Get familiar with OWASP Top 10 vulnerabilities.",
      ];
    if (lower.includes("cloud"))
      return [
        "Earn AWS Certified Cloud Practitioner certification.",
        "Learn about serverless computing and Docker containers.",
        "Practice deploying apps on AWS or Azure.",
      ];
    return [
      "Keep upgrading your skills — try learning a new programming language.",
      "Work on real-world projects to strengthen your resume.",
      "Stay consistent and build your GitHub profile.",
    ];
  };

  const recommendations = [
    {
      icon: <TrendingUp className="w-10 h-10 text-indigo-600" />,
      title: "Personalized Skill Enhancement",
      description: `Hi ${
        fullName || "there"
      }! Based on your skills, here’s what you can focus on next:`,
      list: skillBasedSuggestions(),
    },
    {
      icon: <Star className="w-10 h-10 text-yellow-500" />,
      title: "Recommended Learning Resources",
      description:
        "Here are some AI-picked resources to match your background:",
      list: [
        education?.toLowerCase().includes("computer")
          ? "Coursera: System Design & Architecture"
          : "edX: Problem Solving & Critical Thinking",
        degree?.toLowerCase().includes("btech")
          ? "YouTube: JavaScript Mastery Projects"
          : "LinkedIn Learning: Career Growth Strategies",
        "roadmap.sh – structured learning paths for developers",
      ],
    },
    {
      icon: <Target className="w-10 h-10 text-green-600" />,
      title: "Suggested Career Paths",
      description:
        "AI recommends exploring these job paths based on your data:",
      list: skills?.toLowerCase().includes("cloud")
        ? ["Cloud Engineer", "DevOps Specialist", "System Administrator"]
        : skills?.toLowerCase().includes("cyber")
        ? ["Security Analyst", "Network Specialist", "Ethical Hacker"]
        : ["Frontend Developer", "Backend Developer", "Technical Associate"],
    },
    {
      icon: <BookOpen className="w-10 h-10 text-pink-500" />,
      title: "Next 3-Month Learning Plan",
      description: "Here’s how to grow step-by-step:",
      list: [
        "Month 1: Revise your basics and improve problem-solving.",
        "Month 2: Deep dive into a specialization (Web / Cloud / Security).",
        "Month 3: Build a complete project and upload on GitHub.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100 p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10 flex justify-center items-center gap-3">
          <Brain className="w-10 h-10 text-purple-600" /> AI Recommendations
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {recommendations.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl shadow-md p-6 border border-indigo-100"
            >
              <div className="mb-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                {item.list.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-indigo-200"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">
            🧠 Smart Insight
          </h2>
          <p className="text-gray-600">
            AI predicts that individuals with skills in{" "}
            <span className="font-semibold text-purple-600">
              {skills || "technology and adaptability"}
            </span>{" "}
            will see rapid career opportunities in 2025. Stay consistent,{" "}
            <span className="text-green-600 font-semibold">keep learning</span>,
            and aim high!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
