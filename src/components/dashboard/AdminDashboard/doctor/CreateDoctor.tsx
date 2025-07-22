import { useState } from "react";
import { toast } from "sonner";
import { useCreateDoctorMutation } from "../../../../Features/doctor/doctorAPI";

const CreateDoctor = () => {
  const [createDoctor, { isLoading }] = useCreateDoctorMutation({
    fixedCacheKey: "createDoctor",
  });

  const [formData, setFormData] = useState<{
    user_id: string;
    first_name: string;
    last_name: string;
    specialization: string;
    contact_phone: string;
    available_days: string;
  }>({
    user_id: "",
    first_name: "",
    last_name: "",
    specialization: "",
    contact_phone: "",
    available_days: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!formData.user_id || !formData.first_name || !formData.last_name) {
        toast.error("User ID, First Name and Last Name are required.");
        return;
      }

      await createDoctor({
        user_id: Number(formData.user_id),
        first_name: formData.first_name,
        last_name: formData.last_name,
        specialization: formData.specialization || undefined,
        contact_phone: formData.contact_phone || undefined,
        available_days: formData.available_days || undefined,
      }).unwrap();

      toast.success("Doctor created successfully!");
      (document.getElementById("create_doctor_modal") as HTMLDialogElement)?.close();
      setFormData({
        user_id: "",
        first_name: "",
        last_name: "",
        specialization: "",
        contact_phone: "",
        available_days: "",
      });
    } catch (error) {
      console.error("Error creating doctor:", error);
      toast.error("Failed to create doctor. Please try again.");
    }
  };

  return (
    <dialog id="create_doctor_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Doctor</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            placeholder="User ID (must exist in Users table)"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization (optional)"
            className="input input-bordered text-black"
          />

          <input
            type="text"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            placeholder="Contact Phone (optional)"
            className="input input-bordered text-black"
          />

          <input
            type="text"
            name="available_days"
            value={formData.available_days}
            onChange={handleChange}
            placeholder="Available Days (e.g. Mon,Tue,Wed)"
            className="input input-bordered text-black"
          />

          <div className="modal-action flex gap-4 mt-6">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner text-primary" /> Saving...
                </>
              ) : (
                "Create Doctor"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("create_doctor_modal") as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default CreateDoctor;
