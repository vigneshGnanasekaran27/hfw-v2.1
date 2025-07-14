import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api";

export default function AdminPaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/payments`, { credentials: "include" });
      const data = await res.json();
      setPayments(data);
    } catch (e) {
      setError("Failed to fetch payments");
    }
    setLoading(false);
  }

  // Calculate summary statistics
  const totalAmount = payments
    .filter(p => p.status === "captured")
    .reduce((sum, p) => sum + (p.amount / 100), 0);
  
  const successfulPayments = payments.filter(p => p.status === "captured").length;
  const failedPayments = payments.filter(p => p.status === "failed").length;
  const pendingPayments = payments.filter(p => !["captured", "failed"].includes(p.status)).length;

  // Filter payments based on selected status
  const filteredPayments = selectedStatus === "all" 
    ? payments 
    : payments.filter(p => p.status === selectedStatus);

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <span className="ml-2 text-gray-600">Loading payments data...</span>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center text-red-600">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </div>
    </div>
  );

  return (
    <div className="mt-8 space-y-6">
      {/* Header and Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Payment Overview</h3>
          <button 
            onClick={fetchPayments} 
            className="text-purple-600 hover:text-purple-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-purple-600 font-medium">Total Revenue</div>
            <div className="text-2xl font-bold text-purple-700">₹{totalAmount.toLocaleString('en-IN')}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-sm text-green-600 font-medium">Successful</div>
            <div className="text-2xl font-bold text-green-700">{successfulPayments}</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="text-sm text-red-600 font-medium">Failed</div>
            <div className="text-2xl font-bold text-red-700">{failedPayments}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="text-sm text-yellow-600 font-medium">Pending</div>
            <div className="text-2xl font-bold text-yellow-700">{pendingPayments}</div>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-700">Payment History</h4>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="captured">Successful</option>
            <option value="failed">Failed</option>
            <option value="created">Pending</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4 text-gray-600 font-semibold">User</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Event</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Amount</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Status</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Reference</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{payment.user?.email || payment.user_id}</div>
                    <div className="text-sm text-gray-500">{payment.user?.name || 'Unknown'}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{payment.event?.title || payment.event_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">₹{(payment.amount / 100).toLocaleString('en-IN')}</div>
                  </td>
                  <td className="py-3 px-4">
                    {payment.status === "captured" && (
                      <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Successful
                      </span>
                    )}
                    {payment.status === "failed" && (
                      <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Failed
                      </span>
                    )}
                    {payment.status === "created" && (
                      <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                        <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-mono text-sm text-gray-600">{payment.razorpay_payment_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">
                      {new Date(payment.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2">No payments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
