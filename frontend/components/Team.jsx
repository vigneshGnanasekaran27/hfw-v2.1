import React from "react";
import Image from "next/legacy/image";
import {
  Linkedin,
  X,
  Instagram,
  Medal,
  Target,
  Users,
  Heart,
  Youtube,
} from "lucide-react";

const FounderSection = () => {
  const founderInfo = {
    name: "Vignesh Gnanasekaran",
    role: "Founder & CEO",
    image: "",
    bio: "Passionate about transforming lives through fitness and wellness. With expertise in personal training and nutrition, I founded HopeFit Wellness to help people achieve their health goals through personalized, science-based approaches.",
    achievements: [
      "Certified Personal Trainer",
      "Nutrition Specialist",
      "4+ Years Industry Experience",
      "Helped 100+ Clients Transform",
    ],
    values: [
      {
        icon: <Target className="w-6 h-6" />,
        title: "Mission-Driven",
        description:
          "Committed to making health and fitness accessible to everyone",
      },
      {
        icon: <Heart className="w-6 h-6" />,
        title: "Client-Focused",
        description: "Dedicated to providing personalized attention and care",
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Community Builder",
        description:
          "Creating a supportive environment for sustainable success",
      },
    ],
    social: {
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
  };

  return (
    <section className="py-20 " id="leadership">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-teal-100 rounded-full mb-6 shadow-sm border border-teal-200">
            <Medal className="w-8 h-8 text-teal-600  " />
          </div>
          <h2 className="text-4xl font-bold mb-6 ">Leadership & Vision</h2>
          <p className="text-lg text-black  dark:text-white max-w-3xl mx-auto">
            Building a community of health and wellness through expert guidance
            and personalized care.
          </p>
        </div>

        {/* Founder Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={founderInfo.image.src}
                  alt={founderInfo.name}
                  layout="fill"
                  objectFit="cover"
                  className="transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Achievement Badge */}
              {/* <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 md:p-6 overflow-hidden">
                <p className="text-primary font-bold text-xl md:text-2xl">4+</p>
                <p className="text-gray-600 text-sm">Years Experience</p>
              </div> */}
            </div>

            {/* Content Column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">{founderInfo.name}</h3>
                <p className="text-xl text-primary mb-6">{founderInfo.role}</p>
                <p className="text-black  dark:text-white leading-relaxed mb-8">
                  {founderInfo.bio}
                </p>
              </div>

              {/* Achievements */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold mb-4">
                  Achievements & Certifications
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {founderInfo.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Medal className="w-5 h-5 text-primary" />
                      <span className="text-black  dark:text-white">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold">Core Values</h4>
                <div className="grid gap-6">
                  {founderInfo.values.map((value, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                        {value.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold mb-1">{value.title}</h5>
                        <p className="text-black  dark:text-white">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a
                  href={founderInfo.social.linkedin}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-500 hover:text-blue-700" />
                </a>
                <a
                  href={founderInfo.social.twitter}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  title="Twitter"
                >
                  <X className="w-6 h-6 text-black dark:text-gray-200 hover:text-blue-500" />
                </a>
                <a
                  href={founderInfo.social.instagram}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-6 h-6 text-pink-600 dark:text-pink-500 hover:text-pink-700" />
                </a>
                <a
                  href={founderInfo.social.youtube}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  title="Youtube"
                >
                  <Youtube className="w-6 h-6 text-red-600 dark:text-red-500 hover:text-red-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Future Growth Note */}
          <div className="mt-20 text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Growing Together</h3>
            <p className="text-black  dark:text-white max-w-2xl mx-auto">
              As HopeFit Wellness continues to grow, we're excited about
              building a team of passionate professionals dedicated to
              transforming lives through fitness and wellness. Stay tuned for
              new additions to our family.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
