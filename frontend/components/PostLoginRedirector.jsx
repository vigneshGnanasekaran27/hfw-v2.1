"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function PostLoginRedirector() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && typeof window !== "undefined") {
      const redirect = localStorage.getItem("postLoginRedirect");
      if (redirect) {
        // Don't redirect to sign-in page or any unwanted page
        try {
          const url = new URL(redirect, window.location.origin);
          if (
            url.pathname !== "/auth/signin" && // adjust this path as needed
            url.pathname !== "/signin"
          ) {
            localStorage.removeItem("postLoginRedirect");
            window.location.replace(redirect);
          } else {
            localStorage.removeItem("postLoginRedirect");
          }
        } catch {
          // fallback: just remove if invalid
          localStorage.removeItem("postLoginRedirect");
        }
      }
    }
  }, [user, loading]);

  return null;
}