"use client";
import React from "react";
import Image from "next/legacy/image";
import { ArrowRight, Clock, Users, CheckCircle, MapPin } from "lucide-react";
import { trainingData } from "../trainingData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ProgramPage = ({ params }) => {
  const [program, setProgram] = useState(null);
  const router = useRouter();
  const { user, loading } = useAuth();

  // Find the program from the data
  useEffect(() => {
    if (params?.program) {
      const fetchedProgram = findProgramBySlug(params.program);
      setProgram(fetchedProgram);
    }
  }, [params]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Program not found</h1>
      </div>
    );
  }

  const handleJoinClick = () => {
    // Check if user is logged in using AuthContext
    if (!user) {
      // User is not logged in, redirect to login page with query parameters
      const currentPath = window.location.pathname;

      // Build query parameters for the login page
      const queryParams = new URLSearchParams({
        redirect: currentPath,
        programTitle: program.title,
      }).toString();

      // Redirect to the login page with query parameters
      router.push(`/auth/signin?${queryParams}`);
      return;
    }

    // User is logged in, proceed with normal flow
    proceedToJoin();
  };

  const proceedToJoin = () => {
    // Determine if the program is from online or offline category
    const mode = program.mode?.includes("online") ? "online" : "offline";

    // Determine if it's group or one-on-one based on program type
    const type = program.id.toLowerCase().includes("group")
      ? "group"
      : "one-on-one";

    // Create the URL with query parameters
    const queryParams = new URLSearchParams({
      mode: mode,
      type: type,
      program: slugify(program.title),
    }).toString();

    window.location.href = `/join/${queryParams}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rest of your component remains the same */}
      {/* ... */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        <div>
          <div className="relative h-64">
            <Image
              src={program.image}
              alt={program.title}
              fill
              width={500}
              height={300}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
              <p className="text-gray-600">{program.fullDescription}</p>
            </div>

            {/* Program Structure Section */}
            {program.program_structure && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-purple-600">
                  Program Structure
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(program.program_structure).map(
                    ([phaseKey, phase]) => (
                      <div
                        key={phaseKey}
                        className="bg-purple-50 rounded-xl p-6 border-2 border-purple-100"
                      >
                        {/* Existing phase content structure */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-600 p-2 rounded-lg">
                              <Clock className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-purple-800">
                                {phase.title}
                              </h3>
                              <p className="text-purple-600 font-medium">
                                Focus: {phase.focus}
                              </p>
                            </div>
                          </div>
                          <div className="pl-4 space-y-4">
                            {phase.components && (
                              <div>
                                <h6 className="font-semibold text-gray-700 mb-2">
                                  Key Components:
                                </h6>
                                <ul className="space-y-2">
                                  {phase.components.map((component, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                                      <span className="text-gray-600">
                                        {component}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {phase.workouts && (
                              <div>
                                <h6 className="font-semibold text-gray-700 mb-2">
                                  Workouts:
                                </h6>
                                <ul className="space-y-2">
                                  {phase.workouts.map((workout, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5" />
                                      <span className="text-gray-600">
                                        {workout}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {phase.activities && (
                              <div>
                                <h6 className="font-semibold text-gray-700 mb-2">
                                  Activities:
                                </h6>
                                <ul className="space-y-2">
                                  {phase.activities.map((activity, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2"
                                    >
                                      <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5" />
                                      <span className="text-gray-600">
                                        {activity}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {phase.sessions && (
                              <div>
                                <h6 className="font-semibold text-gray-700 mb-2">
                                  Sessions:
                                </h6>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                                    <div>
                                      <span className="font-medium">
                                        Live Sessions:{" "}
                                      </span>
                                      <span className="text-gray-600">
                                        {phase.sessions.live}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                                    <div>
                                      <span className="font-medium">
                                        Guided Workouts:{" "}
                                      </span>
                                      <span className="text-gray-600">
                                        {phase.sessions.guided}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Benefits, Schedule, and Ideal For sections grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Key Benefits</h4>
                </div>
                <ul className="space-y-3">
                  {program.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Schedule</h4>
                </div>
                <div className="space-y-3">
                  {Object.entries(program.schedule_details).map(
                    ([key, value]) => (
                      <div key={key}>
                        <span className="font-semibold capitalize">
                          {key.replace("_", " ")}:{" "}
                        </span>
                        {value}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-purple-500" />
                  <h4 className="text-lg font-bold">Perfect For</h4>
                </div>
                <ul className="space-y-3">
                  {program.ideal_for.map((ideal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>{ideal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={handleJoinClick}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-700 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions remain the same
function findProgramBySlug(slug) {
  const allPrograms = [
    ...trainingData.online.categories.flatMap((cat) => cat.programs),
    ...trainingData.offline.categories.flatMap((cat) => cat.programs),
  ];
  return allPrograms.find((program) => slugify(program.title) === slug);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default ProgramPage;
