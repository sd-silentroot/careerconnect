/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { BookOpen, Code, Compass, Video, Newspaper } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      icon: <BookOpen className="w-10 h-10 text-indigo-600" />,
      title: "Interview Preparation",
      description:
        "Ace your next interview with top questions, resume templates, and preparation guides.",
      links: [
        {
          text: "Top 100 Interview Questions",
          url: "https://www.geeksforgeeks.org/hr-interview-questions/",
        },
        {
          text: "Resume Templates",
          url: "https://www.canva.com/resumes/templates/",
        },
        {
          text: "Interview Tips & Tricks",
          url: "https://www.indeed.com/career-advice/interviewing/interview-tips",
        },
      ],
    },
    {
      icon: <Code className="w-10 h-10 text-green-600" />,
      title: "Learning Resources",
      description:
        "Boost your knowledge with free coding tutorials, cybersecurity, and cloud courses.",
      links: [
        { text: "Free Coding Lessons", url: "https://www.freecodecamp.org/" },
        {
          text: "Cybersecurity Basics",
          url: "https://www.coursera.org/learn/ibm-cybersecurity-basics",
        },
        {
          text: "AWS Cloud Crash Course",
          url: "https://aws.amazon.com/training/learn-about/cloud/",
        },
      ],
    },
    {
      icon: <Compass className="w-10 h-10 text-orange-600" />,
      title: "Career Guides",
      description:
        "Explore guides on choosing the right path, preparing for roles, and building your career.",
      links: [
        {
          text: "How to Choose Your Career",
          url: "https://www.coursera.org/articles/choose-a-career",
        },
        {
          text: "Top 10 Tech Careers in 2025",
          url: "https://www.simplilearn.com/top-technology-trends-and-jobs-article",
        },
        {
          text: "Roadmap for Beginners",
          url: "https://roadmap.sh/",
        },
      ],
    },
    {
      icon: <Video className="w-10 h-10 text-pink-600" />,
      title: "Videos / PDFs",
      description:
        "Learn visually from video tutorials and downloadable PDF resources.",
      links: [
        {
          text: "React & Node.js Tutorials (YouTube)",
          url: "https://www.youtube.com/@freecodecamp",
        },
        {
          text: "Cybersecurity PDF Guide",
          url: "https://www.us-cert.gov/sites/default/files/publications/cybersecurity_tips.pdf",
        },
        {
          text: "Soft Skills for Developers",
          url: "https://www.coursera.org/learn/soft-skills",
        },
      ],
    },
    {
      icon: <Newspaper className="w-10 h-10 text-blue-600" />,
      title: "Tech Updates",
      description:
        "Stay updated with the latest news in AI, Cloud, and Web Development.",
      links: [
        {
          text: "AI Weekly Digest",
          url: "https://www.theverge.com/ai-artificial-intelligence",
        },
        {
          text: "Latest Cloud Innovations",
          url: "https://cloud.google.com/blog/",
        },
        {
          text: "Web3 & Future of Internet",
          url: "https://cointelegraph.com/",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Learning & Career Resources
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-3xl shadow-md p-6 border border-indigo-100 flex flex-col items-start"
            >
              <div className="mb-4">{res.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {res.title}
              </h2>
              <p className="text-gray-600 mb-3">{res.description}</p>
              <ul className="text-sm text-indigo-600 space-y-1">
                {res.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      • {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
