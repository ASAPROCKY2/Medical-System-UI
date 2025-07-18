// src/components/dashboard/AdminDashboard/appointments/UpdateAppointment.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { appointmentsAPI, type TAppointment } from "../../../../Features/appointments/appointmentsAPI";

type UpdateAppointmentProps = {
  appointment: TAppointment | null;
};

const UpdateAppointment = ({ appointment }: UpdateAppointmentProps) => {
  const [updateAppointment, { isLoading }] =
    appointmentsAPI.useUpdateAppointmentMutation({
      fixedCacheKey: "updateAppointment",
    });

  // Ensure types match your DB
  const [formData, setFormData] = useState<{
    user_id: string;
    doctor_id: string;
    appointment_date: string;
    time_slot: string;
    total_amount: string;
    appointment_status: "Pending" | "Completed" | "Cancelled";
  }>({
    user_id: "",
    doctor_id: "",
    appointment_date: "",
    time_slot: "",
    total_amount: "",
    appointment_status: "Pending",
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        user_id: appointment.user_id.toString(),
        doctor_id: appointment.doctor_id.toString(),
        appointment_date: appointment.appointment_date.slice(0, 10),
        time_slot: appointment.time_slot,
        total_amount: appointment.total_amount?.toString() || "",
        appointment_status: appointment.appointment_status,
      });
    }
  }, [appointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!appointment) {
        toast.error("No appointment selected for update.");
        return;
      }

     
      await updateAppointment({
        appointment_id: appointment.appointment_id,
        user_id: Number(formData.user_id),
        doctor_id: Number(formData.doctor_id),
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        total_amount: formData.total_amount || undefined,
        appointment_status: formData.appointment_status,
      });

      toast.success("Appointment updated successfully!");
      (
        document.getElementById(
          "update_appointment_modal"
        ) as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment. Please try again.");
    }
  };

  return (
    <dialog id="update_appointment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Appointment</h3>

        <form className="flex flex-col gap-4">
          <input
            name="user_id"
            type="number"
            placeholder="User ID"
            className="input input-bordered"
            value={formData.user_id}
            onChange={handleChange}
          />

          <input
            name="doctor_id"
            type="number"
            placeholder="Doctor ID"
            className="input input-bordered"
            value={formData.doctor_id}
            onChange={handleChange}
          />

          <input
            name="appointment_date"
            type="date"
            className="input input-bordered"
            value={formData.appointment_date}
            onChange={handleChange}
          />

          <input
            name="time_slot"
            type="text"
            placeholder="Time Slot"
            className="input input-bordered"
            value={formData.time_slot}
            onChange={handleChange}
          />

          <input
            name="total_amount"
            type="number"
            step="0.01"
            placeholder="Total Amount"
            className="input input-bordered"
            value={formData.total_amount}
            onChange={handleChange}
          />

          <select
            name="appointment_status"
            className="select select-bordered"
            value={formData.appointment_status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
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
              (
                document.getElementById(
                  "update_appointment_modal"
                ) as HTMLDialogElement
              )?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateAppointment;
