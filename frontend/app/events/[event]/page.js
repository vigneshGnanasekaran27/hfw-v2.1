"use client";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useParams } from "next/navigation";
import { useState } from "react";

// Dummy event data (should be replaced with a shared data source or API in real app)
const eventData = {
  all: [
    {
      title: "City Marathon",
      description:
        "Join the annual city marathon and challenge your endurance.",
      type: "Run",
      level: "Intermediate",
      location: "City",
      paid: true,
      amount: 500,
      image: "/events/marathon.jpg",
      date: "2025-07-10",
    },
    {
      title: "Cycling Tour",
      description: "Explore scenic routes with our group cycling event.",
      type: "Cycling",
      level: "Beginner",
      location: "Park",
      paid: false,
      image: "/events/cycling.jpg",
      date: "2025-07-12",
    },
    {
      title: "Mountain Trekking",
      description: "Experience adventure with a guided mountain trek.",
      type: "Trekking",
      level: "Advanced",
      location: "Mountain",
      paid: true,
      amount: 1200,
      image: "/events/trekking.jpg",
      date: "2025-07-20",
    },
    {
      title: "Trail Running",
      description: "Run through beautiful trails and forests.",
      type: "Run",
      level: "Beginner",
      location: "Forest",
      paid: false,
      image: "/events/trailrun.jpg",
      date: "2025-07-15",
    },
    {
      title: "Surfing Camp",
      description: "Learn to surf or improve your skills at our beach camp.",
      type: "Surfing",
      level: "Beginner",
      location: "Beach",
      paid: true,
      amount: 800,
      image: "/events/surfing.jpg",
      date: "2025-07-18",
    },
    // ...add the rest from your main eventData
  ],
};

export default function EventDetailPage() {
  const params = useParams();
  const eventSlug = params.event;

  // Find event by slug (title converted to slug)
  const event = eventData.all.find(
    (e) => e.title.replace(/\s+/g, "-").toLowerCase() === eventSlug
  );

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-500">
          Sorry, we couldn't find the event you are looking for.
        </p>
      </div>
    );
  }

  // Razorpay integration state
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'success' | 'failed'
  const [error, setError] = useState("");

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handler for paid event payment
  const handlePayment = async () => {
    setLoading(true);
    setError("");
    setPaymentStatus(null);
    const res = await loadRazorpayScript();
    if (!res) {
      setError("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }

    // Create order on backend (direct to Rails backend)
    try {
      const backendBase = "http://localhost:3000";
      const orderRes = await fetch(`${backendBase}/api/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(event.amount * 100), // Razorpay expects paise, ensure integer
          currency: "INR",
          receipt: `event-${eventSlug}-${Date.now()}`,
          notes: { event: event.title },
        }),
      });
      const orderData = await orderRes.json();
      // Razorpay order may be nested under attributes (if backend ever changes), so support both
      const order = orderData.id ? orderData : orderData.attributes;
      if (!order || !order.id) throw new Error("Order creation failed");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount, // Razorpay expects paise, but for display, use display_amount/display_currency if present
        currency: order.currency,
        name: event.title,
        description: event.description,
        image: event.image,
        order_id: order.id,
        // Show correct display amount if available (for internationalization, but for INR, just divide by 100)
        display_amount: order.amount / 100,
        display_currency: order.currency,
        handler: async function (response) {
          // Verify payment on backend
          const verifyRes = await fetch(`${backendBase}/api/razorpay/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setPaymentStatus("success");
          } else {
            setPaymentStatus("failed");
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: { color: "#7c3aed" },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setPaymentStatus("failed");
        setError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover rounded-xl mb-8"
      />
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="flex flex-wrap gap-2 text-xs mb-4">
        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
          {event.type}
        </span>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {event.level}
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
          {event.location}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            event.paid
              ? "bg-red-100 text-red-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {event.paid ? "Paid" : "Free"}
        </span>
        {event.paid && event.amount && (
          <span className="px-2 py-1 rounded font-bold border border-orange-500 text-black text-base ">
            ₹{event.amount}
          </span>
        )}
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
          {event.date}
        </span>
      </div>
      <p className="text-gray-700 text-lg mb-8">{event.description}</p>

      {/* Payment status feedback */}
      {paymentStatus === "success" && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Payment successful! You have joined this event.
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          Payment failed. Please try again or contact support.
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {/* Join/Pay button */}
      {event.paid ? (
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-bold w-full disabled:opacity-60"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ₹${event.amount} & Join`}
        </button>
      ) : (
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-lg font-bold w-full"
          onClick={() => setPaymentStatus("success")}
        >
          Join Now
        </button>
      )}
    </div>
  );
}
