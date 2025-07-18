import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-teal-700 text-white p-10 md:p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <img 
              src="/path-to-your-logo.png" 
              alt="Hospital Logo" 
              className="h-10 mr-3"
            />
            <span className="text-2xl font-bold">MediCare+</span>
          </div>
          <p className="mb-4 text-teal-100">
            Smarter hospital management for better patient care.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-teal-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-teal-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title text-white text-lg mb-4">Quick Links</h3> 
          <ul className="space-y-2">
            <li><Link to="/" className="link link-hover text-teal-100 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="link link-hover text-teal-100 hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="link link-hover text-teal-100 hover:text-white">Services</Link></li>
            <li><Link to="/appointments" className="link link-hover text-teal-100 hover:text-white">Appointments</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title text-white text-lg mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link to="/services/emergency" className="link link-hover text-teal-100 hover:text-white">Emergency Care</Link></li>
            <li><Link to="/services/checkup" className="link link-hover text-teal-100 hover:text-white">Health Checkup</Link></li>
            <li><Link to="/services/consultation" className="link link-hover text-teal-100 hover:text-white">Doctor Consultation</Link></li>
            <li><Link to="/services/laboratory" className="link link-hover text-teal-100 hover:text-white">Laboratory Tests</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title text-white text-lg mb-4">Contact</h3>
          <ul className="space-y-2">
            <li className="text-teal-100">123 Medical Drive, Health City</li>
            <li className="text-teal-100">Phone: (123) 456-7890</li>
            <li className="text-teal-100">Email: info@medicare.com</li>
            <li className="text-teal-100">Emergency: (123) 456-7891</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-teal-600 pt-6 mt-8 text-center md:text-left">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-100">
            © {new Date().getFullYear()} MediCare+ Hospital. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="link link-hover text-teal-100 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="link link-hover text-teal-100 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;