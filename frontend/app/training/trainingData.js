export const trainingData = {
  offline: {
    categories: [
      {
        id: "group",
        title: "Group Training",
        description:
          "Join our energetic group sessions for motivation and results",
        programs: [
          {
            id: "group-fat-loss",
            title: "Fat Loss Program",
            description:
              "Intensive group training focused on sustainable fat loss",
            mode: "offline",
            image: "/training/group-fat-loss.jpg",
            fullDescription:
              "Our comprehensive fat loss program combines high-intensity interval training, metabolic resistance training, and strategic nutrition guidance to help you achieve sustainable fat loss results.",
            program_structure: {
              phase1: {
                title: "Foundation Phase (Weeks 1-3)",
                focus: "Building baseline fitness and establishing proper form",
                components: [
                  "Initial body composition assessment",
                  "Introduction to basic movement patterns",
                  "Cardiovascular base building",
                  "Nutrition fundamentals workshop",
                  "Heart rate zone training introduction",
                ],
                workouts: [
                  "2 full-body resistance sessions",
                  "1 cardio-focused session",
                  "Basic mobility work",
                ],
              },
              phase2: {
                title: "Fat Loss Acceleration (Weeks 4-8)",
                focus:
                  "Increasing workout intensity and metabolic conditioning",
                components: [
                  "Progressive overload introduction",
                  "HIIT workout integration",
                  "Advanced movement patterns",
                  "Nutrition plan adjustment",
                  "Recovery techniques workshop",
                ],
                workouts: [
                  "2 metabolic resistance sessions",
                  "2 HIIT sessions",
                  "1 active recovery session",
                ],
              },
              phase3: {
                title: "Peak Performance (Weeks 9-12)",
                focus: "Maximizing fat loss and maintaining muscle",
                components: [
                  "Complex movement combinations",
                  "Peak intensity intervals",
                  "Advanced resistance training",
                  "Final assessment preparation",
                  "Long-term sustainability planning",
                ],
                workouts: [
                  "3 high-intensity metabolic sessions",
                  "2 strength maintenance sessions",
                  "Strategic recovery protocols",
                ],
              },
            },
            benefits: [
              "Structured fat loss progression",
              "Body composition tracking",
              "Group accountability",
              "Nutritional guidance",
              "Regular progress assessments",
            ],
            features: [
              "HIIT and circuit training",
              "Metabolic resistance exercises",
              "Heart rate zone training",
              "Progress tracking via InBody scans",
              "Nutrition workshops",
            ],
            schedule_details: {
              duration: "12 weeks recommended",
              frequency: "3 sessions/week",
              availability: "Morning and evening batches",
              timings: "6 AM - 8 PM (Mon-Sat)",
            },
            ideal_for: [
              "Those with specific fat loss goals",
              "People looking for structured progression",
              "Individuals who thrive in group settings",
              "Those seeking sustainable lifestyle changes",
            ],
          },
          {
            id: "general-training",
            title: "General Training Program",
            description:
              "Balanced fitness program for overall health and strength",
            mode: "offline",
            image: "/training/general-training.jpg",
            fullDescription:
              "A well-rounded fitness program incorporating strength training, cardiovascular conditioning, and functional movement patterns to improve overall fitness and daily performance.",
            program_structure: {
              phase1: {
                title: "Foundation Building (Weeks 1-4)",
                focus: "Establishing proper form and building basic strength",
                components: [
                  "Movement pattern assessment",
                  "Basic strength training introduction",
                  "Cardiovascular fitness baseline",
                  "Core stability work",
                  "Flexibility assessment",
                ],
                workouts: [
                  "2 full-body strength sessions",
                  "1 cardio endurance session",
                  "Daily mobility work",
                ],
              },
              phase2: {
                title: "Strength Development (Weeks 5-8)",
                focus: "Progressive overload and exercise variation",
                components: [
                  "Intermediate strength training",
                  "Circuit training introduction",
                  "Endurance development",
                  "Balance and coordination work",
                  "Nutrition optimization",
                ],
                workouts: [
                  "2 split strength sessions",
                  "1 high-intensity circuit",
                  "1 endurance session",
                ],
              },
              phase3: {
                title: "Performance Enhancement (Weeks 9-12)",
                focus: "Integrating multiple fitness components",
                components: [
                  "Advanced strength techniques",
                  "Power development",
                  "Complex movement patterns",
                  "Sports-specific conditioning",
                  "Performance testing",
                ],
                workouts: [
                  "2 advanced strength sessions",
                  "1 power/plyometric session",
                  "1 sport-specific conditioning",
                ],
              },
            },
            benefits: [
              "Balanced full-body workouts",
              "Improved strength and endurance",
              "Better functional movement",
              "Enhanced flexibility",
              "Increased energy levels",
            ],
            features: [
              "Progressive resistance training",
              "Functional movement patterns",
              "Cardio conditioning",
              "Mobility work",
              "Core strengthening",
            ],
            schedule_details: {
              duration: "Ongoing program",
              frequency: "3 sessions/week",
              availability: "Multiple daily sessions",
              timings: "6 AM - 8 PM (Mon-Sat)",
            },
            ideal_for: [
              "Beginners to intermediate fitness enthusiasts",
              "Those seeking overall fitness improvement",
              "People wanting balanced workouts",
              "Anyone looking to establish a fitness routine",
            ],
          },
          {
            id: "kids-group",
            title: "Kids Fitness Program",
            description: "Fun and engaging fitness sessions for children",
            mode: "offline",
            image: "/training/kids-group.jpg",
            fullDescription:
              "Age-appropriate fitness program designed to develop fundamental movement skills, build confidence, and foster a love for physical activity in children aged 6-12 years.",
            program_structure: {
              phase1: {
                title: "Movement Fundamentals (Weeks 1-4)",
                focus: "Building basic movement skills through play",
                components: [
                  "Basic locomotor movements",
                  "Balance and coordination games",
                  "Introduction to bodyweight exercises",
                  "Team-building activities",
                  "Fun fitness assessments",
                ],
                activities: [
                  "Animal movement games",
                  "Balance challenges",
                  "Basic gymnastics",
                  "Team sports introduction",
                ],
              },
              phase2: {
                title: "Skill Development (Weeks 5-8)",
                focus: "Developing specific physical skills",
                components: [
                  "Advanced movement patterns",
                  "Sports-specific skills",
                  "Strength through play",
                  "Agility development",
                  "Team sports skills",
                ],
                activities: [
                  "Modified sports games",
                  "Obstacle courses",
                  "Partner exercises",
                  "Speed and agility drills",
                ],
              },
              phase3: {
                title: "Active Play Integration (Weeks 9-12)",
                focus: "Combining skills with fun challenges",
                components: [
                  "Complex movement combinations",
                  "Team challenges",
                  "Fitness games",
                  "Sports tournaments",
                  "Final skills showcase",
                ],
                activities: [
                  "Mini-Olympics",
                  "Team challenges",
                  "Sports matches",
                  "Fitness achievements celebration",
                ],
              },
            },
            benefits: [
              "Development of motor skills",
              "Improved coordination",
              "Enhanced social skills",
              "Increased confidence",
              "Healthy lifestyle habits",
            ],
            features: [
              "Fun fitness games",
              "Basic bodyweight exercises",
              "Team activities",
              "Sports fundamentals",
              "Movement skill development",
            ],
            schedule_details: {
              duration: "12 weeks",
              frequency: "2 sessions/week",
              availability: "After-school hours",
              timings: "4 PM - 6 PM (Mon-Fri)",
            },
            ideal_for: [
              "Children aged 6-12 years",
              "Kids new to fitness",
              "Active children",
              "Those seeking physical development",
            ],
          },
          {
            id: "fitness-bootcamp",
            title: "Monthly Fitness Bootcamp",
            description: "Intensive one-day fitness experience",
            mode: "offline",
            image: "/training/fitness-bootcamp.jpg",
            fullDescription:
              "An intensive one-day bootcamp held monthly, combining various training styles for a challenging and motivating fitness experience. Perfect for testing your limits and learning new training techniques.",
            program_structure: {
              morning_session: {
                title: "Morning Power Session (7 AM - 10 AM)",
                focus: "High-intensity conditioning and strength work",
                components: [
                  "Dynamic warm-up (30 mins)",
                  "HIIT circuits (60 mins)",
                  "Strength challenges (60 mins)",
                  "Team competitions (30 mins)",
                ],
              },
              mid_session: {
                title: "Mid-Day Skills (10:30 AM - 12 PM)",
                focus: "Skill development and technique work",
                components: [
                  "Olympic lifting basics (45 mins)",
                  "Mobility work (30 mins)",
                  "Technique workshops (15 mins)",
                ],
              },
              afternoon_session: {
                title: "Afternoon Finale (12:30 PM - 2 PM)",
                focus: "Team challenges and final push",
                components: [
                  "Team challenges (45 mins)",
                  "Final workout (30 mins)",
                  "Cool-down and recovery (15 mins)",
                ],
              },
            },
            benefits: [
              "Intensive full-body workout",
              "New exercise techniques",
              "Community experience",
              "Mental toughness development",
              "Fitness assessment opportunity",
            ],
            features: [
              "Mixed training modalities",
              "Team challenges",
              "Fitness assessments",
              "Nutrition seminar",
              "Take-home workout plan",
            ],
            schedule_details: {
              duration: "One full day",
              frequency: "Once per month",
              availability: "Last Saturday of each month",
              timings: "7 AM - 2 PM",
            },
            ideal_for: [
              "Fitness enthusiasts of all levels",
              "Those seeking new challenges",
              "People wanting to test their fitness",
              "Social exercisers",
            ],
          },
        ],
      },
    ],
  },

  online: {
    categories: [
      {
        id: "one-on-one",
        title: "One-on-One Training",
        description:
          "Personalized training sessions tailored to your specific needs",
        programs: [
          {
            id: "hybrid-program",
            title: "Hybrid Training Program",
            description: "Blend of live sessions and guided workouts",
            mode: "online",
            image: "/training/hybrid-program.jpg",
            fullDescription:
              "Perfect balance of live personal training and guided workouts, offering flexibility while maintaining accountability and expert guidance. Includes comprehensive exercise programming and nutrition support.",
            program_structure: {
              phase1: {
                title: "Assessment and Foundation (Weeks 1-3)",
                focus: "Establishing baseline and learning proper form",
                components: [
                  "Initial fitness assessment",
                  "Movement pattern screening",
                  "Equipment setup and familiarization",
                  "Basic exercise technique training",
                  "Workout tracking system setup",
                ],
                sessions: {
                  live: "Form correction and program adjustments",
                  guided: "Basic strength and conditioning workouts",
                },
              },
              phase2: {
                title: "Progressive Development (Weeks 4-8)",
                focus: "Building strength and improving conditioning",
                components: [
                  "Progressive overload introduction",
                  "Advanced exercise variations",
                  "Intensity techniques",
                  "Nutrition optimization",
                  "Recovery protocols",
                ],
                sessions: {
                  live: "Technique refinement and progression updates",
                  guided: "Structured strength and HIIT workouts",
                },
              },
              phase3: {
                title: "Advanced Integration (Weeks 9-12)",
                focus: "Optimizing performance and results",
                components: [
                  "Complex movement patterns",
                  "Peak performance protocols",
                  "Advanced programming",
                  "Final assessment preparation",
                  "Long-term planning",
                ],
                sessions: {
                  live: "Performance optimization and goal setting",
                  guided: "Specialized workouts based on goals",
                },
              },
            },
            benefits: [
              "Flexible scheduling",
              "Personalized attention",
              "Guided independent workouts",
              "Regular progress tracking",
              "Nutrition guidance",
            ],
            features: [
              "2 live sessions per week",
              "Custom workout plans",
              "Form correction",
              "Progress tracking app",
              "24/7 chat support",
            ],
            schedule_details: {
              duration: "12 weeks recommended",
              frequency: "2 live sessions + 3 guided workouts/week",
              availability: "Flexible scheduling",
              timings: "6 AM - 9 PM (Mon-Sat)",
            },
            ideal_for: [
              "Busy professionals",
              "Those needing flexibility",
              "Self-motivated individuals",
              "People with varying schedules",
            ],
          },
          {
            id: "full-live-program",
            title: "Full Live Training Program",
            description: "Complete personal training experience online",
            mode: "online",
            image: "/training/full-live-program.jpg",
            fullDescription:
              "Comprehensive online personal training with daily live sessions, offering maximum accountability and support. Includes detailed progress tracking, nutrition planning, and constant form feedback.",
            benefits: [
              "Maximum accountability",
              "Daily expert guidance",
              "Real-time form correction",
              "Comprehensive support",
              "Rapid progress",
            ],
            features: [
              "5 live sessions per week",
              "Detailed progress tracking",
              "Nutrition planning",
              "Recovery guidance",
              "Priority support",
            ],
            schedule_details: {
              duration: "12 weeks recommended",
              frequency: "5 live sessions/week",
              availability: "Morning and evening slots",
              timings: "6 AM - 9 PM (Mon-Fri)",
            },
            ideal_for: [
              "Those seeking maximum guidance",
              "People with specific goals",
              "Individuals needing accountability",
              "Dedicated fitness enthusiasts",
            ],
          },
        ],
      },
      {
        id: "group",
        title: "Group Training",
        description:
          "Join our energetic group sessions for motivation and results",
        programs: [
          {
            id: "group-mobility-stretching",
            title: "Mobility & Stretching Program",
            description: "Improve flexibility and movement quality",
            mode: "online",
            image: "/training/mobility-stretching.jpg",
            fullDescription:
              "Focused program combining dynamic mobility work and strategic stretching to improve flexibility, reduce pain, and enhance overall movement quality. Perfect for both active individuals and those with sedentary lifestyles.",
            benefits: [
              "Improved flexibility",
              "Better joint mobility",
              "Reduced muscle tension",
              "Enhanced recovery",
              "Pain reduction",
            ],
            features: [
              "Dynamic mobility work",
              "Strategic stretching",
              "Recovery techniques",
              "Posture improvement",
              "Movement assessments",
            ],
            schedule_details: {
              duration: "8 weeks recommended",
              frequency: "3 sessions/week",
              availability: "Morning and evening sessions",
              timings: "6 AM - 8 PM (Mon-Fri)",
            },
            ideal_for: [
              "Those with limited mobility",
              "Active individuals needing recovery",
              "People with sedentary jobs",
              "Anyone seeking better movement quality",
            ],
          },
        ],
      },
    ],
  },
};
