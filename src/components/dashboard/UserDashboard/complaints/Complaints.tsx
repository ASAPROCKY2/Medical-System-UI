import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import {
  complaintsAPI,
  type TComplaint,
} from "../../../../Features/complaints/complaintsAPI";
import { FaClipboardList } from "react-icons/fa";
import { Skeleton } from "../../../../components/ui/skeleton";

const Complaints = () => {
  // get logged in user
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.user_id;

  // fetch complaints for this user
  const {
    data: complaintsData,
    isLoading,
    error,
  } = complaintsAPI.useGetComplaintsByUserQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  if (!userId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Complaints
        </h2>
        <p className="text-gray-600">
          You are not logged in as a user, so no complaints are available.
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
          My Complaints
        </h2>
        <div className="text-sm text-gray-500">
          {complaintsData?.length || 0} complaints found
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error fetching complaints. Please try again.
        </div>
      )}

      {/* Table */}
      {complaintsData && complaintsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Complaint ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Related Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaintsData.map((complaint: TComplaint) => (
                <tr key={complaint.complaint_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    #{complaint.complaint_id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.related_appointment_id ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.doctor_name ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.subject}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        complaint.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : complaint.status === "Closed"
                          ? "bg-gray-100 text-gray-800"
                          : complaint.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {complaint.created_at
                      ? new Date(complaint.created_at).toLocaleDateString()
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
              No complaints found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven’t created any complaints yet.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Complaints;