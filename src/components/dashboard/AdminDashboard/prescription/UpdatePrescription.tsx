// src/components/dashboard/AdminDashboard/prescriptions/UpdatePrescription.tsx

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { prescriptionsAPI, type TPrescription } from "../../../../Features/prescriptions/prescriptionsAPI";

type UpdatePrescriptionProps = {
  prescription: TPrescription | null;
};

const UpdatePrescription = ({ prescription }: UpdatePrescriptionProps) => {
  const [updatePrescription, { isLoading }] =
    prescriptionsAPI.useUpdatePrescriptionMutation({
      fixedCacheKey: "updatePrescription",
    });

  // Match your DB schema fields
  const [formData, setFormData] = useState<{
    appointment_id: string;
    doctor_id: string;
    patient_id: string;
    notes: string;
  }>({
    appointment_id: "",
    doctor_id: "",
    patient_id: "",
    notes: "",
  });

  useEffect(() => {
    if (prescription) {
      setFormData({
        appointment_id: prescription.appointment_id.toString(),
        doctor_id: prescription.doctor_id.toString(),
        patient_id: prescription.patient_id.toString(),
        notes: prescription.notes || "",
      });
    }
  }, [prescription]);

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
      if (!prescription) {
        toast.error("No prescription selected for update.");
        return;
      }

      await updatePrescription({
        prescription_id: prescription.prescription_id,
        appointment_id: Number(formData.appointment_id),
        doctor_id: Number(formData.doctor_id),
        patient_id: Number(formData.patient_id),
        notes: formData.notes,
      }).unwrap();

      toast.success("Prescription updated successfully!");
      (
        document.getElementById("update_prescription_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating prescription:", error);
      toast.error("Failed to update prescription. Please try again.");
    }
  };

  return (
    <dialog id="update_prescription_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Prescription</h3>

        <form className="flex flex-col gap-4">
          <input
            name="appointment_id"
            type="number"
            placeholder="Appointment ID"
            className="input input-bordered"
            value={formData.appointment_id}
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
            name="patient_id"
            type="number"
            placeholder="Patient ID"
            className="input input-bordered"
            value={formData.patient_id}
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            className="textarea textarea-bordered"
            value={formData.notes}
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
                  "update_prescription_modal"
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

export default UpdatePrescription;
