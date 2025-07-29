// src/dashboard/UserDashboard/prescriptions/UserPrescriptions.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import {
  useGetPrescriptionsByPatientQuery,
  type TPrescription,
} from "../../../../Features/prescriptions/prescriptionsAPI";
import { FaClipboardList } from "react-icons/fa";
import { Skeleton } from "../../../../components/ui/skeleton";

const UserPrescriptions = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.user_id;

  const {
    data: prescriptionsData,
    isLoading,
    error,
  } = useGetPrescriptionsByPatientQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  if (!userId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Prescriptions
        </h2>
        <p className="text-gray-600">
          You are not logged in as a user, so no prescriptions are available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Prescriptions
        </h2>
        <div className="text-sm text-gray-500">
          {prescriptionsData?.length || 0} prescriptions found
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error fetching prescriptions. Please try again.
        </div>
      )}

      {/* Table */}
      {prescriptionsData && prescriptionsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Removed Prescription ID column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Related Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptionsData.map((p: TPrescription) => (
                <tr key={p.prescription_id} className="hover:bg-gray-50">
                  {/* Removed ID cell */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {p.appointment
                      ? `#${p.appointment.appointment_id} — ${
                          p.appointment.appointment_date
                            ? new Date(p.appointment.appointment_date).toLocaleDateString()
                            : ""
                        }`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {p.doctor
                      ? `Dr. ${p.doctor.first_name} ${p.doctor.last_name}`
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {p.notes || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleDateString()
                      : "—"}
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
              You don’t have any prescriptions yet.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UserPrescriptions;
