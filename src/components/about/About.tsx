import hospitalImage from '../../assets/images/hospital-about.jpg';
import { Testimonials } from './index';

const About = () => {
    return (
        <div className="py-12">
            <div className="flex flex-col md:flex-row justify-between gap-8 h-fit p-4 md:p-8 max-w-6xl mx-auto">
                {/* Left section: Image */}
                <div className="w-full md:w-1/2 flex items-center">
                    <img
                        src={hospitalImage}
                        alt="about-our-medical-system"
                        className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>

                {/* Right section: Content */}
                <div className="w-full md:w-1/2 border-2 border-gray-200 rounded-lg p-6 md:p-8 mb-6 md:mb-0 bg-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-700">
                        About Our Medical System
                    </h1>
                    <p className="mb-4 text-gray-700 text-base md:text-lg">
                        Our Medical Appointment & Patient Management System is built to simplify healthcare 
                        workflows for both patients and medical staff. From booking consultations to managing 
                        patient records, we provide a reliable platform that keeps everything organized.
                    </p>
                    <p className="mb-2 text-gray-700 text-base md:text-lg">
                        Designed with modern hospitals and clinics in mind, the system integrates appointment 
                        scheduling, notifications, and secure data management in one place.
                    </p>
                    <p className="text-gray-700 text-base md:text-lg">
                        Our mission is to improve patient care and make medical management easier, faster, and more accurate for everyone involved.
                    </p>

                    {/* Highlights */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-700">500+ Patients Served</h3>
                            <p className="text-sm text-gray-600">Trusted by clinics and hospitals</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-700">24/7 Access</h3>
                            <p className="text-sm text-gray-600">Your records, anytime, anywhere</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <Testimonials />
        </div>
    );
};

export default About;
