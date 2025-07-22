// src/components/dashboard/DoctorDashboard/prescriptions/UpdatePrescription.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  prescriptionsAPI,
  type TPrescription,
} from "../../../../Features/prescriptions/prescriptionsAPI";

type UpdatePrescriptionProps = {
  prescription: TPrescription | null;
};

const UpdatePrescription = ({ prescription }: UpdatePrescriptionProps) => {
  const [updatePrescription, { isLoading }] =
    prescriptionsAPI.useUpdatePrescriptionMutation({
      fixedCacheKey: "updatePrescription",
    });

  // Only one editable field here (notes). You can add more if needed.
  const [formData, setFormData] = useState<{
    notes: string;
  }>({
    notes: "",
  });

  // Prefill when a prescription is passed
  useEffect(() => {
    if (prescription) {
      setFormData({
        notes: prescription.notes || "",
      });
    }
  }, [prescription]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        notes: formData.notes,
      }).unwrap();

      toast.success("Prescription updated successfully!");
      (
        document.getElementById(
          "update_prescription_modal"
        ) as HTMLDialogElement
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
          <textarea
            name="notes"
            rows={4}
            placeholder="Write or edit notes here"
            className="textarea textarea-bordered text-black"
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
