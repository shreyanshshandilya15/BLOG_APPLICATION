import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Blog</h1>
          <p className="text-xl text-gray-600">Discover the story behind our platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              We're dedicated to creating a space where writers and readers can connect, share ideas, and inspire each other. Our platform is built on the principles of creativity, community, and knowledge sharing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• A beautiful, intuitive writing platform</li>
              <li>• Seamless social sharing capabilities</li>
              <li>• Rich text editing tools</li>
              <li>• Secure authentication system</li>
              <li>• Responsive design for all devices</li>
            </ul>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                bio: "Passionate about creating meaningful digital experiences."
              },
              {
                name: "Jane Smith",
                role: "Lead Developer",
                bio: "Expert in building scalable web applications."
              },
              {
                name: "Mike Johnson",
                role: "Design Director",
                bio: "Focused on creating beautiful and functional interfaces."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl text-gray-500">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Join Our Community</h2>
          <p className="text-gray-600 text-center mb-6">
            Whether you're a writer looking to share your stories or a reader seeking inspiration, we welcome you to join our growing community.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 