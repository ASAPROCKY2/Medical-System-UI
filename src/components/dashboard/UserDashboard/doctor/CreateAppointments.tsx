import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useCreateAppointmentMutation } from "../../../../Features/appointments/appointmentsAPI";

type CreateAppointmentProps = {
  selectedDoctorId: number | null;
  userId: number | null;
};

const doctorInfoMap: Record<number, { name: string; specialization: string }> = {
  1: { name: "Dr. Michael Njoroge", specialization: "General Medicine" },
  2: { name: "Dr. Grace Mwende", specialization: "Pediatrics" },
  3: { name: "Dr. James Ouma", specialization: "Dermatology" },
  4: { name: "Dr. Susan Kariuki", specialization: "Cardiology" },
  5: { name: "Dr. Peter Mulei", specialization: "Orthopedics" },
  6: { name: "Dr. Jack Rhan", specialization: "General Medicine" },
  7: { name: "Dr. John Baraka", specialization: "Psychiatrist" },
  8: { name: "Dr. Steve Harver", specialization: "Urologist" },
};

const feeMap: Record<string, string> = {
  "General Medicine": "1000",
  Pediatrics: "1200",
  Dermatology: "1300",
  Cardiology: "2000",
  Orthopedics: "1800",
  Psychiatrist: "5",
  Urologist: "5",
};

const CreateAppointment = ({ selectedDoctorId, userId }: CreateAppointmentProps) => {
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation({
    fixedCacheKey: "createAppointment",
  });

  const [formData, setFormData] = useState({
    appointment_date: "",
    start_time: "",
    end_time: "",
  });

  const doctorSpecialization = useMemo(() => {
    if (selectedDoctorId && doctorInfoMap[selectedDoctorId]) {
      return doctorInfoMap[selectedDoctorId].specialization;
    }
    return null;
  }, [selectedDoctorId]);

  const estimatedFee = doctorSpecialization ? feeMap[doctorSpecialization] || "5" : null;

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

    if (!formData.appointment_date || !formData.start_time || !formData.end_time) {
      toast.error("All fields are required.");
      return;
    }

    const timeSlot = `${formData.start_time} - ${formData.end_time}`;

    try {
      await createAppointment({
        user_id: userId,
        doctor_id: selectedDoctorId,
        appointment_date: formData.appointment_date,
        time_slot: timeSlot,
      }).unwrap();

      toast.success("Appointment created successfully!");
      (document.getElementById("book_appointment_modal") as HTMLDialogElement)?.close();

      setFormData({
        appointment_date: "",
        start_time: "",
        end_time: "",
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

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm block mb-1">Start Time</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="input input-bordered text-black w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm block mb-1">End Time</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="input input-bordered text-black w-full"
                required
              />
            </div>
          </div>

          {doctorSpecialization && (
            <div className="text-sm text-gray-200">
              <strong>Specialization:</strong> {doctorSpecialization}
              <br />
              <strong>Total fee:</strong> KES {estimatedFee || "5"}
            </div>
          )}

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
