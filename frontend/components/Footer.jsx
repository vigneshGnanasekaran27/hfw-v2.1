import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">HopeFit Wellness</h3>
            <p className="text-gray-400 mb-4">
              Empowering individuals to achieve their fitness and wellness goals
              through personalized coaching and comprehensive programs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/kitchen"
                  className="text-gray-400 hover:text-white"
                >
                  Kitchen 
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-400 hover:text-white">
                  Training
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/personal-training"
                  className="text-gray-400 hover:text-white"
                >
                  Personal Training
                </Link>
              </li>
             
              <li>
                <Link
                  href="/group-classes"
                  className="text-gray-400 hover:text-white"
                >
                  Group Training
                </Link>
              </li>
              <li>
                <Link
                  href="/online-programs"
                  className="text-gray-400 hover:text-white"
                >
                  Online Training
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition-coaching"
                  className="text-gray-400 hover:text-white"
                >
                  Kitchen 
                </Link>
              </li>
              <li>
                <Link
                  href="/nutrition-coaching"
                  className="text-gray-400 hover:text-white"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/workshops"
                  className="text-gray-400 hover:text-white"
                >
                  Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                <span>Old Mahabalipuram Road, Rajiv Gandhi Salai, Padur</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2 text-gray-400"></i>
                <span>7397355404</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-gray-400"></i>
                <span>hopefitwellness@gmail.com</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 rounded-l-md bg-gray-800 text-white"
                />
                <button className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} HopeFit Wellness, All Rights Reserved.
            <Link
              href="/privacy-policy"
              className="ml-2 text-gray-300 hover:text-white"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="/terms-of-service"
              className="ml-2 text-gray-300 hover:text-white"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
