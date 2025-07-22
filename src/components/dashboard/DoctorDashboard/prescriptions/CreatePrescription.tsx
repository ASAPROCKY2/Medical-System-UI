// src/components/dashboard/DoctorDashboard/prescriptions/CreatePrescription.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { prescriptionsAPI } from "../../../../Features/prescriptions/prescriptionsAPI";
import type { TAppointment } from "../../../../Features/appointments/appointmentsAPI";

type CreatePrescriptionProps = {
  appointment: TAppointment | null; // pass the appointment you’re working with
  loggedInDoctorId: number; // pass the logged-in doctor’s ID
};

const CreatePrescription = ({ appointment, loggedInDoctorId }: CreatePrescriptionProps) => {
  const [createPrescription, { isLoading }] = prescriptionsAPI.useCreatePrescriptionMutation({
    fixedCacheKey: "createPrescription",
  });

  const [notes, setNotes] = useState("");

  // Reset notes when appointment changes
  useEffect(() => {
    setNotes("");
  }, [appointment]);

  const handleSubmit = async () => {
    try {
      if (!appointment) {
        toast.error("No appointment selected.");
        return;
      }

      await createPrescription({
        appointment_id: appointment.appointment_id,
        doctor_id: loggedInDoctorId,
        patient_id: appointment.user_id, // from the appointment
        notes: notes || undefined,
      }).unwrap();

      toast.success("Prescription created successfully!");
      (document.getElementById("create_prescription_modal") as HTMLDialogElement)?.close();
      setNotes("");
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Failed to create prescription. Please try again.");
    }
  };

  return (
    <dialog id="create_prescription_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Prescription</h3>

        {appointment ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Appointment ID (read-only) */}
            <input
              type="text"
              value={appointment.appointment_id}
              readOnly
              className="input input-bordered text-black bg-gray-100"
            />

            {/* Notes */}
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter prescription notes..."
              className="textarea textarea-bordered text-black"
              rows={4}
              required
            />

            <div className="modal-action flex gap-4 mt-6">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner text-primary" /> Saving...
                  </>
                ) : (
                  "Create Prescription"
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (document.getElementById("create_prescription_modal") as HTMLDialogElement)?.close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-red-300">No appointment selected.</p>
        )}
      </div>
    </dialog>
  );
};

export default CreatePrescription;
