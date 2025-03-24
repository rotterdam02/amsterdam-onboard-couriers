'use client';

import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPlane, FaClock, FaShieldAlt, FaGlobe, FaRocket, FaStar, FaTimes, FaArrowRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number }>>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'getStarted' | 'contact'>('getStarted');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add spring animation for smoother scroll
  const springConfig = { damping: 15, stiffness: 100 };
  const springY = useSpring(scrollYProgress, springConfig);

  // Enhanced star generation with golden ratio
  useEffect(() => {
    const generateStars = () => {
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      const angleIncrement = Math.PI * 2 * goldenRatio;
      const newStars = Array.from({ length: 100 }, (_, i) => {
        const t = i / 100;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;
        const x = Math.sin(inclination) * Math.cos(azimuth) * window.innerWidth;
        const y = Math.sin(inclination) * Math.sin(azimuth) * window.innerHeight;
        return {
          x: x + window.innerWidth / 2,
          y: y + window.innerHeight / 2,
          size: Math.random() * 2 + 1,
        };
      });
      setStars(newStars);
    };

    generateStars();
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleButtonClick = (type: 'getStarted' | 'contact') => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Enhanced Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
        }}
      />
      
      {/* Enhanced Stars with Golden Ratio Distribution */}
      <div className="fixed inset-0 z-0">
        {stars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              width: star.size,
              height: star.size,
              left: star.x,
              top: star.y,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section with Enhanced Typography */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"
          style={{ y: springY }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 leading-tight"
          >
            Amsterdam Onboard Couriers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-200 leading-relaxed"
          >
            Professional onboard courier services from Amsterdam to worldwide destinations
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleButtonClick('getStarted')}
            className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto"
          >
            Get Started
            <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </section>

      {/* Services Section with Enhanced Cards */}
      <section className="py-32 bg-black/50 backdrop-blur-sm" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-white"
          >
            Our Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaRocket className="w-12 h-12" />,
                title: "Onboard Courier",
                description: "Personal delivery service with dedicated couriers on commercial flights"
              },
              {
                icon: <FaClock className="w-12 h-12" />,
                title: "Express Delivery",
                description: "Time-critical shipments with guaranteed delivery times"
              },
              {
                icon: <FaShieldAlt className="w-12 h-12" />,
                title: "Secure Transport",
                description: "High-security handling for valuable and sensitive cargo"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02, rotate: 1, y: -5 }}
                className="group bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="text-blue-400 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Enhanced Layout */}
      <section className="py-32 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 text-white"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "24/7 availability for urgent shipments",
              "Experienced and professional couriers",
              "Real-time tracking and updates",
              "Competitive pricing",
              "Global network coverage",
              "Custom solutions for your needs"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-400/50 transition-colors duration-300"
              >
                <FaStar className="text-yellow-400 transform group-hover:scale-110 transition-transform duration-300" />
                <p className="text-lg text-white">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Enhanced Button */}
      <section className="py-32 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Get in Touch</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Ready to experience professional onboard courier services? Contact us today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick('contact')}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center mx-auto"
            >
              Contact Us
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black/80 backdrop-blur-md text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Amsterdam Onboard Couriers</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional onboard courier services from Amsterdam to worldwide destinations
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <motion.a
                  whileHover={{ x: 5 }}
                  href="mailto:u.wintersperger@icloud.com"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <FaGlobe className="text-blue-400" />
                  <p>Email: u.wintersperger@icloud.com</p>
                </motion.a>
                <motion.a
                  whileHover={{ x: 5 }}
                  href="tel:+4917634361704"
                  className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <FaClock className="text-blue-400" />
                  <p>Phone: +49 176 34361704</p>
                </motion.a>
                <div className="flex items-center space-x-3 text-gray-400">
                  <FaShieldAlt className="text-blue-400" />
                  <p>VAT: DE366639973</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
              <div className="flex space-x-6">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaGlobe className="w-8 h-8" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Amsterdam Onboard Couriers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative bg-gradient-to-br from-blue-900 to-purple-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              >
                <FaTimes size={24} />
              </motion.button>

              {modalType === 'getStarted' ? (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Get Started with Us</h3>
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <textarea
                        placeholder="Tell us about your shipping needs"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors h-32 resize-none"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Submit Request
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                  <div className="space-y-6">
                    <motion.a
                      whileHover={{ scale: 1.02, x: 5 }}
                      href="mailto:u.wintersperger@icloud.com"
                      className="flex items-center space-x-4 text-white hover:text-blue-400 transition-colors cursor-pointer p-3 rounded-lg hover:bg-white/5"
                    >
                      <FaGlobe className="text-blue-400 text-xl" />
                      <p>Email: u.wintersperger@icloud.com</p>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.02, x: 5 }}
                      href="tel:+4917634361704"
                      className="flex items-center space-x-4 text-white hover:text-blue-400 transition-colors cursor-pointer p-3 rounded-lg hover:bg-white/5"
                    >
                      <FaClock className="text-blue-400 text-xl" />
                      <p>Phone: +49 176 34361704</p>
                    </motion.a>
                    <div className="flex items-center space-x-4 text-white p-3">
                      <FaShieldAlt className="text-blue-400 text-xl" />
                      <p>VAT: DE366639973</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

