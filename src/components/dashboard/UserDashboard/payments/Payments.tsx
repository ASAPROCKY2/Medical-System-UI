// src/dashboard/UserDashboard/payments/Payments.tsx
import { useSelector } from "react-redux";
import type { RootState } from "../../../../app/store";
import {
  paymentsAPI,
  type TPayment,
} from "../../../../Features/payments/paymentsAPI";
import { FaClipboardList } from "react-icons/fa";
import { Skeleton } from "../../../../components/ui/skeleton";

const Payments = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.user_id;

  const {
    data: paymentsData,
    isLoading,
    error,
  } = paymentsAPI.useGetPaymentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const userPayments = paymentsData?.filter((p) => p.user_id === userId) ?? [];

  if (!userId) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Payments
        </h2>
        <p className="text-gray-600">
          You are not logged in as a user, so no payments are available.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FaClipboardList className="mr-2 text-blue-600" />
          My Payments
        </h2>
        <div className="text-sm text-gray-500">
          {userPayments.length} payments found
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error fetching payments. Please try again.
        </div>
      )}

      {/* Table */}
      {userPayments.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Removed Payment ID column */}
                {/* Removed Appointment ID column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount (KES)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userPayments.map((payment: TPayment) => (
                <tr key={payment.payment_id} className="hover:bg-gray-50">
                  {/* Removed Payment ID cell */}
                  {/* Removed Appointment ID cell */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : payment.payment_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : payment.payment_status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.transaction_id || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.payment_date
                      ? new Date(payment.payment_date).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.created_at
                      ? new Date(payment.created_at).toLocaleDateString()
                      : "—"}
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
              No payments found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven’t made any payments yet.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Payments;
