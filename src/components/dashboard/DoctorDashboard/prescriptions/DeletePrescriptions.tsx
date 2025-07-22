// src/components/dashboard/DoctorDashboard/prescriptions/DeletePrescription.tsx

import { toast } from "sonner";
import {
  prescriptionsAPI,
  type TPrescription,
} from "../../../../Features/prescriptions/prescriptionsAPI";

type DeletePrescriptionProps = {
  prescription: TPrescription | null;
};

const DeletePrescription = ({ prescription }: DeletePrescriptionProps) => {
  // hook for delete mutation
  const [deletePrescription, { isLoading }] =
    prescriptionsAPI.useDeletePrescriptionMutation({
      fixedCacheKey: "deletePrescription",
    });

  const handleDelete = async () => {
    try {
      if (!prescription) {
        toast.error("No prescription selected for deletion.");
        return;
      }

      await deletePrescription(prescription.prescription_id).unwrap();
      toast.success("Prescription deleted successfully!");

      // close the modal
      (
        document.getElementById("delete_prescription_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Failed to delete prescription. Please try again.");
    }
  };

  return (
    <dialog id="delete_prescription_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Prescription</h3>
        <p className="mb-6">
          Are you sure you want to delete prescription{" "}
          <span className="font-semibold">#{prescription?.prescription_id}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="btn btn-error"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-primary" /> Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
          <button
            className="btn"
            type="button"
            onClick={() =>
              (
                document.getElementById(
                  "delete_prescription_modal"
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

export default DeletePrescription;
