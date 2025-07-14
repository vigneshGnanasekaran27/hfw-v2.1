"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EventForm from "@/components/admin/EventForm";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api";

export default function EditEventPage() {
  const params = useParams();
  const eventId = params.id;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`${API_BASE}/events/${eventId}`);
      if (!response.ok) throw new Error("Failed to fetch event");
      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading event...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!event) return <div className="p-6">Event not found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <EventForm event={event} mode="edit" />
    </div>
  );
}
