"use client";
import OrderForm from "./components/OrderForm";
// import OrderSummary from "./components/OrderSummary";

export default function OrderPage() {
  const handleSubmitOrder = (formData) => {
    // Handle order submission
    console.log("Order submitted:", formData);
    // Add API call here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <OrderForm onSubmit={handleSubmitOrder} />
        </div>

        <div className="lg:col-span-1">{/* <OrderSummary /> */}</div>
      </div>
    </div>
  );
}
