// src/components/dashboard/DoctorDashboard/appointments/DoctorAppointments.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useState } from "react";
import {
  appointmentsAPI,
  type TAppointmentFull,
} from "../../../../Features/appointments/appointmentsAPI";
import { FaClipboardList, FaPrescriptionBottleAlt } from "react-icons/fa";
import { Skeleton } from "../../../../components/ui/skeleton";
import CreatePrescription from "../appointments/CreatePrescrptions";

const DoctorAppointments = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const doctorId = user?.doctor_id;

  const [selectedAppointment, setSelectedAppointment] =
    useState<TAppointmentFull | null>(null);

  const {
    data: appointmentsData,
    isLoading,
    error,
  } = appointmentsAPI.useGetAppointmentsByDoctorQuery(doctorId!, {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const openPrescriptionModal = (appt: TAppointmentFull) => {
    setSelectedAppointment(appt);
    (document.getElementById("create_prescription_modal") as HTMLDialogElement)?.showModal();
  };

  if (!doctorId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Appointments
        </h2>
        <p className="text-gray-600">
          You are not logged in as a doctor, so no appointments are available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <CreatePrescription
        appointmentId={selectedAppointment?.appointment_id ?? null}
        doctorId={doctorId}
        patientId={selectedAppointment?.user_id ?? null}
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Appointments
        </h2>
        <div className="text-sm text-gray-500">
          {appointmentsData?.length || 0} appointments found
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error fetching appointments. Please try again.
        </div>
      )}

      {appointmentsData && appointmentsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Removed ID column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Time Slot
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentsData.map((appt) => (
                <tr key={appt.appointment_id} className="hover:bg-gray-50">
                  {/* Removed ID cell */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(appt.appointment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {appt.time_slot}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {appt.patient_name ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appt.appointment_status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.appointment_status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appt.appointment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <button
                      onClick={() => openPrescriptionModal(appt)}
                      className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50"
                      title="Create Prescription"
                    >
                      <FaPrescriptionBottleAlt size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-12">
            <FaClipboardList size={96} className="mx-auto text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No appointments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You have no appointments assigned.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default DoctorAppointments;
