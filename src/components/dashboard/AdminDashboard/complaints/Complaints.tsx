// src/components/dashboard/AdminDashboard/complaints/Complaints.tsx
import {
  complaintsAPI,
  type TComplaint,
} from "../../../../Features/complaints/complaintsAPI";
import { FaClipboardList, FaUserMd, FaUserInjured } from "react-icons/fa";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import { useState } from "react";
import { Skeleton } from "../../../../components/ui/skeleton";
import DeleteComplaint from "../complaints/DeleteComplaints";
import UpdateComplaint from "../complaints/UpdateComplaint";

const Complaints = () => {
  // fetch complaints
  const {
    data: complaintsData,
    isLoading,
    error,
  } = complaintsAPI.useGetComplaintsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [complaintToDelete, setComplaintToDelete] = useState<TComplaint | null>(null);
  const [complaintToUpdate, setComplaintToUpdate] = useState<TComplaint | null>(null);

  const handleDelete = (complaint: TComplaint) => {
    setComplaintToDelete(complaint);
    (document.getElementById("delete_complaint_modal") as HTMLDialogElement)?.showModal();
  };

  const handleUpdate = (complaint: TComplaint) => {
    setComplaintToUpdate(complaint);
    (document.getElementById("update_complaint_modal") as HTMLDialogElement)?.showModal();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <RiCheckboxCircleFill className="text-green-500 text-lg" />;
      case "Closed":
        return <RiCloseCircleFill className="text-gray-500 text-lg" />;
      default:
        return <FaClipboardList className="text-blue-500 text-lg" />;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg">
      {/* Modals */}
      <DeleteComplaint complaint={complaintToDelete} />
      <UpdateComplaint complaint={complaintToUpdate} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaClipboardList className="mr-3 text-blue-600 text-3xl" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Complaints
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Review and manage all submitted complaints
          </p>
        </div>
        <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <span className="font-medium text-blue-600">
            {complaintsData?.length || 0}
          </span>
          <span className="text-gray-500 ml-1">complaints</span>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center p-4 bg-white rounded-xl border border-gray-200"
            >
              <Skeleton className="h-10 w-10 rounded-full mr-4" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 flex items-center shadow-inner">
          <RiCloseCircleFill className="mr-3 text-xl flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading complaints</p>
            <p className="text-sm">Please refresh or try again later</p>
          </div>
        </div>
      )}

      {/* Table */}
      {complaintsData?.length ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserInjured className="mr-2 text-blue-500" /> From Patient
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex items-center">
                    <FaUserMd className="mr-2 text-blue-500" /> About Doctor
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
              {complaintsData.map((c: TComplaint) => (
                <tr key={c.complaint_id} className="hover:bg-blue-50/50">
                  <td className="px-6 py-4 whitespace-normal max-w-xs">
                    <div className="text-sm font-medium text-gray-800">{c.subject}</div>
                    {c.description && (
                      <div className="text-xs text-gray-500 mt-1">{c.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {c.patient_name || `User #${c.user_id}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {c.doctor_name || `Doctor #${c.doctor_id}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(c.status)}
                      <span
                        className={`ml-2 px-3 py-1 text-xs font-semibold rounded-full ${
                          c.status === "Resolved"
                            ? "bg-green-100 text-green-800"
                            : c.status === "Closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleUpdate(c)}
                      className="p-2 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg border border-blue-200 hover:border-blue-600 transition-all"
                      title="Edit complaint"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(c)}
                      className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 hover:border-red-600 transition-all"
                      title="Delete complaint"
                    >
                      <MdDeleteForever size={18} />
                    </button>
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
              <FaClipboardList size={96} className="opacity-20" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-700">No complaints found</h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              There are no complaints in the system at this time
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Complaints;
