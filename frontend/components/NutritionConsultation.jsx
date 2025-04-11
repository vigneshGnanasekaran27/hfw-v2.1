import React from "react";
import {
  ClipboardCheck,
  Utensils,
  ChefHat,
  ArrowRight,
  Users,
  BookOpen,
  Salad,
  ClipboardList,
} from "lucide-react";

import Consultation from "..//images/Nutrition/consultation.jpeg";
import Custom_plan from "..//images/Nutrition/Custom_plan.jpeg";
import Meal_options from "..//images/Nutrition/meal_options.jpeg";

import Image from "next/legacy/image";
import Link from "next/link";

const NutritionConsultation = () => {
  return (
    <div id="nutrition" className="container mx-auto px-4 py-16 mt-28">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-6 shadow-sm border border-green-200">
            <Salad className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Expert Nutrition Consultation
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Get a personalized nutrition plan designed by our expert
            nutritionists, with the flexibility to prepare meals yourself or
            order from our kitchen.
          </p>
        </div>

        {/* Process Flow - Improved Card Design */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group dark:bg-black dark:shadow-[0px_8px_30px_rgba(102,126,234,0.4)]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src={Consultation.src}
                alt="Nutrition consultation"
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div> */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                1. Consultation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Meet with our nutritionists to discuss your goals, preferences,
                and lifestyle needs for a tailored approach.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group dark:bg-black dark:shadow-[0px_8px_30px_rgba(102,126,234,0.4)]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src={Custom_plan.src}
                alt="Custom nutrition plan"
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div> */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <ClipboardCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                2. Custom Plan
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Receive your personalized nutrition plan tailored to your
                specific needs and health objectives.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group dark:bg-black dark:shadow-[0px_8px_30px_rgba(102,126,234,0.4)]">
            <div className="relative h-52 overflow-hidden">
              <Image
                src={Meal_options.src}
                alt="Meal options"
                width={500}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div> */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-black rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <Utensils className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                3. Meal Options
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose to prepare meals yourself with our guidance or order
                chef-prepared meals from our kitchen.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid - Improved Design */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl dark:bg-black dark:shadow-[0px_8px_30px_rgba(102,126,234,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Personalized Consultation
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Initial assessment of your health and fitness goals
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Detailed discussion of dietary preferences and restrictions
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Regular follow-ups to track progress and adjust plans
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl dark:bg-black dark:shadow-[0px_8px_30px_rgba(102,126,234,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <ChefHat className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Kitchen Services
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Fresh, healthy meals prepared according to your plan
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Flexible ordering options that fit your schedule
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3 mt-1.5"></span>
                <span className="text-gray-700 dark:text-gray-300">
                  Dietary restrictions and preferences accommodated
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* New Lighter CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/consultation"
            className="px-6 py-3 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors shadow-sm
              dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900"
          >
            Schedule Consultation
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/nutrition-plans"
            className="px-6 py-3 bg-white text-green-700 rounded-lg border border-green-200 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors shadow-sm
              dark:bg-black dark:text-green-300 dark:border-green-800 dark:hover:bg-gray-900"
          >
            Explore Nutrition Plans
            <ClipboardList className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NutritionConsultation;
