// src/components/dashboard/DoctorDashboard/prescriptions/Prescriptions.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useState } from "react";
import {
  prescriptionsAPI,
  type TPrescription,
} from "../../../../Features/prescriptions/prescriptionsAPI";
import { FaEdit, FaClipboardList } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UpdatePrescription from "./UpdatePrescriptions";
import DeletePrescription from "./DeletePrescriptions";
import { Skeleton } from "../../../../components/ui/skeleton";

const Prescriptions = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const doctorId = user?.doctor_id;

  const {
    data: prescriptionsData,
    isLoading,
    error,
  } = prescriptionsAPI.useGetPrescriptionsByDoctorQuery(doctorId!, {
    skip: !doctorId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedPrescription, setSelectedPrescription] =
    useState<TPrescription | null>(null);
  const [prescriptionToDelete, setPrescriptionToDelete] =
    useState<TPrescription | null>(null);

  const handleEdit = (prescription: TPrescription) => {
    setSelectedPrescription(prescription);
    (document.getElementById(
      "update_prescription_modal"
    ) as HTMLDialogElement)?.showModal();
  };

  if (!doctorId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Prescriptions
        </h2>
        <p className="text-gray-600">
          You are not logged in as a doctor, so no prescriptions are available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <UpdatePrescription prescription={selectedPrescription} />
      <DeletePrescription prescription={prescriptionToDelete} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Prescriptions
        </h2>
        <div className="text-sm text-gray-500">
          {prescriptionsData?.length || 0} prescriptions found
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
          Error fetching prescriptions. Please try again.
        </div>
      )}

      {prescriptionsData && prescriptionsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Removed Prescription ID */}
                {/* Removed Appointment ID */}
                {/* Removed Doctor */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptionsData.map((prescription) => (
                <tr
                  key={prescription.prescription_id}
                  className="hover:bg-gray-50"
                >
                  {/* Removed Prescription ID cell */}
                  {/* Removed Appointment ID cell */}
                  {/* Removed Doctor cell */}

                  <td className="px-6 py-4 text-sm text-gray-900">
                    {prescription.patient
                      ? `${prescription.patient.firstname} ${prescription.patient.lastname}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-700">
                    {prescription.notes || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {prescription.created_at
                      ? new Date(prescription.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(prescription)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50"
                        title="Edit prescription"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setPrescriptionToDelete(prescription);
                          (document.getElementById(
                            "delete_prescription_modal"
                          ) as HTMLDialogElement)?.showModal();
                        }}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50"
                        title="Delete prescription"
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
          <div className="text-center py-12">
            <FaClipboardList size={96} className="mx-auto text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No prescriptions found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven’t written any prescriptions yet.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Prescriptions;
