// src/components/dashboard/AdminDashboard/prescriptions/Prescriptions.tsx

import { prescriptionsAPI, type TPrescription } from "../../../../Features/prescriptions/prescriptionsAPI";
import { FaEdit, FaClipboardList, FaUserMd } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import UpdatePrescription from "./UpdatePrescription";
import DeletePrescription from "./DeletePrescription";
import { Skeleton } from "../../../../components/ui/skeleton";

type PrescriptionsAPIResponse = {
  data: TPrescription[];
};

const Prescriptions = () => {
  const {
  data: prescriptionsData,
  isLoading,
  error,
} = prescriptionsAPI.useGetPrescriptionsQuery(undefined, {
  refetchOnMountOrArgChange: true,
  pollingInterval: 60000,
}) as { data?: PrescriptionsAPIResponse; isLoading: boolean; error?: any };


  const [selectedPrescription, setSelectedPrescription] = useState<TPrescription | null>(null);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<TPrescription | null>(null);

  const handleEdit = (prescription: TPrescription) => {
    setSelectedPrescription(prescription);
    (document.getElementById("update_prescription_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Modals */}
      <UpdatePrescription prescription={selectedPrescription} />
      <DeletePrescription prescription={prescriptionToDelete} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          Prescriptions Management
        </h2>
        <div className="text-sm text-gray-500">
          {prescriptionsData?.data?.length || 0} prescriptions found
        </div>
      </div>

      {/* Loading / Error States */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center">
          Error fetching prescriptions. Please try again.
        </div>
      )}

      {/* Table */}
      {prescriptionsData?.data?.length ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserMd className="mr-2" />
                    Doctor
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptionsData.data.map((prescription) => (
                <tr
                  key={prescription.prescription_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{prescription.prescription_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prescription.appointment_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Dr. {prescription.doctor_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Patient {prescription.patient_id}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-700">
                    {prescription.notes || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
  <div className="text-sm font-medium text-gray-900">
    {prescription.created_at
      ? new Date(prescription.created_at).toLocaleDateString()
      : "—"}
  </div>
</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(prescription)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
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
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
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
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FaClipboardList size={96} className="opacity-30" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No prescriptions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              There are currently no prescriptions available.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Prescriptions;
