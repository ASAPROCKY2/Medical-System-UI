// src/components/dashboard/AdminDashboard/patients/Patients.tsx
import { useState } from "react";
import { FaUserTie, FaPhone, FaUser, FaIdCard, FaEdit } from "react-icons/fa";
import { MdDeleteForever, MdEmail, MdOutlineHome } from "react-icons/md";
import { Skeleton } from "../../../../components/ui/skeleton";
import UpdateUser from "./UpdatePatients";
import DeleteUser from "./DeletePatients";
import { usersAPI, type TUser } from "../../../../Features/users/userAPI";

const Patients = () => {
  const { data, isLoading, error } = usersAPI.useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  }) as { data?: TUser[]; isLoading: boolean; error?: any };

  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null);

  const handleEdit = (user: TUser) => {
    setSelectedUser(user);
    (document.getElementById("update_user_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (user: TUser) => {
    setUserToDelete(user);
    (document.getElementById("delete_user_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Modals */}
      <UpdateUser user={selectedUser} />
      <DeleteUser user={userToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-3 text-green-600 text-3xl" />
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Patients Management
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage all registered patients in your system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <p className="text-xs text-green-500">Total Patients</p>
            <p className="text-xl font-bold text-green-700">
              {data?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
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
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-start">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <MdDeleteForever className="text-red-500" />
          </div>
          <div>
            <h4 className="font-medium">Failed to load patients</h4>
            <p className="text-sm mt-1">
              Please check your connection and try again
            </p>
          </div>
        </div>
      )}

      {/* User cards */}
      {data?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((u) => (
            <div
              key={u.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-green-200"
            >
              <div className="bg-gradient-to-r from-green-50 to-gray-50 p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaUserTie className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {u.firstName} {u.lastName}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className="px-2 py-1 text-sm rounded border border-green-200 text-green-600">
                        {u.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <FaIdCard className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">User ID</p>
                    <p className="text-sm font-medium">{u.id}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium">
                      {u.contactPhone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdEmail className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium">
                      {u.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MdOutlineHome className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium">
                      {u.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(u)}
                    className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u)}
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
              <FaUser size={128} className="opacity-20" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-700">
              No patients registered yet
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Your system currently has no patients. Once users sign up, they will appear here.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Patients;
