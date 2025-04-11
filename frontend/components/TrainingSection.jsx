import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import {
  ArrowRight,
  Users,
  PersonStanding,
  Globe,
  Target,
  ClipboardList,
  CheckCircle2,
  Trophy,
  Flame,
  Activity,
} from "lucide-react";

import Group_training from "..//images/Training/group_training.png";
import One_on_one_training from "..//images/Training/one_on_one_training.jpg";
import Online_traing from "..//images/Training/online_training.jpeg";

const TrainingTypesSection = () => {
  const trainingTypes = [
    {
      id: "group-training",
      title: "Group Training",
      description:
        "Experience the energy of group fitness with expert guidance and peer motivation",
      image: Group_training,
      alt: "Group fitness class with multiple participants",
      icon: <Users className="w-6 h-6" />,
      benefits: [
        "Motivating group environment",
        "Cost-effective training options",
        "Structured workout programs",
        "Community support system",
      ],
      stats: {
        sessionsPerWeek: 5,
        maxGroupSize: 12,
        successRate: "92%",
      },
      popular: true,
    },
    {
      id: "one-on-one-training",
      title: "One-on-One Training",
      description:
        "Get personalized attention and customized programs with our expert trainers",
      image: One_on_one_training,
      alt: "Personal trainer working with client",
      icon: <PersonStanding className="w-6 h-6" />,
      benefits: [
        "Personalized attention & feedback",
        "Custom workout plans",
        "Flexible scheduling options",
        "Progress tracking & adjustments",
      ],
      stats: {
        sessionsPerWeek: 3,
        programLength: "12 weeks",
        successRate: "95%",
      },
      featured: true,
    },
    {
      id: "online-training",
      title: "Online Training",
      description:
        "Access professional guidance and workout plans from anywhere, anytime",
      image: Online_traing,
      alt: "Person doing online fitness training",
      icon: <Globe className="w-6 h-6" />,
      benefits: [
        "Train from any location",
        "24/7 workout access",
        "Digital progress tracking",
        "On-demand expert support",
      ],
      stats: {
        availability: "24/7",
        programs: "15+",
        successRate: "88%",
      },
    },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal-Focused",
      description: "Customized approaches for your specific fitness objectives",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Expert Trainers",
      description: "Certified professionals with proven track records",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Regular assessments and adjustments for optimal results",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Proven Results",
      description: "90%+ success rate across all training programs",
    },
  ];

  return (
    <section id="training" className="py-20 mt-18">
      <div className="container mx-auto px-4">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6 shadow-sm border border-blue-200">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold mb-6 ">
            Transform Your Fitness Journey
          </h2>
          <p className="text-lg  max-w-3xl mx-auto mb-12 leading-relaxed">
            Choose from our diverse range of training programs, each designed to
            deliver exceptional results while fitting perfectly into your
            lifestyle.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto overflow-hidden  ">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-purple-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-900"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-50 text-purple-600 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className=" text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Types Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 overflow-hidden py-6">
          {trainingTypes.map((type) => (
            <div
              key={type.id}
              className="rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:shadow-[0px_4px_12px_rgba(102,126,234,0.4)]
"
            >
              <div className="relative h-48 w-full group">
                <Image
                  src={type.image}
                  alt={type.alt}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 left-4 bg-purple-100 rounded-full p-2 dark:bg-gray-900">
                    {type.icon}
                  </div>
                  {type.popular && (
                    <div className="absolute top-4 right-4 bg-red-400 text-white text-sm px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  {type.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-white text-sm px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                  {type.title}
                </h3>
                <p className="  mb-4">{type.description}</p>

                <div className="space-y-3 mb-6">
                  {type.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* <div className="bg-purple-100 rounded-lg p-4 mb-6 dark:bg-gray-900">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(type.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-lg">{value}</div>
                        <div className="text-xs   capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="flex items-center justify-center pb-4">
                  <Link
                    href={`/training/${type.id}`}
                    className="w-fit px-5 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors 
                      dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900"
                  >
                    Start Training
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/training"
            className="px-6 py-3 bg-purple-50 text-purple-700 rounded-lg border border-purple-200 flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors shadow-sm
              dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-900"
          >
            Explore Training Plans
            <ClipboardList className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainingTypesSection;
