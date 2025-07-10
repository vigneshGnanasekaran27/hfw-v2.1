"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const eventCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Event Title</h2>
        <p className="text-gray-600 mb-4">Event description goes here.</p>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Join Now
        </button>
      </div>
    </div>
  );
};

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
      amount: 999,
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
      amount: 899,
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
      amount: 499,
      image: "/events/surfing.jpg",
      date: "2025-07-18",
    },
  ],
  today: [
    {
      title: "Morning Run Club",
      description: "Start your day with a group run in the park.",
      type: "Run",
      level: "Beginner",
      location: "Park",
      paid: false,
      image: "/events/morningrun.jpg",
      date: "2025-07-06",
    },
    {
      title: "Cycling Sprint",
      description: "Short-distance cycling event for all levels.",
      type: "Cycling",
      level: "Intermediate",
      location: "City",
      paid: false,
      image: "/events/cyclingsprint.jpg",
      date: "2025-07-06",
    },
  ],
  week: [
    {
      title: "Trekking Workshop",
      description: "Learn trekking basics and safety for beginners.",
      type: "Trekking",
      level: "Beginner",
      location: "Mountain",
      paid: false,
      image: "/events/trekworkshop.jpg",
      date: "2025-07-09",
    },
    {
      title: "Trail Running Meetup",
      description: "Weekly meetup for trail running enthusiasts.",
      type: "Run",
      level: "Intermediate",
      location: "Forest",
      paid: false,
      image: "/events/trailmeetup.jpg",
      date: "2025-07-13",
    },
  ],
  month: [
    {
      title: "Ultra Marathon",
      description: "Test your limits in our monthly ultra marathon event.",
      type: "Run",
      level: "Advanced",
      location: "City",
      paid: true,
      amount: 799,
      image: "/events/ultramarathon.jpg",
      date: "2025-07-28",
    },
    {
      title: "Surfing Competition",
      description: "Compete or watch the best surfers in action.",
      type: "Surfing",
      level: "Advanced",
      location: "Beach",
      paid: false,
      image: "/events/surfcomp.jpg",
      date: "2025-07-25",
    },
  ],
};

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPaid, setSelectedPaid] = useState("all");
  const [selectedPlace, setSelectedPlace] = useState("all");
  const router = useRouter();

  // Get the events for the selected category
  const events =
    selectedCategory === "all"
      ? Object.values(eventData).flat()
      : eventData[selectedCategory] || [];

  // Filter events by search term
  const filteredEvents = events.filter((event) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query);
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesLevel =
      selectedLevel === "all" || event.level === selectedLevel;
    const matchesPaid =
      selectedPaid === "all" ||
      (selectedPaid === "paid" ? event.paid : !event.paid);
    const matchesPlace =
      selectedPlace === "all" || event.location === selectedPlace;
    return (
      matchesSearch &&
      matchesType &&
      matchesLevel &&
      matchesPaid &&
      matchesPlace
    );
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
          Transform Your Fitness Journey with our Events
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Choose from our expertly crafted training programs designed to help
          you achieve your fitness goals with personalized attention and proven
          methods.
        </p>
      </div>

      {/* Unified Search and Filter Section (Styled like Kitchen Page) */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 min-w-[220px] max-w-[30%]">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-600 mb-2">{event.description}</p>
                <div className="flex flex-wrap gap-2 text-xs mb-2">
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
                    className={`px-2 py-1 rounded font-bold border ${
                      event.paid
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "bg-emerald-100 text-emerald-700 border-emerald-300"
                    }`}
                  >
                    {event.paid ? "Paid" : "Free"}
                  </span>
                  {event.paid && (
                    <span className="px-2 py-1 rounded font-bold border border-orange-500 bg-gradient-to-r from-yellow-200 via-orange-200 to-yellow-100 text-orange-900 text-base ">
                      ₹{event.amount}
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {event.date}
                  </span>
                </div>
              </div>
              <button
                className="mt-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() =>
                  router.push(
                    `/events/${encodeURIComponent(
                      event.title.replace(/\s+/g, "-").toLowerCase()
                    )}`
                  )
                }
              >
                View Details
              </button>
            </div>
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
            }}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
