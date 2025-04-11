import React from "react";
import { AlertCircle } from "lucide-react";

const ReviewInformation = ({ formData }) => {
  const SectionCard = ({ title, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );

  const InfoLabel = ({ label, value, important }) => (
    <div className="flex  items-baseline py-2 border-b border-gray-100 last:border-0">
      <div className="w-2/5 flex   items-center space-x-1">
        {important && (
          <AlertCircle className="w-3 h-3 text-purple-500 flex-shrink-0" />
        )}
        <span className=" text-sm font-medium text-gray-600">{label}:</span>
      </div>
      <div className="w-3/5 text-sm text-gray-900  ml-1">
        {value || "Not specified"}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Review Your Information
        </h2>
        <p className="text-sm text-gray-600">
          Please verify all details before proceeding
        </p>
      </div>

      <div className="space-y-6">
        {/* Training Details Summary */}
        <SectionCard title="Selected Program">
          <div className="grid grid-cols-3 gap-4 bg-purple-50 p-4 rounded-lg">
            <div>
              <div className="text-sm font-medium text-purple-600 mb-1">
                Mode
              </div>
              <div className="font-medium">
                {formData.trainingDetails.mode} Training
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-purple-600 mb-1">
                Category
              </div>
              <div className="font-medium">{formData.trainingDetails.type}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-purple-600 mb-1">
                Program
              </div>
              <div className="font-medium">
                {formData.trainingDetails.programName}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Personal Information */}
        <SectionCard title="Personal Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <div className="space-y-1">
              <InfoLabel
                label="Name"
                value={formData.personalInfo.name}
                important={true}
              />
              <InfoLabel
                label="Email"
                value={formData.personalInfo.email}
                important={true}
              />
              <InfoLabel label="Phone" value={formData.personalInfo.phone} />
              <InfoLabel label="Gender" value={formData.personalInfo.gender} />
            </div>
            <div className="space-y-1">
              <InfoLabel
                label="Date of Birth"
                value={formData.personalInfo.dateOfBirth}
              />
              <InfoLabel
                label="Height"
                value={`${formData.personalInfo.height} ${formData.personalInfo.heightUnit}`}
              />
              <InfoLabel
                label="Weight"
                value={`${formData.personalInfo.weight} ${formData.personalInfo.weightUnit}`}
              />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <InfoLabel
              label="Full Address"
              value={`${formData.personalInfo.streetAddress}, ${formData.personalInfo.city}, ${formData.personalInfo.state} ${formData.personalInfo.postalCode}, ${formData.personalInfo.country}`}
            />
          </div>
        </SectionCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fitness Goals */}
          <SectionCard title="Fitness Goals">
            <div className="space-y-1">
              <InfoLabel
                label="Specific Goals"
                value={formData.fitnessGoals.specificGoals.join(", ")}
                important={true}
              />
              <InfoLabel
                label="Timeline"
                value={formData.fitnessGoals.timeline}
              />
              {formData.fitnessGoals.targetWeight && (
                <InfoLabel
                  label="Target Weight"
                  value={`${formData.fitnessGoals.targetWeight} ${formData.fitnessGoals.targetWeightUnit}`}
                />
              )}
              {formData.fitnessGoals.targetBodyFat && (
                <InfoLabel
                  label="Target Body Fat"
                  value={`${formData.fitnessGoals.targetBodyFat}%`}
                />
              )}
              {formData.fitnessGoals.weeklyDays && (
                <InfoLabel
                  label="Weekly Training Days"
                  value={formData.fitnessGoals.weeklyDays}
                />
              )}
              {formData.fitnessGoals.additionalNotes && (
                <InfoLabel
                  label="Additional Notes"
                  value={formData.fitnessGoals.additionalNotes}
                />
              )}
            </div>
          </SectionCard>

          {/* Activity Level */}
          <SectionCard title="Activity Level">
            <div className="space-y-1">
              <InfoLabel
                label="Activity Status"
                value={
                  <span
                    className={`inline-flex px-2 py-1 rounded text-sm ${
                      formData.activityLevel.isCurrentlyActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {formData.activityLevel.isCurrentlyActive
                      ? "Currently Active"
                      : "Not Currently Active"}
                  </span>
                }
              />
              {formData.activityLevel.isCurrentlyActive && (
                <>
                  <InfoLabel
                    label="Exercise Types"
                    value={formData.activityLevel.exerciseTypes.join(", ")}
                  />
                  <InfoLabel
                    label="Training Days"
                    value={formData.activityLevel.trainingDaysPerWeek}
                  />
                  <InfoLabel
                    label="Workout Duration"
                    value={formData.activityLevel.workoutDuration}
                  />
                </>
              )}
            </div>
          </SectionCard>

          {/* Health Information */}
          <SectionCard title="Health Information">
            <div className="space-y-1">
              {!formData.healthInfo.noHealthConditions && (
                <InfoLabel
                  label="Health Conditions"
                  value={formData.healthInfo.healthConditions.join(", ")}
                  important={true}
                />
              )}
              {formData.healthInfo.otherHealthCondition && (
                <InfoLabel
                  label="Other Health Condition"
                  value={formData.healthInfo.otherHealthCondition}
                  important={true}
                />
              )}
              {formData.healthInfo.pastInjuries && (
                <InfoLabel
                  label="Past Injuries"
                  value={formData.healthInfo.pastInjuries}
                  important={true}
                />
              )}
              {formData.healthInfo.medications && (
                <InfoLabel
                  label="Medications"
                  value={formData.healthInfo.medications}
                  important={true}
                />
              )}
              {formData.healthInfo.allergies && (
                <InfoLabel
                  label="Allergies"
                  value={formData.healthInfo.allergies}
                  important={true}
                />
              )}
            </div>
          </SectionCard>

          {/* Nutrition & Lifestyle */}
          <SectionCard title="Nutrition & Lifestyle">
            <div className="space-y-1">
              <InfoLabel
                label="Dietary Preference"
                value={formData.nutritionInfo.dietaryPreference}
              />
              {formData.nutritionInfo.otherDietaryPreference && (
                <InfoLabel
                  label="Other Dietary Preference"
                  value={formData.nutritionInfo.otherDietaryPreference}
                />
              )}
              <InfoLabel
                label="Meals per Day"
                value={formData.nutritionInfo.mealsPerDay}
              />
              {formData.nutritionInfo.waterIntake && (
                <InfoLabel
                  label="Water Intake"
                  value={formData.nutritionInfo.waterIntake}
                />
              )}
              {formData.nutritionInfo.foodRestrictions && (
                <InfoLabel
                  label="Food Restrictions"
                  value={formData.nutritionInfo.foodRestrictions}
                  important={true}
                />
              )}
              {formData.nutritionInfo.supplements && (
                <InfoLabel
                  label="Supplements"
                  value={formData.nutritionInfo.supplements}
                />
              )}
              <InfoLabel
                label="Sleep Duration"
                value={`${formData.lifestyle.sleepDuration} hours`}
              />
              <InfoLabel
                label="Stress Level"
                value={formData.lifestyle.stressLevel}
              />
              <InfoLabel
                label="Occupation"
                value={formData.lifestyle.occupationType}
              />
              {formData.lifestyle.smoking && (
                <InfoLabel label="Smoking" value={formData.lifestyle.smoking} />
              )}
              {formData.lifestyle.alcohol && (
                <InfoLabel label="Alcohol" value={formData.lifestyle.alcohol} />
              )}
            </div>
          </SectionCard>
        </div>

        {/* Schedule Information */}
        {formData.scheduleInfo.assessmentDate && (
          <SectionCard title="Assessment Schedule">
            <div className="space-y-1">
              <InfoLabel
                label="Assessment Date"
                value={formData.scheduleInfo.assessmentDate}
                important={true}
              />
              <InfoLabel
                label="Assessment Time (Local)"
                value={formData.scheduleInfo.assessmentTime.local}
                important={true}
              />
              {formData.scheduleInfo.timeZoneDisplay && (
                <InfoLabel
                  label="Time Zone"
                  value={formData.scheduleInfo.timeZoneDisplay}
                />
              )}
              {formData.scheduleInfo.formattedDateTime && (
                <InfoLabel
                  label="Formatted Date & Time"
                  value={formData.scheduleInfo.formattedDateTime}
                />
              )}
              {formData.scheduleInfo.communityName && (
                <InfoLabel
                  label="Community Name"
                  value={formData.scheduleInfo.communityName}
                />
              )}
            </div>
          </SectionCard>
        )}
      </div>
    </div>
  );
};

export default ReviewInformation;
