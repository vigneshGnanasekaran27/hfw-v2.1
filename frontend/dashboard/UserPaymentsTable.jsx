import React, { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://hfw-v2-1-backend.onrender.com/api";

export default function UserPaymentsTable() {
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

  if (loading) return <div>Loading your payments...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-2">Your Event Payments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Razorpay Payment ID</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-b">
                <td className="p-2 border">{payment.event?.title || payment.event_id}</td>
                <td className="p-2 border">₹{payment.amount / 100}</td>
                <td className="p-2 border">{payment.status}</td>
                <td className="p-2 border">{payment.razorpay_payment_id}</td>
                <td className="p-2 border">{new Date(payment.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
