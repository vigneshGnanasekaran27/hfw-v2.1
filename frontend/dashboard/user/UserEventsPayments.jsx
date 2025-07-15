import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://hfw-v2-1-backend.onrender.com/api";

export default function UserEventsPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/payments/user`, { credentials: "include" });
      const data = await res.json();
      setPayments(data);
    } catch (e) {
      setError("Failed to fetch your payments");
    }
    setLoading(false);
  }

  if (loading) return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      <span className="ml-2 text-gray-600">Loading your event payments...</span>
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
        <h3 className="text-xl font-bold mb-4 text-gray-800">Your Event Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-sm text-purple-600 font-medium">Total Events</div>
            <div className="text-2xl font-bold text-purple-700">{new Set(payments.map(p => p.event_id)).size}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-sm text-green-600 font-medium">Successful Payments</div>
            <div className="text-2xl font-bold text-green-700">{payments.filter(p => p.status === 'captured').length}</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-sm text-blue-600 font-medium">Total Amount Paid</div>
            <div className="text-2xl font-bold text-blue-700">
              ₹{payments.filter(p => p.status === 'captured').reduce((sum, p) => sum + (p.amount / 100), 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-700">Payment History</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4 text-gray-600 font-semibold">Event</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Amount</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Status</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Reference</th>
                <th className="py-3 px-4 text-gray-600 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map(payment => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-800">{payment.event?.title || payment.event_id}</div>
                    <div className="text-sm text-gray-500">{payment.event?.date}</div>
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
          {payments.length === 0 && (
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
