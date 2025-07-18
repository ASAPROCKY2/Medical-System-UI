import { FaCalendarAlt, FaNotesMedical, FaUserMd } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaCalendarAlt className="w-12 h-12 text-blue-600" />,
      title: "Appointment Scheduling",
      description:
        "Book and manage your hospital appointments easily, with clear times and reminders.",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaNotesMedical className="w-12 h-12 text-green-600" />,
      title: "Prescription Tracking",
      description:
        "View your prescriptions online, keep track of refills, and access your treatment history.",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaUserMd className="w-12 h-12 text-purple-600" />,
      title: "Doctor Consultations",
      description:
        "Get follow‑up advice or quick medical guidance from your doctors through the system.",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Key Features for Patients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple tools that help you manage your care and connect with your hospital
          </p>
        </div>

        {/* Main feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="flex justify-center mb-6">{feature.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Extra features row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Secure Patient Profile
            </h3>
            <p className="text-gray-600">
              Update your details, view records, and keep everything in one place.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Notifications & Reminders
            </h3>
            <p className="text-gray-600">
              Get alerts for upcoming visits, prescription renewals, and health tips.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Support & Help Desk
            </h3>
            <p className="text-gray-600">
              Contact hospital staff easily for assistance or quick questions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
