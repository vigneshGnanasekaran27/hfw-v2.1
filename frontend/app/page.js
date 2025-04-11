"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navigation from "../components/Navigation";
import SlidingBanner from "../components/SlidingBanner";
import KitchenSection from "../components/KitchenSection";
import ShopSection from "../components/ShopSection";
import WorkshopSection from "../components/WorkshopSection";
import EventSection from "../components/EventSection";
import BlogSection from "../components/BlogSection";
import TestimonialSection from "../components/TestimonialSection";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import Team from "../components/Team";
import AboutUs from "@/components/AboutUs";
import FAQSection from "@/components/FAQSection";
import CTAPopup from "@/components/CTAPopup";
import NutritionConsultation from "../components/NutritionConsultation";
import WorkoutSchedulesSection from "@/components/WorkoutSchedulesSection";
import TrainingSection from "@/components/TrainingSection";
import CalculatorLanding from "@/components/CalculatorLanding";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Show loading state while checking auth
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is logged in, don't render the page (redirect will happen)
  if (user) {
    return null;
  }

  const offers = [
    "20% off first purchase",
    "Free shipping on orders over $50",
    "Buy one, get one 50% off",
  ];

  return (
    <>
      <Navigation />
      <SlidingBanner />
      <KitchenSection />
      <TrainingSection />
      <NutritionConsultation />
      <WorkoutSchedulesSection />
      <CalculatorLanding />
      <ShopSection />
      <WorkshopSection />
      <EventSection />
      <BlogSection />
      <TestimonialSection />
      <AboutUs />
      <Team />
      <ContactUs />
      <FAQSection />
      <CTAPopup offers={offers} />
      <Footer />
    </>
  );
}