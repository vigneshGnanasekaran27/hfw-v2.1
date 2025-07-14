// events_helper/razorpay_function.js

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


const handlePayment = async ({ event, eventSlug, setLoading, setError, setPaymentStatus, user }) => {
  setLoading(true);
  setError("");
  setPaymentStatus(null);

  const res = await loadRazorpayScript();
  if (!res) {
    setError("Failed to load Razorpay SDK. Please try again.");
    setLoading(false);
    return;
  }

  try {
    const backendBase = "http://localhost:3000";
    const orderRes = await fetch(`${backendBase}/api/razorpay/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(event.amount * 100),
        currency: "INR",
        receipt: `event-${eventSlug}-${Date.now()}`,
        notes: {
          event: event.title,
          event_id: event.id,
          user_id: user?.id,
          user_email: user?.email,
        },
      }),
    });

    const orderData = await orderRes.json();
    const order = orderData.id ? orderData : orderData.attributes;
    if (!order || !order.id) throw new Error("Order creation failed");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: event.title,
      description: event.description,
      image: event.image,
      order_id: order.id,
      display_amount: order.amount / 100,
      display_currency: order.currency,
      handler: async function (response) {
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
        name: user?.name || "Test User",
        email: user?.email || "test@example.com",
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

export default handlePayment;
