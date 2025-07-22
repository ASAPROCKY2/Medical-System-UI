import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "../../../../Features/payments/paymentsAPI";


type CreatePaymentProps = {
  appointmentId: number | null;
};

const CreatePayment = ({ appointmentId }: CreatePaymentProps) => {
  const [createPayment, { isLoading }] = useCreatePaymentMutation({
    fixedCacheKey: "createPayment",
  });

  
  const [formData, setFormData] = useState<{
    appointment_id: string;
    amount: string;
    payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled";
    transaction_id: string;
    payment_date: string;
  }>({
    appointment_id: "",
    amount: "",
    payment_status: "pending",
    transaction_id: "",
    payment_date: "",
  });

  useEffect(() => {
    if (appointmentId !== null) {
      setFormData((prev) => ({ ...prev, appointment_id: appointmentId.toString() }));
    }
  }, [appointmentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.appointment_id || !formData.amount) {
      toast.error("Appointment ID and Amount are required.");
      return;
    }

    try {
      await createPayment({
        appointment_id: Number(formData.appointment_id),
        amount: Number(formData.amount),
        payment_status: formData.payment_status,
        transaction_id: formData.transaction_id || null,
        payment_date: formData.payment_date || null,
      }).unwrap();

      toast.success("Payment created successfully!");
      (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close();

      setFormData({
        appointment_id: "",
        amount: "",
        payment_status: "pending",
        transaction_id: "",
        payment_date: "",
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      toast.error("Failed to create payment. Please try again.");
    }
  };

  return (
    <dialog id="create_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Create Payment</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="number"
            name="appointment_id"
            value={formData.appointment_id}
            onChange={handleChange}
            placeholder="Appointment ID"
            className="input input-bordered text-black"
            required
          />

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="input input-bordered text-black"
            required
          />

          <select
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
            className="select select-bordered text-black"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="text"
            name="transaction_id"
            value={formData.transaction_id}
            onChange={handleChange}
            placeholder="Transaction ID (optional)"
            className="input input-bordered text-black"
          />

          <input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            className="input input-bordered text-black"
          />

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
                "Create Payment"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("create_payment_modal") as HTMLDialogElement)?.close()
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

export default CreatePayment;
