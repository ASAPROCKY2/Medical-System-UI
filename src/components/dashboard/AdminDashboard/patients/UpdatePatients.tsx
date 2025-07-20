// src/components/dashboard/AdminDashboard/users/UpdateUser.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usersAPI, type TUser } from "../../../../Features/users/userAPI";

type UpdateUserProps = {
  user: TUser | null;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
  const [updateUser, { isLoading }] = usersAPI.useUpdateUserMutation({
    fixedCacheKey: "updateUser",
  });

  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    contactPhone: string;
    address: string;
    role: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    contactPhone: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        contactPhone: user.contactPhone || "",
        address: user.address || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!user) {
        toast.error("No user selected for update.");
        return;
      }

      await updateUser({
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contactPhone: formData.contactPhone,
        address: formData.address,
        role: formData.role,
      }).unwrap();

      toast.success("User updated successfully!");
      (document.getElementById("update_user_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <dialog id="update_user_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update User</h3>

        <form className="flex flex-col gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered"
            value={formData.firstName}
            onChange={handleChange}
          />

          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered"
            value={formData.lastName}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            name="contactPhone"
            type="text"
            placeholder="Contact Phone"
            className="input input-bordered"
            value={formData.contactPhone}
            onChange={handleChange}
          />

          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered"
            value={formData.address}
            onChange={handleChange}
          />

          <select
            name="role"
            className="select select-bordered"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="user">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </form>

        <div className="modal-action flex gap-4 mt-6">
          <button
            className="btn btn-primary"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" /> Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() =>
              (document.getElementById("update_user_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateUser;
