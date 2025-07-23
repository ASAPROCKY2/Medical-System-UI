import { useState } from "react";
import { toast } from "sonner";
import { complaintsAPI } from "../../../../Features/complaints/complaintsAPI";

type CreateComplaintProps = {
  userId: number;
  doctorId: number;
  appointmentId: number;
};

const CreateComplaint = ({ userId, doctorId, appointmentId }: CreateComplaintProps) => {
  // Local state for form fields
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // Hook for creating complaint
  const [createComplaint, { isLoading }] = complaintsAPI.useCreateComplaintMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject.trim()) {
      toast.error("Subject is required");
      return;
    }

    try {
      await createComplaint({
        user_id: userId,
        doctor_id: doctorId,
        related_appointment_id: appointmentId,
        subject: subject.trim(),
        description: description.trim(),
        status: "Open",
      }).unwrap();

      toast.success("Complaint submitted successfully");

      // Reset form
      setSubject("");
      setDescription("");

      // Close modal
      (
        document.getElementById("create_complaint_modal") as HTMLDialogElement
      )?.close();
    } catch (err) {
      console.error("Error creating complaint:", err);
      toast.error("Failed to submit complaint");
    }
  };

  return (
    <dialog id="create_complaint_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-white text-gray-800 w-full max-w-lg mx-auto rounded-xl">
        <h3 className="font-bold text-lg mb-4">Create Complaint</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input input-bordered w-full"
              placeholder="e.g. Late doctor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Describe your issue in detail..."
            />
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Complaint"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (
                  document.getElementById(
                    "create_complaint_modal"
                  ) as HTMLDialogElement
                )?.close()
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

export default CreateComplaint;
