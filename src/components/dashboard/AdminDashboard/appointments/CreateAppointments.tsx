// src/components/dashboard/AdminDashboard/appointments/CreateAppointment.tsx
import { useState } from "react";
import { toast } from "sonner";
import { useCreateAppointmentMutation } from "../../../../Features/appointments/appointmentsAPI";

const CreateAppointment = () => {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation({
    fixedCacheKey: "createAppointment",
  });

  const [formData, setFormData] = useState<{
    user_id: string;
    doctor_id: string;
    appointment_date: string;
    time_slot: string;
    total_amount: string;
    appointment_status: "Pending" | "Confirmed" | "Cancelled";
  }>({
    user_id: "",
    doctor_id: "",
    appointment_date: "",
    time_slot: "",
    total_amount: "",
    appointment_status: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "appointment_status"
          ? (value as "Pending" | "Confirmed" | "Cancelled")
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!formData.user_id || !formData.doctor_id || !formData.appointment_date || !formData.time_slot) {
        toast.error("User ID, Doctor ID, Date, and Time Slot are required.");
        return;
      }

      await createAppointment({
        user_id: Number(formData.user_id),
        doctor_id: Number(formData.doctor_id),
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        total_amount: formData.total_amount || null,
        appointment_status: formData.appointment_status,
      }).unwrap();

      toast.success("Appointment created successfully!");
      (document.getElementById("create_appointment_modal") as HTMLDialogElement)?.close();
      setFormData({
        user_id: "",
        doctor_id: "",
        appointment_date: "",
        time_slot: "",
        total_amount: "",
        appointment_status: "Pending",
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment. Please try again.");
    }
  };

  return (
    <dialog id="create_appointment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Appointment</h3>

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
            placeholder="User ID (patient)"
            className="input input-bordered text-black"
            required
          />

          <input
            type="number"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            placeholder="Doctor ID"
            className="input input-bordered text-black"
            required
          />

          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleChange}
            placeholder="Time Slot (e.g. 10:00 AM - 11:00 AM)"
            className="input input-bordered text-black"
            required
          />

          <input
            type="text"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
            placeholder="Total Amount (optional)"
            className="input input-bordered text-black"
          />

          <select
            name="appointment_status"
            value={formData.appointment_status}
            onChange={handleChange}
            className="select select-bordered text-black"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

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
                "Create Appointment"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("create_appointment_modal") as HTMLDialogElement)?.close()
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

export default CreateAppointment;
