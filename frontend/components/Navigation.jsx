"use client";
import { useState, useEffect, useRef } from "react";
import AnimatedHamburgerMenu from "./AnimatedHamburgerMenu";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import logo from "../images/logo.png";
import {
  ChevronRight,
  Home,
  Calendar,
  Calculator,
  BookOpen,
  MessageCircle,
} from "lucide-react";

const Navigation = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const moreButtonRef = useRef(null);

  // Close dropdown or mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if more dropdown is open and click is outside
      if (
        showMore &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target)
      ) {
        setShowMore(false);
      }

      // Check if mobile menu is open and click is outside
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest("nav")
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMore, isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveCategory(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    setShowMore(false);
    setActiveCategory(null);
  };

  const handleSignIn = () => {
    router.push("/auth/signin");
  };

  const handleSignUp = () => {
    router.push("/auth/signup");
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "banner",
        "kitchen",
        "nutrition",
        "training",
        "schedule",
        "shop",
        "calculator",
        "events",
        "blog",
        "workshops",
        "leadership",
        "about",
        "faq",
        "contact",
      ];

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-200 shadow-md z-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center">
            <Image
              src={logo.src}
              alt="Hope Fit Wellness Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <button
              onClick={() => scrollToSection("banner")}
              className="hover:text-purple-600 transition duration-300 text-gray-800 dark:text-gray-100"
            >
              HopeFit Wellness
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              showMore={showMore}
              setShowMore={setShowMore}
              moreButtonRef={moreButtonRef}
            />
          </div>

          {/* Auth Buttons and Mobile Menu Toggle */}
          <div className="md:flex items-center space-x-4">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleSignIn}
                className="px-6 py-2 border border-emerald-600 text-emerald-600 font-semibold rounded-lg shadow-md 
              hover:bg-emerald-600 hover:text-emerald-200 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="px-6 py-2  bg-purple-600  text-purple-200 font-semibold 
              rounded-lg shadow-md hover:bg-purple-500 hover:text-purple-200 
              hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <AnimatedHamburgerMenu isOpen={isOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>

        {/* Mobile Menu - Redesigned */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-purple-300 dark:border-gray-700">
              <div className="flex items-center">
                <Image
                  src={logo.src}
                  alt="Hope Fit Wellness Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                  HopeFit Wellness
                </h2>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-800 dark:text-gray-100 rounded-full hover:bg-purple-300 dark:hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
              {activeCategory ? (
                <MobileCategoryView
                  category={activeCategory}
                  scrollToSection={scrollToSection}
                  setActiveCategory={setActiveCategory}
                  activeSection={activeSection}
                />
              ) : (
                <MobileMainMenu
                  scrollToSection={scrollToSection}
                  setActiveCategory={setActiveCategory}
                  activeSection={activeSection}
                  handleSignIn={handleSignIn}
                  handleSignUp={handleSignUp}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const MobileMainMenu = ({
  scrollToSection,
  setActiveCategory,
  activeSection,
  handleSignIn,
  handleSignUp,
}) => {
  const categories = [
    {
      id: "wellness",
      label: "Wellness",
      icon: <Home size={20} />,
      items: [
        { id: "kitchen", label: "Kitchen" },
        { id: "nutrition", label: "Nutrition" },
        { id: "training", label: "Training" },
      ],
    },
    {
      id: "planning",
      label: "Planning",
      icon: <Calendar size={20} />,
      items: [
        { id: "schedule", label: "Schedule" },
        { id: "events", label: "Events" },
        { id: "workshops", label: "Workshops" },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      icon: <Calculator size={20} />,
      items: [
        { id: "calculator", label: "Nutrition Calculator" },
        { id: "shop", label: "Shop" },
      ],
    },
    {
      id: "discover",
      label: "Discover",
      icon: <BookOpen size={20} />,
      items: [
        { id: "blog", label: "Blog" },
        { id: "leadership", label: "Leadership" },
        { id: "about", label: "About" },
        { id: "faq", label: "FAQ" },
      ],
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Auth Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleSignIn}
          className="flex-1 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl 
          font-semibold shadow-sm hover:bg-emerald-500 hover:text-emerald-200
          active:scale-98 transition-all duration-200"
        >
          Sign In
        </button>
        <button
          onClick={handleSignUp}
          className="flex-1 py-3 bg-purple-600 text-white rounded-xl 
          font-semibold shadow-sm hover:bg-purple-700
          active:scale-98 transition-all duration-200"
        >
          Sign Up
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider pl-2">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category)}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm
              hover:shadow-md transition-shadow duration-200 flex flex-col items-center"
            >
              <div
                className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 
              flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2"
              >
                {category.icon}
              </div>
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Direct Access */}
      <div>
        <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider pl-2 mb-3">
          Popular Sections
        </h3>
        <div className="space-y-2">
          {["kitchen", "nutrition", "training", "shop"].map((id) => {
            const matchingCategory = categories.find((cat) =>
              cat.items.some((item) => item.id === id)
            );
            const item = matchingCategory
              ? matchingCategory.items.find((item) => item.id === id)
              : null;

            if (item) {
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg
                  ${
                    activeSection === id
                      ? "bg-purple-600 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  } 
                  shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight size={18} />
                </button>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* Contact Button */}
      <button
        onClick={() => scrollToSection("contact")}
        className="w-full flex items-center justify-center gap-2 p-4 bg-purple-500 text-white
        rounded-xl shadow-md hover:bg-purple-600 transition-colors duration-200 mt-4"
      >
        <MessageCircle size={20} />
        <span className="font-semibold">Contact Us</span>
      </button>
    </div>
  );
};

const MobileCategoryView = ({
  category,
  scrollToSection,
  setActiveCategory,
  activeSection,
}) => {
  return (
    <div className="px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => setActiveCategory(null)}
        className="flex items-center text-purple-600 dark:text-purple-400 mb-4"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back to Menu
      </button>

      {/* Category Title */}
      <div className="flex items-center mb-6">
        <div
          className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 
          flex items-center justify-center text-purple-600 dark:text-purple-400 mr-3"
        >
          {category.icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          {category.label}
        </h2>
      </div>

      {/* Category Items */}
      <div className="space-y-3">
        {category.items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl
            ${
              activeSection === item.id
                ? "bg-purple-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            } 
            shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>
    </div>
  );
};

const NavLinks = ({
  mobile = false,
  activeSection,
  scrollToSection,
  showMore,
  setShowMore,
  moreButtonRef,
}) => {
  const primaryLinks = [
    { id: "kitchen", label: "Kitchen" },
    { id: "nutrition", label: "Nutrition" },
    { id: "training", label: "Training" },
    { id: "schedule", label: "Schedule" },
    { id: "calculator", label: "Nutrition Calculator" },
    { id: "shop", label: "Shop" },
    { id: "events", label: "Events" },
  ];

  const moreLinks = [
    { id: "blog", label: "Blog" },
    { id: "workshops", label: "Workshops" },
    { id: "leadership", label: "Leadership" },
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
  ];

  // Check if the active section is in the More links
  const isMoreSectionActive = moreLinks.some(
    (link) => link.id === activeSection
  );

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`
        ${
          mobile
            ? "block w-full text-left py-3 px-4 text-lg rounded-lg hover:bg-purple-500/10 transition duration-300"
            : "px-3 py-2 hover:text-purple-600 transition duration-300 whitespace-nowrap"
        }
        ${
          activeSection === id
            ? "text-purple-600 font-semibold"
            : "text-gray-700 dark:text-gray-300"
        }
        relative
      `}
    >
      {label}
      {activeSection === id && !mobile && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600" />
      )}
    </button>
  );

  return (
    <div
      className={`
        ${mobile ? "space-y-2" : "flex items-center space-x-0"}
        w-full
      `}
    >
      {primaryLinks.map((link) => (
        <NavItem key={link.id} {...link} />
      ))}

      {/* More Dropdown for Desktop */}
      {!mobile && setShowMore && moreButtonRef && (
        <div ref={moreButtonRef} className="relative">
          <button
            onClick={() => setShowMore(!showMore)}
            className={`
              px-3 py-2 hover:text-purple-600 transition duration-300 flex items-center whitespace-nowrap
              ${
                isMoreSectionActive
                  ? "text-purple-600"
                  : "text-gray-700 dark:text-gray-300"
              }
            `}
          >
            More
            <svg
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                showMore ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {isMoreSectionActive && !showMore && (
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600" />
            )}
          </button>

          {showMore && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-purple-100 dark:bg-gray-900 rounded-md shadow-lg py-1 z-50">
              {moreLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    scrollToSection(link.id);
                    setShowMore(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-500/10 text-gray-700 dark:text-gray-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contact Button */}
      {!mobile && (
        <button
          onClick={() => scrollToSection("contact")}
          className={`
            px-3 py-2 rounded-full 
            border border-purple-500
            hover:bg-purple-600 hover:text-white
            transition duration-300 whitespace-nowrap
            ${
              activeSection === "contact"
                ? "bg-purple-600 text-white"
                : "text-purple-600"
            }
          `}
        >
          Contact Us
        </button>
      )}
    </div>
  );
};

export default Navigation;
