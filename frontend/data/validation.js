import { z } from "zod";

export const formSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
    height: z.string().min(1, "Height is required"),
    heightUnit: z.enum(["cm", "inches"]),
    weight: z.string().min(1, "Weight is required"),
    weightUnit: z.enum(["kg", "lbs"]),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  fitnessGoals: z.object({
    targetWeight: z.string().optional(),
    targetWeightUnit: z.enum(["kg", "lbs"]).optional(),
    targetBodyFat: z.string().optional(),
    specificGoals: z.array(z.string()).min(1, "Please select at least one fitness goal"),
    timeline: z.string().min(1, "Please select a timeline"),
    weeklyDays: z.string().min(1, "Please select weekly training days"),
    additionalNotes: z.string().optional(),
  }),
  activityLevel: z.object({
    exerciseTypes: z.array(z.string()).optional(),
    trainingDaysPerWeek: z.string().optional(),
    workoutDuration: z.string().optional(),
    isCurrentlyActive: z.string(),
  }).refine(
    (data) => data.isCurrentlyActive === "false" || (
      data.exerciseTypes?.length > 0 &&
      data.trainingDaysPerWeek &&
      data.workoutDuration
    ),
    {
      message: "Please complete all fields if currently exercising",
      path: ["exerciseTypes"]
    }
  ),
  healthInfo: z.object({
    noHealthConditions: z.boolean(),
    healthConditions: z.array(z.string()).optional(),
    otherHealthCondition: z.string().optional(),
    pastInjuries: z.string().optional(),
    medications: z.string().optional(),
    allergies: z.string().optional(),
  }).refine(
    (data) => data.noHealthConditions || data.healthConditions?.length > 0,
    { message: "Please select at least one health condition or check 'no health conditions'", path: ["healthConditions"] }
  ).refine(
    (data) => !data.healthConditions?.includes("Other") || data.otherHealthCondition?.trim(),
    { message: "Please specify your other health condition", path: ["otherHealthCondition"] }
  ),
  nutritionInfo: z.object({
    dietaryPreference: z.string().min(1, "Please select your dietary preference"),
    otherDietaryPreference: z.string().optional(),
    waterIntake: z.string().optional(),
    mealsPerDay: z.string().min(1, "Please select your meals per day"),
    foodRestrictions: z.string().optional(),
    supplements: z.string().optional(),
  }).refine(
    (data) => data.dietaryPreference !== "other" || data.otherDietaryPreference?.trim(),
    { message: "Please specify your dietary preference", path: ["otherDietaryPreference"] }
  ),
  lifestyle: z.object({
    sleepDuration: z.string().min(1, "Please select your average sleep duration"),
    stressLevel: z.string().min(1, "Please select your stress level"),
    smoking: z.string().min(1, "Please select your smoking status"),
    alcohol: z.string().min(1, "Please select your alcohol consumption"),
    occupationType: z.string().min(1, "Please select your occupation type"),
  }),
  trainingDetails: z.object({
    mode: z.string().optional(),
    type: z.string().optional(),
    programName: z.string().optional(),
  }),
  scheduleInfo: z.object({
    assessmentDate: z.string().optional(),
    assessmentTime: z.object({
      utc: z.string(),
      local: z.string(),
      ist: z.string(),
    }).optional(),
    timeZone: z.string().optional(),
    formattedDateTime: z.string().optional(),
    timeZoneDisplay: z.string().optional(),
    communityName: z.string().optional(),
  }),
});