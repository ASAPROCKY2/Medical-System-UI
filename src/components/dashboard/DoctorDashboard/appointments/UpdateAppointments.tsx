// src/components/dashboard/DoctorDashboard/appointments/UpdateAppointment.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  appointmentsAPI,
  type TAppointment,
} from "../../../../Features/appointments/appointmentsAPI";

type UpdateAppointmentProps = {
  appointment: TAppointment | null;
};

const UpdateAppointment = ({ appointment }: UpdateAppointmentProps) => {
  const [updateAppointment, { isLoading }] =
    appointmentsAPI.useUpdateAppointmentMutation({
      fixedCacheKey: "updateAppointment",
    });

  // Form data matching your TAppointment fields you want editable
  const [formData, setFormData] = useState<{
    appointment_date: string;
    time_slot: string;
    appointment_status: "Pending" | "Completed" | "Cancelled";
    total_amount: string;
  }>({
    appointment_date: "",
    time_slot: "",
    appointment_status: "Pending",
    total_amount: "",
  });

  // Prefill when an appointment is passed
  useEffect(() => {
    if (appointment) {
      setFormData({
        appointment_date: appointment.appointment_date || "",
        time_slot: appointment.time_slot || "",
        appointment_status: appointment.appointment_status || "Pending",
        total_amount: appointment.total_amount || "",
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
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
        appointment_status: formData.appointment_status,
        total_amount: formData.total_amount,
      }).unwrap();

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
            name="appointment_date"
            type="date"
            className="input input-bordered"
            value={formData.appointment_date}
            onChange={handleChange}
          />

          <input
            name="time_slot"
            type="text"
            placeholder="Time Slot (e.g. 10:00 AM - 11:00 AM)"
            className="input input-bordered"
            value={formData.time_slot}
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

          <input
            name="total_amount"
            type="text"
            placeholder="Total Amount (optional)"
            className="input input-bordered"
            value={formData.total_amount}
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
