import { doctorsAPI } from "../../../../Features/doctor/doctorAPI";
import { type TDoctor } from "../../../../Features/doctor/doctorAPI";
import { FaUserMd, FaPhone, FaStethoscope } from "react-icons/fa";
import { MdDeleteForever, MdEmail, MdOutlineWork } from "react-icons/md";
import { FaEdit, FaUserTie, FaIdCard } from "react-icons/fa";
import { useState } from "react";
import UpdateDoctor from "./UpdateDoctor";
import DeleteDoctor from "./DeleteDoctor";
import { Skeleton } from "../../../../components/ui/skeleton";

type DoctorsAPIResponse = {
  data: TDoctor[];
};

const Doctors = () => {
  const {
    data: doctorsData,
    isLoading,
    error,
  } = doctorsAPI.useGetDoctorsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  }) as { data?: DoctorsAPIResponse; isLoading: boolean; error?: any };

  const [selectedDoctor, setSelectedDoctor] = useState<TDoctor | null>(null);
  const [doctorToDelete, setDoctorToDelete] = useState<TDoctor | null>(null);

  const handleEdit = (doctor: TDoctor) => {
    setSelectedDoctor(doctor);
    (document.getElementById("update_doctor_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Modals */}
      <UpdateDoctor doctor={selectedDoctor} />
      <DeleteDoctor doctor={doctorToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserMd className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Doctors Management
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all medical professionals in your healthcare system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-500">Total Doctors</p>
            <p className="text-xl font-bold text-blue-700">
              {doctorsData?.data?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Loading / Error states */}
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

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <MdDeleteForever className="text-red-500" />
          </div>
          <div>
            <h4 className="font-medium">Failed to load doctors</h4>
            <p className="text-sm mt-1">Please check your connection and try again</p>
          </div>
        </div>
      )}

      {/* Doctors List */}
      {doctorsData?.data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctorsData.data.map((doc) => (
            <div
              key={doc.doctor_id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-blue-200"
            >
              <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaUserTie className="text-blue-600 text-xl" />
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
              </div>

              <div className="p-6">
                <div className="space-y-4">
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
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(doc)}
                    className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDoctorToDelete(doc);
                      (document.getElementById("delete_doctor_modal") as HTMLDialogElement)?.showModal();
                    }}
                    className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <MdDeleteForever className="mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16">
            <div className="mx-auto h-32 w-32 text-gray-300">
              <FaUserMd size={128} className="opacity-20" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-700">
              No doctors registered yet
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Your healthcare system currently has no doctors. Add new medical professionals to get started.
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add First Doctor
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Doctors;
