import { toast } from "sonner";
import { appointmentsAPI, type TAppointmentFull } from "../../../../Features/appointments/appointmentsAPI";

type CancelAppointmentProps = {
  appointment: TAppointmentFull | null;
};

const CancelAppointment = ({ appointment }: CancelAppointmentProps) => {
  // hook for update mutation
  const [updateAppointment, { isLoading }] = appointmentsAPI.useUpdateAppointmentMutation();

  const handleCancel = async () => {
    try {
      if (!appointment) {
        toast.error("No appointment selected.");
        return;
      }

      await updateAppointment({
        appointment_id: appointment.appointment_id,
        appointment_status: "Cancelled",
      }).unwrap();

      toast.success("Appointment cancelled successfully.");

      // close modal after success
      (
        document.getElementById("cancel_appointment_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  return (
    <dialog id="cancel_appointment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-50 text-gray-800 w-full max-w-xs sm:max-w-lg mx-auto rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-4">Cancel Appointment</h3>
        <p className="mb-6">
          Are you sure you want to cancel your appointment on{" "}
          <span className="font-semibold">
            {appointment?.appointment_date
              ? new Date(appointment.appointment_date).toLocaleDateString()
              : ""}
          </span>{" "}
          at <span className="font-semibold">{appointment?.time_slot}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            onClick={handleCancel}
            disabled={isLoading}
          >
            {isLoading ? "Cancelling..." : "Yes, Cancel"}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            type="button"
            onClick={() =>
              (
                document.getElementById("cancel_appointment_modal") as HTMLDialogElement
              )?.close()
            }
          >
            No, Keep
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CancelAppointment;
