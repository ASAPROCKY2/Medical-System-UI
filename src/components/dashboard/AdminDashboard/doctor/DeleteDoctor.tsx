import { toast } from "sonner";
import { doctorsAPI, type TDoctor } from "../../../../Features/doctor/doctorAPI";

type DeleteDoctorProps = {
  doctor: TDoctor | null;
};

const DeleteDoctor = ({ doctor }: DeleteDoctorProps) => {
  const [deleteDoctor, { isLoading }] = doctorsAPI.useDeleteDoctorMutation({
    fixedCacheKey: "deleteDoctor",
  });

  const handleDelete = async () => {
    try {
      if (!doctor) {
        toast.error("No doctor selected for deletion.");
        return;
      }

      await deleteDoctor(doctor.doctor_id).unwrap();
      toast.success("Doctor deleted successfully!");

      (document.getElementById("delete_doctor_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor. Please try again.");
    }
  };

  return (
    <dialog id="delete_doctor_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Doctor</h3>
        <p className="mb-6">
          Are you sure you want to delete doctor{" "}
          <span className="font-semibold">
            {doctor ? `${doctor.first_name} ${doctor.last_name}` : ""}
          </span>
          ?
        </p>
        <div className="modal-action flex gap-4">
          <button className="btn btn-error" onClick={handleDelete} disabled={isLoading}>
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
              (document.getElementById("delete_doctor_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteDoctor;
