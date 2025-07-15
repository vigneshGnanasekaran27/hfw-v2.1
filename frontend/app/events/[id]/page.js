"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import handlePayment from "@/events_helper/razorpay_function";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useAuth } from "@/context/AuthContext";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://hfw-v2-1-backend.onrender.com/api";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line
  }, [eventId]);

  async function fetchEvent() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events/${eventId}`);
      if (!res.ok) throw new Error("Event not found");
      const data = await res.json();
      setEvent(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  if (loading) return <div>Loading event...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!event) return <div>Event not found.</div>;

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
          {event.event_type}
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
      {/* Event Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          {/* Main Details */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-gray-700">{event.description}</p>
          </div>

          {/* Schedule Details */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Schedule</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              {event.start_time && event.end_time && (
                <p className="text-gray-700">
                  <span className="font-medium">Time:</span>{" "}
                  {new Date(
                    `2000-01-01T${event.start_time}`
                  ).toLocaleTimeString()}{" "}
                  -{" "}
                  {new Date(
                    `2000-01-01T${event.end_time}`
                  ).toLocaleTimeString()}
                </p>
              )}
              {event.schedule && (
                <div className="mt-2">
                  <h3 className="font-medium mb-1">Detailed Schedule:</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {event.schedule}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Instructor Details */}
          {event.instructor_name && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Your Instructor</h2>
              <h3 className="font-medium text-lg mb-2">
                {event.instructor_name}
              </h3>
              {event.instructor_bio && (
                <p className="text-gray-700">{event.instructor_bio}</p>
              )}
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Event Requirements */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Event Requirements</h2>
            {event.fitness_level_details && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Fitness Level Details:</h3>
                <p className="text-gray-700">{event.fitness_level_details}</p>
              </div>
            )}
            {event.prerequisites && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Prerequisites:</h3>
                <p className="text-gray-700">{event.prerequisites}</p>
              </div>
            )}
            {event.what_to_bring && (
              <div>
                <h3 className="font-medium mb-1">What to Bring:</h3>
                <p className="text-gray-700">{event.what_to_bring}</p>
              </div>
            )}
          </div>

          {/* Venue Details */}
          {event.venue_details && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Venue Information</h2>
              <p className="text-gray-700">{event.venue_details}</p>
            </div>
          )}

          {/* Registration Details */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Registration Information
            </h2>
            {event.registration_deadline && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Registration Deadline:</span>{" "}
                {new Date(event.registration_deadline).toLocaleDateString()}
              </p>
            )}
            {event.capacity && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Capacity:</span> {event.capacity}{" "}
                participants
                {event.remaining_slots !== undefined && (
                  <span className="ml-2">
                    ({event.remaining_slots} slots remaining)
                  </span>
                )}
              </p>
            )}
            {event.age_restriction && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Age Restriction:</span>{" "}
                {event.age_restriction}
              </p>
            )}
          </div>

          {/* Cancellation Policy */}
          {event.cancellation_policy && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Cancellation Policy
              </h2>
              <p className="text-gray-700">{event.cancellation_policy}</p>
            </div>
          )}

          {/* Additional Information */}
          {event.additional_info && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Additional Information
              </h2>
              <p className="text-gray-700">{event.additional_info}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Section */}
      {event.paid && (
        <div className="mb-8">
          {user ? (
            <>
              <button
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold disabled:opacity-60"
                disabled={payLoading || paymentStatus === "success"}
                onClick={() =>
                  handlePayment({
                    event,
                    eventSlug: event.id,
                    setLoading: setPayLoading,
                    setError: setPayError,
                    setPaymentStatus,
                    user,
                  })
                }
              >
                {payLoading
                  ? "Processing..."
                  : paymentStatus === "success"
                  ? "Payment Successful"
                  : `Pay ₹${event.amount}`}
              </button>
              {payError && <div className="text-red-600 mt-2">{payError}</div>}
              {paymentStatus === "success" && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
                    <svg
                      className="w-4 h-4 mr-1 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Payment Successful
                  </span>
                  <span className="text-green-700 text-sm">
                    Check your email for confirmation.
                  </span>
                </div>
              )}
              {paymentStatus === "failed" && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                    <svg
                      className="w-4 h-4 mr-1 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Payment Failed
                  </span>
                  <span className="text-red-700 text-sm">
                    Please try again or contact support.
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4">
              <div className="mb-2 text-gray-700">
                Sign in to register and pay for this event:
              </div>
              <GoogleSignInButton />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
