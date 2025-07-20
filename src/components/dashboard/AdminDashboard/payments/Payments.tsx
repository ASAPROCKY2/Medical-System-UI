// src/components/dashboard/AdminDashboard/payments/Payments.tsx
import { useState } from "react";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { paymentsAPI, type TPayment } from "../../../../Features/payments/paymentsAPI";
import { Skeleton } from "../../../../components/ui/skeleton";
import UpdatePayment from "./UpdatePayments";
import DeletePayment from "./DeletePayments";

const Payments = () => {
  const {
    data: paymentsData,
    isLoading,
    error,
  } = paymentsAPI.useGetPaymentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [selectedPayment, setSelectedPayment] = useState<TPayment | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<TPayment | null>(null);

  const handleEdit = (payment: TPayment) => {
    setSelectedPayment(payment);
    (document.getElementById("update_payment_modal") as HTMLDialogElement)?.showModal();
  };

  const handleDelete = (payment: TPayment) => {
    setPaymentToDelete(payment);
    (document.getElementById("delete_payment_modal") as HTMLDialogElement)?.showModal();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Modals */}
      <UpdatePayment payment={selectedPayment} />
      <DeletePayment payment={paymentToDelete} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaMoneyBillWave className="mr-3 text-green-600 text-3xl" />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Payments Management
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all payments recorded in the system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <p className="text-xs text-green-500">Total Payments</p>
            <p className="text-xl font-bold text-green-700">
              {paymentsData?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          <h4 className="font-medium">Failed to load payments</h4>
          <p className="text-sm mt-1">Please check your connection and try again.</p>
        </div>
      )}

      {/* Payments List */}
      {paymentsData && paymentsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentsData.map((pay) => (
            <div
              key={pay.payment_id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:border-green-200"
            >
              <div className="bg-gradient-to-r from-green-50 to-gray-50 p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">
                    Payment #{pay.payment_id}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      pay.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : pay.payment_status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : pay.payment_status === "failed"
                        ? "bg-red-100 text-red-700"
                        : pay.payment_status === "refunded"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pay.payment_status}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Appointment ID</p>
                  <p className="text-sm font-medium">{pay.appointment_id}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="text-sm font-medium">${pay.amount}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Transaction ID</p>
                  <p className="text-sm font-medium">
                    {pay.transaction_id || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Payment Date</p>
                  <p className="text-sm font-medium">
                    {pay.payment_date || "Not provided"}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(pay)}
                    className="flex items-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pay)}
                    className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <MdDeleteForever className="mr-2" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && !error && (
          <div className="text-center py-16">
            <div className="mx-auto h-32 w-32 text-gray-300">
              <FaMoneyBillWave size={128} className="opacity-20 mx-auto" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-700">
              No payments found
            </h3>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Payments will appear here once they are recorded.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Payments;
