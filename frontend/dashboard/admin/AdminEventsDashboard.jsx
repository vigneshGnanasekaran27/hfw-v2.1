import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminPaymentsTable from "./AdminPaymentsTable";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000/api";

export default function AdminEventsDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    event_type: "",
    level: "",
    location: "",
    paid: false,
    amount: "",
    image: "",
    date: "",
    registration_deadline: "",
    start_time: "",
    end_time: "",
    capacity: "",
    remaining_slots: "",
    prerequisites: "",
    what_to_bring: "",
    schedule: "",
    instructor_name: "",
    instructor_bio: "",
    fitness_level_details: "",
    cancellation_policy: "",
    venue_details: "",
    additional_info: "",
    age_restriction: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      setError("Failed to fetch events");
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_BASE}/events/${editingId}` : `${API_BASE}/events`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: { ...form, amount: form.paid ? Number(form.amount) : 0 } }),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.errors?.join(", ") || "Error");
      }
      setForm({
        title: "",
        description: "",
        event_type: "",
        level: "",
        location: "",
        paid: false,
        amount: "",
        image: "",
        date: "",
        registration_deadline: "",
        start_time: "",
        end_time: "",
        capacity: "",
        remaining_slots: "",
        prerequisites: "",
        what_to_bring: "",
        schedule: "",
        instructor_name: "",
        instructor_bio: "",
        fitness_level_details: "",
        cancellation_policy: "",
        venue_details: "",
        additional_info: "",
        age_restriction: ""
      });
      setEditingId(null);
      fetchEvents();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  function handleEdit(event) {
    setForm({
      title: event.title || "",
      description: event.description || "",
      event_type: event.event_type || "",
      level: event.level || "",
      location: event.location || "",
      paid: event.paid || false,
      amount: event.amount || "",
      image: event.image || "",
      date: event.date || "",
      registration_deadline: event.registration_deadline || "",
      start_time: event.start_time || "",
      end_time: event.end_time || "",
      capacity: event.capacity || "",
      remaining_slots: event.remaining_slots || "",
      prerequisites: event.prerequisites || "",
      what_to_bring: event.what_to_bring || "",
      schedule: event.schedule || "",
      instructor_name: event.instructor_name || "",
      instructor_bio: event.instructor_bio || "",
      fitness_level_details: event.fitness_level_details || "",
      cancellation_policy: event.cancellation_policy || "",
      venue_details: event.venue_details || "",
      additional_info: event.additional_info || "",
      age_restriction: event.age_restriction || ""
    });
    setEditingId(event.id);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this event?")) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/events/${id}`, { method: "DELETE", credentials: "include" });
      fetchEvents();
    } catch {
      setError("Failed to delete event");
    }
    setLoading(false);
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <input required placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="border p-2 rounded" />
          <input required placeholder="Type" value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))} className="border p-2 rounded" />
          <input required placeholder="Level" value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className="border p-2 rounded" />
          <input required placeholder="Location" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="border p-2 rounded" />
          <input required placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="border p-2 rounded" />
          <input type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="border p-2 rounded" />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.paid} onChange={e => setForm(f => ({ ...f, paid: e.target.checked }))} />
            <span>Paid Event</span>
          </div>
          {form.paid && (
            <input type="number" required placeholder="Amount" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} className="border p-2 rounded" />
          )}
          <textarea required placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="border p-2 rounded col-span-1 md:col-span-2" />

          {/* Registration & Schedule */}
          <input type="date" placeholder="Registration Deadline" value={form.registration_deadline} onChange={e => setForm(f => ({ ...f, registration_deadline: e.target.value }))} className="border p-2 rounded" />
          <div className="flex gap-2">
            <input type="time" placeholder="Start Time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} className="border p-2 rounded w-1/2" />
            <input type="time" placeholder="End Time" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} className="border p-2 rounded w-1/2" />
          </div>
          <input type="number" placeholder="Capacity" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} className="border p-2 rounded" />
          <input type="number" placeholder="Remaining Slots" value={form.remaining_slots} onChange={e => setForm(f => ({ ...f, remaining_slots: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Schedule (detailed)" value={form.schedule} onChange={e => setForm(f => ({ ...f, schedule: e.target.value }))} className="border p-2 rounded col-span-1 md:col-span-2" />

          {/* Requirements & Details */}
          <textarea placeholder="Prerequisites" value={form.prerequisites} onChange={e => setForm(f => ({ ...f, prerequisites: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="What to Bring" value={form.what_to_bring} onChange={e => setForm(f => ({ ...f, what_to_bring: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Fitness Level Details" value={form.fitness_level_details} onChange={e => setForm(f => ({ ...f, fitness_level_details: e.target.value }))} className="border p-2 rounded" />
          <input placeholder="Age Restriction" value={form.age_restriction} onChange={e => setForm(f => ({ ...f, age_restriction: e.target.value }))} className="border p-2 rounded" />

          {/* Instructor & Venue */}
          <input placeholder="Instructor Name" value={form.instructor_name} onChange={e => setForm(f => ({ ...f, instructor_name: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Instructor Bio" value={form.instructor_bio} onChange={e => setForm(f => ({ ...f, instructor_bio: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Venue Details" value={form.venue_details} onChange={e => setForm(f => ({ ...f, venue_details: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Cancellation Policy" value={form.cancellation_policy} onChange={e => setForm(f => ({ ...f, cancellation_policy: e.target.value }))} className="border p-2 rounded" />
          <textarea placeholder="Additional Information" value={form.additional_info} onChange={e => setForm(f => ({ ...f, additional_info: e.target.value }))} className="border p-2 rounded col-span-1 md:col-span-2" />

          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2" disabled={loading}>
            {editingId ? "Update Event" : "Create Event"}
          </button>
        </form>
        <h3 className="text-xl font-bold mb-2">All Events</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Level</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Paid</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b">
                  <td className="p-2 border">{event.title}</td>
                  <td className="p-2 border">{event.event_type}</td>
                  <td className="p-2 border">{event.level}</td>
                  <td className="p-2 border">{event.location}</td>
                  <td className="p-2 border">{event.paid ? "Yes" : "No"}</td>
                  <td className="p-2 border">{event.paid ? event.amount : "-"}</td>
                  <td className="p-2 border">{event.date}</td>
                  <td className="p-2 border flex gap-2">
                    <button onClick={() => handleEdit(event)} className="text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPaymentsTable />
    </>
  );
}
