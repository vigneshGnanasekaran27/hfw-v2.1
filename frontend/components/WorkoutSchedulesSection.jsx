import React from "react";
import { Dumbbell, Heart, Clock, Zap, ArrowRight, UserPen } from "lucide-react";
import Bginner_friendly from "..//images/WorkoutSchedule/beginner_friendly.png";
import High_intensity from "..//images/WorkoutSchedule/high_intensity.png";
import Strength_training from "..//images/WorkoutSchedule/strength_training.png";
import Link from "next/link";

const WorkoutSchedulesSection = () => {
  const workoutPrograms = [
    {
      id: "beginner",
      title: "Beginner Fitness",
      image: Bginner_friendly,
      icon: <Heart className="w-8 h-8 text-green-500" />,
      duration: "4 weeks",
      sessionsPerWeek: 3,
      description: "Perfect for those starting their fitness journey",
      features: [
        "Basic strength training",
        "Cardio fundamentals",
        "Proper form guidance",
        "Flexibility work",
      ],
    },
    {
      id: "strength",
      title: "Strength & Power",
      image: Strength_training,
      icon: <Dumbbell className="w-8 h-8 text-blue-500" />,
      duration: "8 weeks",
      sessionsPerWeek: 4,
      description: "Build muscle and increase strength",
      features: [
        "Progressive overload",
        "Compound exercises",
        "Recovery protocols",
        "Nutrition guidance",
      ],
    },
    {
      id: "hiit",
      title: "HIIT & Conditioning",
      image: High_intensity,
      icon: <Zap className="w-8 h-8 text-red-500" />,
      duration: "6 weeks",
      sessionsPerWeek: 5,
      description: "Boost endurance and burn fat",
      features: [
        "Interval training",
        "Metabolic conditioning",
        "Circuit workouts",
        "Active recovery",
      ],
    },
  ];

  return (
    <div id="schedule" className="py-16 mt-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-6 shadow-sm border border-indigo-200">
            <UserPen className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="">
            <h2 className="text-4xl font-bold mb-4">
              Personalized Workout Plans
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Expert-designed programs to achieve your fitness goals, with clear
              instructions and video guides
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {workoutPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-xl shadow-lg overflow-hidden relative hover:shadow-xl transition-all duration-300 dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: `url(${program.image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

              {/* Dark overlay - darker in dark mode */}
              <div className="absolute inset-0 bg-black opacity-50 dark:opacity-70 z-1"></div>

              {/* Content with relative positioning to appear above the background */}
              <div className="relative z-10 p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div>{program.icon}</div>
                  <div className="flex items-center text-sm text-white">
                    <Clock className="w-4 h-4 mr-1" />
                    {program.duration} • {program.sessionsPerWeek}x/week
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {program.title}
                </h3>
                <p className="mb-6 text-white">{program.description}</p>

                <div className="space-y-3 mb-6">
                  {program.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-white"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 text-purple-200 dark:text-purple-300" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button
                  className="px-4 py-2 bg-white text-green-700 rounded-lg border border-green-200 flex items-center justify-center gap-2 hover:bg-green-50 transition-colors shadow-sm
              dark:bg-black dark:text-green-300 dark:border-green-800 dark:hover:bg-gray-900"
                >
                  View Program Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center ">
          <div className=" rounded-xl p-8 text-center shadow-lg w-fit dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Get Your Custom Program
              </h3>
              <p className="text-lg  mb-6">
                Follow our plans independently or add professional guidance from
                our trainers - the choice is yours
              </p>
              <div className="flex items-center justify-center gap-6">
                <Link
                  href="/workout-schedules"
                  className="px-6 py-3 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors shadow-sm
              dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900"
                >
                  Browse All Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSchedulesSection;
