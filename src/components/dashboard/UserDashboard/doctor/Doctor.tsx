import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { doctorsAPI, type TDoctor } from "../../../../Features/doctor/doctorAPI";
import {
  FaUserMd,
  FaPhone,
  FaStethoscope,
  FaUserTie,
  FaIdCard,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdEmail, MdOutlineWork } from "react-icons/md";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useState } from "react";
import CreateAppointment from "../doctor/CreateAppointments";

type DoctorsAPIResponse = {
  data: TDoctor[];
};

const UserDoctors = () => {
  const loggedInUserId = useSelector(
    (state: RootState) => state.user.user?.user_id ?? null
  );

  const {
    data: doctorsData,
    isLoading,
    error,
  } = doctorsAPI.useGetDoctorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  }) as { data?: DoctorsAPIResponse; isLoading: boolean; error?: any };

  const [selectedDoctor, setSelectedDoctor] = useState<TDoctor | null>(null);

  const handleBookAppointment = (doctor: TDoctor) => {
    setSelectedDoctor(doctor);
    (document.getElementById("book_appointment_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserMd className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Available Doctors
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Browse through all available doctors and book your appointment
          </p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-500">Total Doctors</p>
          <p className="text-xl font-bold text-blue-700">
            {doctorsData?.data?.length || 0}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Failed to load doctors. Please try again later.
        </div>
      )}

      {/* Doctors list */}
      {doctorsData?.data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.data.map((doc) => (
            <div
              key={doc.doctor_id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              {/* Card header with image */}
              <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200 flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-300 flex-shrink-0">
                  <img
                    src={
                      doc.image_url && doc.image_url.trim() !== ""
                        ? doc.image_url
                        : "/default-avatar.png"
                    }
                    alt={`Dr. ${doc.first_name} ${doc.last_name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    Dr. {doc.first_name} {doc.last_name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-1 text-sm rounded border border-blue-200 text-blue-600">
                      {doc.specialization || "General Practitioner"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FaIdCard className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Doctor ID</p>
                    <p className="text-sm font-medium">{doc.doctor_id}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaStethoscope className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Specialization</p>
                    <p className="text-sm font-medium">
                      {doc.specialization || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* ✅ Show Available Days */}
                <div className="flex items-start">
                  <FaCalendarAlt className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Available Days</p>
                    <p className="text-sm font-medium">
                      {doc.available_days || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdOutlineWork className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium">Not specified</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium">
                      {doc.contact_phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdEmail className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">Not provided</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleBookAppointment(doc)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16">
            <FaUserMd size={128} className="opacity-20 mx-auto" />
            <h3 className="mt-6 text-xl font-medium text-gray-700">
              No doctors available
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              There are currently no doctors to show.
            </p>
          </div>
        )
      )}

      {/* Modal for booking */}
      <CreateAppointment
        selectedDoctorId={selectedDoctor?.doctor_id || null}
        userId={loggedInUserId}
      />
    </div>
  );
};

export default UserDoctors;
