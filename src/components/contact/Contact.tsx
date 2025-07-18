// src/components/Contact.tsx
const Contact = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact & Support</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach out to us for help, appointments, or general questions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-2">📞 Phone: +254 700 000000</p>
            <p className="text-gray-600 mb-4">✉️ Email: support@hospital.com</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Send Message
            </button>
          </div>

          {/* Map or Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Location</h3>
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
