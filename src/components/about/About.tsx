import hospitalImage from '../../assets/images/hospital-about.jpg';
import { Testimonials } from './index';
import { motion } from 'framer-motion';
import { FaUserShield, FaClock, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';
import { GiHospital } from 'react-icons/gi';

const About = () => {
    return (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 max-w-6xl mx-auto">
                {/* Left section: Image with animation */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 flex items-center relative"
                >
                    <img
                        src={hospitalImage}
                        alt="about-our-medical-system"
                        className="w-full h-64 md:h-[28rem] object-cover rounded-xl shadow-2xl"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                        <GiHospital className="text-4xl text-green-600" />
                    </div>
                </motion.div>

                {/* Right section: Content with animation */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-1/2 border border-gray-100 rounded-xl p-6 md:p-8 mb-6 md:mb-0 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                        About Our Medical System
                    </h1>
                    <div className="space-y-4 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            Our <span className="font-semibold text-green-600">Medical Appointment & Patient Management System</span> revolutionizes healthcare workflows with cutting-edge technology designed for both patients and medical professionals.
                        </p>
                        <p className="text-lg leading-relaxed">
                            From <span className="font-semibold">seamless appointment booking</span> to comprehensive <span className="font-semibold">patient record management</span>, we provide an integrated platform that enhances efficiency and improves care quality.
                        </p>
                        <p className="text-lg leading-relaxed">
                            Our mission is to <span className="font-semibold text-blue-600">transform healthcare delivery</span> through innovative solutions that make medical management intuitive, secure, and patient-centric.
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {[
                            { 
                                icon: <FaUserShield className="text-2xl text-green-600" />, 
                                title: "500+ Patients", 
                                desc: "Trusted by clinics",
                                bg: "bg-gradient-to-br from-green-50 to-green-100"
                            },
                            { 
                                icon: <FaClock className="text-2xl text-blue-600" />, 
                                title: "24/7 Access", 
                                desc: "Anytime, anywhere",
                                bg: "bg-gradient-to-br from-blue-50 to-blue-100"
                            },
                            { 
                                icon: <FaHeartbeat className="text-2xl text-red-600" />, 
                                title: "Health First", 
                                desc: "Patient-centered care",
                                bg: "bg-gradient-to-br from-red-50 to-red-100"
                            },
                            { 
                                icon: <FaShieldAlt className="text-2xl text-purple-600" />, 
                                title: "Secure Data", 
                                desc: "HIPAA compliant",
                                bg: "bg-gradient-to-br from-purple-50 to-purple-100"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className={`${item.bg} p-4 rounded-xl border border-gray-100 shadow-sm`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Testimonials Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-6xl mx-auto px-4 md:px-8 mt-16"
            >
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Trusted by Healthcare Professionals</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
                </div>
                <Testimonials />
            </motion.div>
        </div>
    );
};

export default About;