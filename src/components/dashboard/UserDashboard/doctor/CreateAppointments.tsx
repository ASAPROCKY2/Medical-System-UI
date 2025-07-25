// src/components/dashboard/UserDashboard/appointments/CreateAppointment.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreateAppointmentMutation } from "../../../../Features/appointments/appointmentsAPI";

type CreateAppointmentProps = {
  selectedDoctorId: number | null;
  userId: number | null; 
};

const CreateAppointment = ({ selectedDoctorId, userId }: CreateAppointmentProps) => {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation({
    fixedCacheKey: "createAppointment",
  });

  const [formData, setFormData] = useState<{
    appointment_date: string;
    time_slot: string;
  }>({
    appointment_date: "",
    time_slot: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    

    if (!userId || !selectedDoctorId) {
      toast.error("Missing user or doctor information.");
      return;
    }

  
    if (!formData.appointment_date || !formData.time_slot) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await createAppointment({
        user_id: userId,
        doctor_id: selectedDoctorId,
        appointment_date: formData.appointment_date,
        time_slot: formData.time_slot,
      }).unwrap();

      toast.success("Appointment created successfully!");
      (document.getElementById("book_appointment_modal") as HTMLDialogElement)?.close();

      // reset date/time
      setFormData({
        appointment_date: "",
        time_slot: "",
      });
    } catch (err) {
      console.error("Error creating appointment:", err);
      toast.error("Failed to create appointment. Please try again.");
    }
  };

  return (
    <dialog id="book_appointment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Book Appointment</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          
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
                (document.getElementById("book_appointment_modal") as HTMLDialogElement)?.close()
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
