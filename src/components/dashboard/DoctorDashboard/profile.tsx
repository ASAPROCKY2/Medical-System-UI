// src/components/dashboard/DoctorDashboard/DoctorProfile.tsx
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../../../app/store";
import { logout } from "../../../Features/login/userSlice";
import { usersAPI } from "../../../Features/users/userAPI";
import UpdateProfile from "../../../components/dashboard/UserDashboard/ManageUsers/UpdateProfile";

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the logged-in user from redux
  const authUser = useSelector((state: RootState) => state.user.user);
  const userId = authUser?.user_id;

  // fetch the full profile from API
  const { data, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(userId ?? 0, {
    skip: !userId,
  });

  if (isLoading) {
    return <p className="p-4 text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">Error loading profile.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md min-h-screen">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {/* Profile Card */}
      <div className="flex flex-col items-center mb-6 gap-4 border border-gray-300 p-4 rounded">
        <img
          src={
            data?.image_url && data.image_url.trim() !== ""
              ? data.image_url
              : "/default-avatar.png"
          }
          alt="Doctor Avatar"
          className="w-40 h-40 object-cover rounded-full border-2 border-gray-400"
        />

        <div className="text-center">
          <h3 className="text-lg font-bold">
            Name: {data?.firstName} {data?.lastName}
          </h3>
          <p className="text-gray-600">User ID: {data?.id}</p>
          <p className="text-gray-600">Email: {data?.email}</p>
          <p className="text-gray-600">Role: {data?.role}</p>
          <p className="text-gray-600">
            Verified? {data?.isVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        <button
          className="btn btn-primary"
          onClick={() => {
            (
              document.getElementById("update_profile_modal") as HTMLDialogElement
            )?.showModal();
          }}
        >
          Update Profile
        </button>

        <button
          className="btn btn-error"
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>

      {/* Modal for update */}
      {data && <UpdateProfile user={data} refetch={refetch} />}
    </div>
  );
};

export default DoctorProfile;
