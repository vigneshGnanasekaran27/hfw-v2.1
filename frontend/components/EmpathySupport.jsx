"use client";
import { useState, useEffect } from "react";
import {
  Bell,
  Sparkles,
  Zap,
  Calendar,
  BookOpen,
  ShoppingBag,
  Dumbbell,
  X,
  ExternalLink,
  Filter,
  Clock,
  Star,
  TrendingUp,
  Users,
  Heart,
  Award,
  Gift,
} from "lucide-react";

const NotificationHub = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [animateIndicator, setAnimateIndicator] = useState(false);

  // Notification Categories with visual styling
  const categories = {
    "New Launch": {
      icon: Sparkles,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    "Upcoming Event": {
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    Achievement: {
      icon: Award,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    "Blog Post": {
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    "Product Update": {
      icon: ShoppingBag,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    Community: { icon: Users, color: "text-pink-500", bgColor: "bg-pink-50" },
    Challenge: {
      icon: TrendingUp,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    "Special Offer": {
      icon: Gift,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  };

  const notifications = [
    {
      category: "New Launch",
      title: "High-Protein Smoothie Collection",
      description:
        "Discover our new range of protein-packed smoothies. Perfect for your post-workout recovery!",
      link: "/smoothies",
      isNew: true,
      isPinned: true,
      engagement: "485 members excited about this",
      timestamp: "2 hours ago",
      cta: "Try Now",
      media: "/api/placeholder/400/200",
    },
    {
      category: "Achievement",
      title: "You've Hit Your Streak! 🎉",
      description:
        "Congratulations! You've logged in for 30 days straight. Keep up the amazing work!",
      link: "/profile/achievements",
      isNew: true,
      isPinned: false,
      engagement: "Share your achievement",
      timestamp: "5 hours ago",
      cta: "View Badge",
    },
    {
      category: "Challenge",
      title: "Summer Body Challenge 2025",
      description:
        "Join thousands in our 8-week transformation challenge. Win exciting prizes!",
      link: "/challenges/summer-2025",
      isNew: true,
      isPinned: true,
      engagement: "1.2k participants already joined",
      timestamp: "1 day ago",
      cta: "Join Challenge",
      media: "/api/placeholder/400/200",
    },
    {
      category: "Community",
      title: "Your Post Is Trending!",
      description:
        "Your workout routine has inspired 500+ community members. Check out the responses!",
      link: "/community/trending",
      isNew: true,
      engagement: "238 comments • 500+ likes",
      timestamp: "1 day ago",
      cta: "View Responses",
    },
    {
      category: "Special Offer",
      title: "Early Bird Discount",
      description:
        "Get 30% off on all premium workout plans for the next 24 hours!",
      link: "/offers/premium",
      isNew: true,
      isPinned: true,
      engagement: "Limited time offer",
      timestamp: "2 days ago",
      cta: "Claim Now",
      expiresIn: "23:45:30",
    },
  ];

  // Pulse animation effect for notification indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateIndicator(true);
      setTimeout(() => setAnimateIndicator(false), 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "new") return notification.isNew;
    if (activeFilter === "pinned") return notification.isPinned;
    return notification.category.toLowerCase() === activeFilter;
  });

  // Custom filter button component
  const FilterButton = ({ label, value, count }) => (
    <button
      onClick={() => setActiveFilter(value)}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
        activeFilter === value
          ? "bg-primary text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label} {count && `(${count})`}
    </button>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 hover:text-primary transition duration-300 focus:outline-none"
        aria-label={isExpanded ? "Close notifications" : "Open notifications"}
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Bell className="w-6 h-6" />
            {hasNewNotifications && (
              <span
                className={`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full ${
                  animateIndicator ? "animate-ping" : ""
                }`}
              />
            )}
          </div>
        )}
      </button>

      {isExpanded && (
        <div
          className="fixed top-16 right-4 w-full max-w-md max-h-[calc(100vh-8rem)] 
                     bg-white shadow-2xl rounded-2xl p-6 z-50 border border-gray-100 
                     overflow-y-auto animate-slideIn"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 pb-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Zap className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">What's New</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  onClick={() => setHasNewNotifications(false)}
                >
                  <Clock className="w-5 h-5 text-gray-500" />
                </button>
                <Dumbbell className="text-gray-400 animate-bounce" size={24} />
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              <FilterButton label="All" value="all" />
              <FilterButton
                label="New"
                value="new"
                count={notifications.filter((n) => n.isNew).length}
              />
              <FilterButton
                label="Pinned"
                value="pinned"
                count={notifications.filter((n) => n.isPinned).length}
              />
              {Object.keys(categories).map((category) => (
                <FilterButton
                  key={category}
                  label={category}
                  value={category.toLowerCase()}
                />
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => {
              const CategoryIcon = categories[notification.category].icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-xl shadow-sm border border-gray-100 
                             hover:shadow-md transition-all duration-300 overflow-hidden
                             ${
                               notification.isPinned
                                 ? "ring-2 ring-primary ring-opacity-50"
                                 : ""
                             }`}
                >
                  {/* Notification Media */}
                  {notification.media && (
                    <div className="w-full h-40 bg-gray-100 relative overflow-hidden">
                      <img
                        src={notification.media}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  {/* Notification Content */}
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`p-2 rounded-lg ${
                          categories[notification.category].bgColor
                        }`}
                      >
                        <CategoryIcon
                          className={`w-5 h-5 ${
                            categories[notification.category].color
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span
                            className={`text-sm font-medium ${
                              categories[notification.category].color
                            }`}
                          >
                            {notification.category}
                          </span>
                          {notification.isNew && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                          {notification.isPinned && (
                            <Star className="w-4 h-4 text-primary" />
                          )}
                        </div>

                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary">
                          {notification.title}
                        </h3>

                        <p className="text-gray-600 mt-1">
                          {notification.description}
                        </p>

                        {/* Engagement Info */}
                        <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{notification.engagement}</span>
                        </div>

                        {/* Action Bar */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                          <span className="flex items-center space-x-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{notification.timestamp}</span>
                          </span>

                          <a
                            href={notification.link}
                            className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full 
                                     bg-primary text-white text-sm font-medium 
                                     hover:bg-primary-dark transition-colors duration-200"
                          >
                            <span>{notification.cta}</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>

                        {/* Expiry Timer */}
                        {notification.expiresIn && (
                          <div className="mt-2 flex items-center space-x-2 text-sm text-red-500">
                            <Clock className="w-4 h-4" />
                            <span>Expires in: {notification.expiresIn}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 space-y-4">
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 font-medium">
                Stay motivated! Check back daily for new content and updates.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="text-sm text-gray-500 hover:text-primary">
                Mark all as read
              </button>
              <button className="text-sm text-gray-500 hover:text-primary">
                Notification settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationHub;
