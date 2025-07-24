// src/components/dashboard/AdminDashboard/doctors/UpdateDoctor.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { doctorsAPI, type TDoctor } from "../../../../Features/doctor/doctorAPI";

type UpdateDoctorProps = {
  doctor: TDoctor | null;
};

const UpdateDoctor = ({ doctor }: UpdateDoctorProps) => {
  const [updateDoctor, { isLoading }] = doctorsAPI.useUpdateDoctorMutation({
    fixedCacheKey: "updateDoctor",
  });

  const [formData, setFormData] = useState<{
    first_name: string;
    last_name: string;
    specialization: string;
    contact_phone: string;
    available_days: string;
    image_url: string;
  }>({
    first_name: "",
    last_name: "",
    specialization: "",
    contact_phone: "",
    available_days: "",
    image_url: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        first_name: doctor.first_name || "",
        last_name: doctor.last_name || "",
        specialization: doctor.specialization || "",
        contact_phone: doctor.contact_phone || "",
        available_days: doctor.available_days || "",
        image_url: doctor.image_url || "",
      });
    }
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!doctor) {
        toast.error("No doctor selected for update.");
        return;
      }

      await updateDoctor({
        doctor_id: doctor.doctor_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        specialization: formData.specialization || undefined,
        contact_phone: formData.contact_phone || undefined,
        available_days: formData.available_days || undefined,
        image_url: formData.image_url || undefined,
      });

      toast.success("Doctor updated successfully!");
      (
        document.getElementById("update_doctor_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating doctor:", error);
      toast.error("Failed to update doctor. Please try again.");
    }
  };

  return (
    <dialog id="update_doctor_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Doctor</h3>

        <form className="flex flex-col gap-4">
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            className="input input-bordered"
            value={formData.first_name}
            onChange={handleChange}
          />

          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            className="input input-bordered"
            value={formData.last_name}
            onChange={handleChange}
          />

          <input
            name="specialization"
            type="text"
            placeholder="Specialization"
            className="input input-bordered"
            value={formData.specialization}
            onChange={handleChange}
          />

          <input
            name="contact_phone"
            type="text"
            placeholder="Contact Phone"
            className="input input-bordered"
            value={formData.contact_phone}
            onChange={handleChange}
          />

          <textarea
            name="available_days"
            placeholder="Available Days (e.g. Mon, Tue, Wed)"
            className="textarea textarea-bordered"
            value={formData.available_days}
            onChange={handleChange}
          />

          <input
            name="image_url"
            type="text"
            placeholder="Image URL"
            className="input input-bordered"
            value={formData.image_url}
            onChange={handleChange}
          />
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
              (document.getElementById("update_doctor_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateDoctor;
