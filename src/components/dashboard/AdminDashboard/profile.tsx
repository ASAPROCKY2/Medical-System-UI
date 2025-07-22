// src/components/dashboard/AdminDashboard/Profile.tsx
import { type RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { usersAPI } from "../../../Features/users/userAPI";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Features/login/userSlice"; 
import UpdateProfile from "./manageAdmins/UpdateProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const user_id = user.user?.user_id;

  const { data, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(user_id ?? 0, {
    skip: !user_id,
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading profile</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md h-screen">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="flex flex-col items-center mb-4 gap-4 border border-gray-300 p-4 rounded">
            <img
              src={
                data?.image_url ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt="User Avatar"
              className="w-40 h-40 object-cover rounded-full mr-4 border-2 border-gray-400"
            />
            <div>
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
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              className="btn btn-primary flex mx-auto"
              onClick={() => {
                (document.getElementById("update_profile_modal") as HTMLDialogElement)?.showModal();
              }}
            >
              Update Profile
            </button>

            <button
              className="btn btn-error flex mx-auto"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {data && <UpdateProfile user={data} refetch={refetch} />}
    </div>
  );
};

export default Profile;
