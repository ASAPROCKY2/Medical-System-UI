import {
  appointmentsAPI,
  type TAppointment,
} from "../../../../Features/appointments/appointmentsAPI";
import {
  FaEdit,
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { MdDeleteForever, MdOutlinePendingActions } from "react-icons/md";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import UpdateAppointment from "./UpdateAppointments";
import DeleteAppointment from "./DeleteAppointment";
import { Skeleton } from "../../../../components/ui/skeleton";

const toFlat = (appt: any): TAppointment => ({
  appointment_id: appt.appointment_id,
  user_id: appt.user_id,
  doctor_id: appt.doctor_id,
  appointment_date: appt.appointment_date,
  time_slot: appt.time_slot,
  total_amount: appt.total_amount,
  appointment_status: appt.appointment_status,
  created_at: appt.created_at,
  updated_at: appt.updated_at,
});

const Appointments = () => {
  const {
    data: appointmentsData,
    isLoading,
    error,
  } = appointmentsAPI.useGetAppointmentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<TAppointment | null>(null);

  const handleEdit = (appointment: any) => {
    setSelectedAppointment(toFlat(appointment));
    (
      document.getElementById(
        "update_appointment_modal"
      ) as HTMLDialogElement
    )?.showModal();
  };

  const handleDelete = (appointment: any) => {
    setAppointmentToDelete(toFlat(appointment));
    (
      document.getElementById(
        "delete_appointment_modal"
      ) as HTMLDialogElement
    )?.showModal();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <RiCheckboxCircleFill className="text-green-500 text-lg" />;
      case "Cancelled":
        return <RiCloseCircleFill className="text-red-500 text-lg" />;
      default:
        return <MdOutlinePendingActions className="text-blue-500 text-lg" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">
      {/* Modals */}
      <UpdateAppointment appointment={selectedAppointment} />
      <DeleteAppointment appointment={appointmentToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaCalendarAlt className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Appointments
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all patient appointments and schedules
          </p>
        </div>
        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <span className="font-medium text-blue-600">
            {appointmentsData?.length || 0}
          </span>
          <span className="text-gray-500 ml-1">appointments</span>
        </div>
      </div>

      {/* Loading or error states */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4 bg-white rounded-xl border border-gray-200">
              <Skeleton className="h-10 w-10 rounded-full mr-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center shadow-inner">
          <RiCloseCircleFill className="mr-3 text-xl flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading appointments</p>
            <p className="text-sm">Please refresh the page or try again later</p>
          </div>
        </div>
      )}

      {/* Table */}
      {appointmentsData?.length ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" /> Date
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-blue-500" /> Time
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserMd className="mr-2 text-blue-500" /> Doctor
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaDollarSign className="mr-2 text-blue-500" /> Amount
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentsData.map((appt: any) => (
                <tr
                  key={appt.appointment_id}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appt.appointment_date
                        ? new Date(appt.appointment_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 font-medium">
                      {appt.time_slot || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appt.doctor_name || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {appt.patient_name || "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {appt.total_amount
                        ? `$${Number(appt.total_amount).toFixed(2)}`
                        : "—"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(appt.appointment_status)}
                      <span
                        className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${
                          appt.appointment_status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : appt.appointment_status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appt.appointment_status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(appt)}
                        className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-200 hover:border-blue-600 transition-all"
                        title="Edit appointment"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(appt)}
                        className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all"
                        title="Delete appointment"
                      >
                        <MdDeleteForever size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <FaCalendarAlt size={96} className="opacity-20" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              No appointments scheduled
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              There are currently no appointments in the system
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Appointments;