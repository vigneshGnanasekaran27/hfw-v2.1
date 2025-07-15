"use client";
import React, { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://hfw-v2-1-backend.onrender.com/api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPaid, setSelectedPaid] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState("all");

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

  // Filtering logic
  const filteredEvents = events.filter((event) => {
    // Search
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    // Category (date)
    let matchesCategory = true;
    if (selectedCategory !== "all") {
      const today = new Date();
      const eventDate = new Date(event.date);
      if (selectedCategory === "today") {
        matchesCategory = eventDate.toDateString() === today.toDateString();
      } else if (selectedCategory === "week") {
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        matchesCategory = eventDate >= today && eventDate <= weekFromNow;
      } else if (selectedCategory === "month") {
        const monthFromNow = new Date();
        monthFromNow.setMonth(today.getMonth() + 1);
        matchesCategory = eventDate >= today && eventDate <= monthFromNow;
      }
    }
    // Type
    const matchesType =
      selectedType === "all" || event.event_type === selectedType;
    // Level
    const matchesLevel =
      selectedLevel === "all" || event.level === selectedLevel;
    // Paid/Free
    const matchesPaid =
      selectedPaid === "all" ||
      (selectedPaid === "paid" ? event.paid : !event.paid);
    // Place
    const matchesPlace =
      selectedPlace === "all" || event.location === selectedPlace;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesLevel &&
      matchesPaid &&
      matchesPlace
    );
  });

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Search events"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-1 items-center">
            {/* Date/Category Filter */}
            {["all", "today", "week", "month"].map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all"
                  ? "All Events"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}

            {/* Type Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Run">Run</option>
              <option value="Cycling">Cycling</option>
              <option value="Trekking">Trekking</option>
              <option value="Surfing">Surfing</option>
            </select>

            {/* Level Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            {/* Paid/Free Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              value={selectedPaid}
              onChange={(e) => setSelectedPaid(e.target.value)}
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="free">Free</option>
            </select>

            {/* Place Filter */}
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[100px]"
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
            >
              <option value="all">All Places</option>
              <option value="City">City</option>
              <option value="Park">Park</option>
              <option value="Mountain">Mountain</option>
              <option value="Forest">Forest</option>
              <option value="Beach">Beach</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-600">
        Showing {filteredEvents.length}{" "}
        {filteredEvents.length === 1 ? "event" : "events"}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <a
              key={event.id}
              href={`/events/${event.id}`}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">
                {event.description?.slice(0, 80)}...
              </p>
              <div className="flex flex-wrap gap-2 text-xs mb-2">
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
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No events found matching your criteria
          </p>
          <button
            className="mt-4 text-purple-600 hover:text-purple-700"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedType("all");
              setSelectedLevel("all");
              setSelectedPaid("all");
              setSelectedPlace("all");
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
