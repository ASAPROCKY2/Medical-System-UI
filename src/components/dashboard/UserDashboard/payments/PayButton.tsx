import { useState } from "react";

type PayButtonProps = {
  appointmentId: number;
  amount: number;
  userId: number;
};

export default function PayButton({ appointmentId, amount, userId }: PayButtonProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    if (!phoneNumber.trim()) {
      setMessage("Please enter your M-Pesa phone number.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: appointmentId,
          user_id: userId,
          phoneNumber: phoneNumber.trim(),
          amount: amount,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setMessage(`✅ ${data.CustomerMessage || "STK Push sent. Check your phone."}`);
    } catch (error: any) {
      console.error("Payment error:", error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-blue-200 rounded-md shadow-sm space-y-3 max-w-sm bg-blue-50">
      <p className="text-blue-900 font-semibold">
        Pay Appointment
      </p>
      <p className="text-blue-800">Amount: KES {amount.toFixed(2)}</p>

      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Enter M-Pesa phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? "Processing…" : "Pay Now"}
      </button>

      {message && (
        <p className="text-sm mt-2 text-blue-800 whitespace-pre-line">{message}</p>
      )}
    </div>
  );
}
