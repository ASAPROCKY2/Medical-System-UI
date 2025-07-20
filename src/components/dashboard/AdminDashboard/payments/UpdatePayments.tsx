// src/components/dashboard/AdminDashboard/payments/UpdatePayment.tsx
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { paymentsAPI, type TPayment } from "../../../../Features/payments/paymentsAPI";

type UpdatePaymentProps = {
  payment: TPayment | null;
};

type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "cancelled";

const UpdatePayment = ({ payment }: UpdatePaymentProps) => {
  const [updatePayment, { isLoading }] = paymentsAPI.useUpdatePaymentMutation({
    fixedCacheKey: "updatePayment",
  });

  const [formData, setFormData] = useState<{
    appointment_id: string;
    amount: string;
    payment_status: PaymentStatus;
    transaction_id: string;
    payment_date: string;
  }>({
    appointment_id: "",
    amount: "",
    payment_status: "pending",
    transaction_id: "",
    payment_date: "",
  });

  // Load data into form when a payment is selected
  useEffect(() => {
    if (payment) {
      setFormData({
        appointment_id: payment.appointment_id.toString(),
        amount: payment.amount.toString(),
        payment_status: payment.payment_status,
        transaction_id: payment.transaction_id || "",
        payment_date: payment.payment_date || "",
      });
    }
  }, [payment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "payment_status"
          ? (value as PaymentStatus)
          : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      if (!payment) {
        toast.error("No payment selected for update.");
        return;
      }

      await updatePayment({
        id: payment.payment_id,
        appointment_id: Number(formData.appointment_id),
        amount: parseFloat(formData.amount),
        payment_status: formData.payment_status,
        transaction_id: formData.transaction_id || undefined,
        payment_date: formData.payment_date || undefined,
      }).unwrap();

      toast.success("Payment updated successfully!");
      (document.getElementById("update_payment_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment. Please try again.");
    }
  };

  return (
    <dialog id="update_payment_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-600 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Payment</h3>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
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
            step="0.01"
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
                  <span className="loading loading-spinner text-primary" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() =>
                (document.getElementById("update_payment_modal") as HTMLDialogElement)?.close()
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

export default UpdatePayment;
