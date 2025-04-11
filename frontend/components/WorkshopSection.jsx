import React from "react";
import {
  BookOpen,
  Dumbbell,
  HeartPulse,
  Rocket,
  ShieldCheck,
} from "lucide-react";

export default function WorkshopSection() {
  return (
    // <section className="py-16 bg-white">
    <section id="workshops" className="py-16 mt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-full mb-6 shadow-sm border border-yellow-200">
            <ShieldCheck className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-4xl font-bold  mb-4">
            Elevate Your Fitness Journey
          </h2>
          <p className="text-lg  max-w-2xl mx-auto">
            Transform your potential with our comprehensive workshop series
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row h-auto md:h-[800px] gap-4">
            {/* Left Large Section - Nutrition */}
            <div className="w-full md:w-1/3 bg-emerald-50 rounded-lg p-6 flex items-center justify-center dark:bg-emerald-900/40">
              <div className="text-center">
                <BookOpen
                  className="mx-auto mb-4 text-emerald-600"
                  size={64}
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl font-bold  mb-3">
                  Nutrition Masterclass
                </h3>
                <p className=" mb-4">
                  Deep dive into advanced nutrition strategies, meal planning,
                  and metabolic optimization
                </p>
                <a
                  href="/nutrition-workshop"
                  className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Sections */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              {/* Right Top Section */}
              <div className="h-1/2 flex gap-4">
                {/* Strength & Conditioning Section */}
                <div className="w-1/2 bg-blue-50 rounded-lg p-6 flex items-center justify-center dark:bg-blue-900/40">
                  <div className="text-center">
                    <Dumbbell
                      className="mx-auto mb-4 text-blue-600"
                      size={48}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-xl font-bold  mb-3">
                      Strength & Conditioning
                    </h3>
                    <p className=" mb-4">
                      Advanced techniques for muscle building and performance
                      enhancement
                    </p>
                    <a
                      href="/strength-workshop"
                      className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition "
                    >
                      Explore
                    </a>
                  </div>
                </div>

                {/* Rehabilitation Section */}
                <div className="w-1/2 bg-orange-50 rounded-lg p-6 flex items-center justify-center dark:bg-orange-900/40">
                  <div className="text-center">
                    <Rocket
                      className="mx-auto mb-4 text-orange-600"
                      size={48}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-xl font-bold  mb-3">Rehabilitation</h3>
                    <p className=" mb-4">
                      Specialized training for injury recovery and prevention
                    </p>
                    <a
                      href="/performance-workshop"
                      className="mt-4 inline-block bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition"
                    >
                      Discover
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Bottom Section - Mindfulness */}
              <div className="h-1/2 bg-purple-50 rounded-lg p-6 flex items-center justify-center dark:bg-purple-900/40">
                <div className="text-center">
                  <HeartPulse
                    className="mx-auto mb-4 text-purple-600"
                    size={64}
                    strokeWidth={1.5}
                  />
                  <h3 className="text-2xl font-bold  mb-3">
                    Mindfulness in Fitness
                  </h3>
                  <p className=" mb-4">
                    Integrating mental wellness with physical training
                    techniques
                  </p>
                  <a
                    href="/mindfulness-workshop"
                    className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-emerald-50 rounded-lg p-6 flex items-center justify-center dark:bg-emerald-900/40">
              <div className="text-center">
                <BookOpen
                  className="mx-auto mb-4 text-emerald-600"
                  size={64}
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl font-bold  mb-3">Personal Training</h3>
                <p className=" mb-4">
                  Customized one-on-one training programs to meet your specific
                  goals
                </p>
                <a
                  href="/nutrition-workshop"
                  className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
