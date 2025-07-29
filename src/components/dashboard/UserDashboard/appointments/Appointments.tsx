// src/dashboard/UserDashboard/appointments/UserAppointments.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import { useState } from "react";
import {
  appointmentsAPI,
  type TAppointmentFull,
} from "../../../../Features/appointments/appointmentsAPI";
import { FaClipboardList } from "react-icons/fa";
import { Skeleton } from "../../../../components/ui/skeleton";
import CancelAppointment from "./DeleteAppointments";
import CreateComplaint from "./CreateComplaint";

const API_BASE_URL = "http://localhost:8081";

const UserAppointments = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.user_id;

  const [selectedAppointment, setSelectedAppointment] = useState<TAppointmentFull | null>(null);
  const [payAppointment, setPayAppointment] = useState<TAppointmentFull | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [payMessage, setPayMessage] = useState("");

  const {
    data: appointmentsData,
    isLoading,
    error,
  } = appointmentsAPI.useGetAppointmentsByUserQuery(userId!, {
    skip: !userId,
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const openCancelModal = (appt: TAppointmentFull) => {
    setSelectedAppointment(appt);
    (document.getElementById("cancel_appointment_modal") as HTMLDialogElement)?.showModal();
  };

  const openComplaintModal = (appt: TAppointmentFull) => {
    setSelectedAppointment(appt);
    (document.getElementById("create_complaint_modal") as HTMLDialogElement)?.showModal();
  };

  const openPayModal = (appt: TAppointmentFull) => {
    setPayAppointment(appt);
    setPhoneNumber("");
    setPayMessage("");
    (document.getElementById("pay_modal") as HTMLDialogElement)?.showModal();
  };

  const handlePay = async () => {
    if (!payAppointment || !phoneNumber.trim()) {
      setPayMessage("Please enter your M-Pesa phone number.");
      return;
    }
    setPayLoading(true);
    setPayMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/payments/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: payAppointment.appointment_id,
          user_id: userId,
          phoneNumber: phoneNumber.trim(),
          amount: payAppointment.total_amount,
        }),
      });

      const text = await res.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) throw new Error(data.error || "Failed to initiate payment.");
      setPayMessage(` ${data.CustomerMessage || "STK Push sent. Check your phone."}`);
    } catch (err: any) {
      setPayMessage(` ${err.message}`);
    } finally {
      setPayLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Appointments
        </h2>
        <p className="text-gray-600">
          You are not logged in as a user, so no appointments are available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <CancelAppointment appointment={selectedAppointment} />
      <CreateComplaint
        userId={userId}
        doctorId={selectedAppointment?.doctor_id ?? 0}
        appointmentId={selectedAppointment?.appointment_id ?? 0}
      />

      {/* Payment Modal with Pale Blue Theme */}
      <dialog id="pay_modal" className="modal">
        <form method="dialog" className="modal-box space-y-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-md shadow">
          <h3 className="font-bold text-lg">Pay Appointment</h3>
          <p className="text-blue-800">
            Amount: KES {payAppointment?.total_amount ?? "0.00"}
          </p>

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter M-Pesa phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {payMessage && <p className="text-sm">{payMessage}</p>}

          <div className="modal-action">
            <button className="btn" disabled={payLoading}>Close</button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handlePay}
              disabled={payLoading}
            >
              {payLoading ? "Processing…" : "Pay Now"}
            </button>
          </div>
        </form>
      </dialog>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Appointments
        </h2>
        <div className="text-sm text-gray-500">
          {appointmentsData?.length || 0} appointments found
        </div>
      </div>

      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error fetching appointments. Please try again.
        </div>
      )}

      {appointmentsData && appointmentsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (KES)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointmentsData.map((appt) => (
                <tr key={appt.appointment_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(appt.appointment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{appt.time_slot}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{appt.doctor_name ?? "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{appt.total_amount ?? "0.00"}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        appt.appointment_status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : appt.appointment_status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {appt.appointment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    {appt.appointment_status === "Pending" && (
                      <>
                        <button
                          onClick={() => openCancelModal(appt)}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => openPayModal(appt)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => openComplaintModal(appt)}
                      className="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Complain
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-12">
            <FaClipboardList size={96} className="mx-auto text-gray-300" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No appointments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You don’t have any appointments yet.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UserAppointments;
