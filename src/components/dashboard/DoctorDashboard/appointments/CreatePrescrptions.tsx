// src/components/dashboard/DoctorDashboard/prescriptions/CreatePrescription.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreatePrescriptionMutation } from "../../../../Features/prescriptions/prescriptionsAPI";

type CreatePrescriptionProps = {
  appointmentId: number | null;
  doctorId: number;
  patientId: number | null;
};

const CreatePrescription = ({ appointmentId, doctorId, patientId }: CreatePrescriptionProps) => {
  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation({
    fixedCacheKey: "createPrescription",
  });

  // keep IDs in state but don't show them
  const [formData, setFormData] = useState({
    appointment_id: "",
    doctor_id: doctorId.toString(),
    patient_id: "",
    notes: "",
  });

  useEffect(() => {
    if (appointmentId !== null) {
      setFormData(prev => ({
        ...prev,
        appointment_id: appointmentId.toString(),
      }));
    }
  }, [appointmentId]);

  useEffect(() => {
    if (patientId !== null) {
      setFormData(prev => ({
        ...prev,
        patient_id: patientId.toString(),
      }));
    }
  }, [patientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.appointment_id ||
      !formData.doctor_id ||
      !formData.patient_id ||
      !formData.notes
    ) {
      toast.error("Notes are required.");
      return;
    }

    try {
      await createPrescription({
        appointment_id: Number(formData.appointment_id),
        doctor_id: Number(formData.doctor_id),
        patient_id: Number(formData.patient_id),
        notes: formData.notes,
      }).unwrap();

      toast.success("Prescription created successfully!");
      (document.getElementById("create_prescription_modal") as HTMLDialogElement)?.close();

      setFormData({
        appointment_id: "",
        doctor_id: doctorId.toString(),
        patient_id: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error creating prescription:", err);
      toast.error("Failed to create prescription. Please try again.");
    }
  };

  return (
    <dialog id="create_prescription_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Prescription</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Hidden ID fields */}
          <input type="hidden" name="appointment_id" value={formData.appointment_id} />
          <input type="hidden" name="doctor_id" value={formData.doctor_id} />
          <input type="hidden" name="patient_id" value={formData.patient_id} />

          {/* Only visible field is notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Prescription notes"
            className="textarea textarea-bordered text-black"
            rows={3}
            required
          />

          <div className="modal-action flex gap-4 mt-6">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Saving..." : "Create Prescription"}
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
      </div>
    </dialog>
  );
};

export default CreatePrescription;
