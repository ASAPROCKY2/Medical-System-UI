// src/components/dashboard/AdminDashboard/complaints/UpdateComplaint.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { complaintsAPI, type TComplaint } from "../../../../Features/complaints/complaintsAPI";

type UpdateComplaintProps = {
  complaint: TComplaint | null;
};

const UpdateComplaint = ({ complaint }: UpdateComplaintProps) => {
  const [updateComplaint, { isLoading }] = complaintsAPI.useUpdateComplaintMutation({
    fixedCacheKey: "updateComplaint",
  });

  const [formData, setFormData] = useState<{
    user_id: string;
    doctor_id: string;
    related_appointment_id: string;
    subject: string;
    description: string;
    status: "Open" | "In Progress" | "Resolved" | "Closed";
  }>({
    user_id: "",
    doctor_id: "",
    related_appointment_id: "",
    subject: "",
    description: "",
    status: "Open",
  });

  useEffect(() => {
    if (complaint) {
      setFormData({
        user_id: complaint.user_id.toString(),
        doctor_id: complaint.doctor_id?.toString() || "",
        related_appointment_id: complaint.related_appointment_id?.toString() || "",
        subject: complaint.subject || "",
        description: complaint.description || "",
        status: complaint.status,
      });
    }
  }, [complaint]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!complaint) {
        toast.error("No complaint selected for update.");
        return;
      }

      await updateComplaint({
        complaint_id: complaint.complaint_id,
        user_id: Number(formData.user_id),
        doctor_id: formData.doctor_id ? Number(formData.doctor_id) : undefined,
        related_appointment_id: formData.related_appointment_id
          ? Number(formData.related_appointment_id)
          : undefined,
        subject: formData.subject,
        description: formData.description,
        status: formData.status,
      });

      toast.success("Complaint updated successfully!");
      (
        document.getElementById("update_complaint_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error updating complaint:", error);
      toast.error("Failed to update complaint. Please try again.");
    }
  };

  return (
    <dialog id="update_complaint_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Complaint</h3>

        <form className="flex flex-col gap-4">
          <input
            name="user_id"
            type="number"
            placeholder="User ID"
            className="input input-bordered"
            value={formData.user_id}
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
            name="related_appointment_id"
            type="number"
            placeholder="Related Appointment ID"
            className="input input-bordered"
            value={formData.related_appointment_id}
            onChange={handleChange}
          />

          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="input input-bordered"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="status"
            className="select select-bordered"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
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
                  "update_complaint_modal"
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

export default UpdateComplaint;
