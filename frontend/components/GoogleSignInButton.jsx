// components/GoogleSignInButton.jsx
import React, { useEffect } from "react";

function GoogleSignInButton({ className }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "699123497712-4f2fadd3rkvp3kg3o6ic7ubl4feh36h5.apps.googleusercontent.com",
        ux_mode: "redirect",
        login_uri: "https://hfw-v2-1-backend.onrender.com/api/auth/google_signin",
        auto_prompt: false,
        // No dynamic redirect_url in login_uri
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          type: "standard",
          size: "large",
          theme: "outline",
          text: "sign_in_with",
          shape: "rectangular",
          logo_alignment: "left",
        }
      );

      // Attach click handler to store redirect path before login
      const btn = document.getElementById("google-signin-button");
      if (btn) {
        btn.addEventListener("click", () => {
          if (typeof window !== "undefined") {
            localStorage.setItem("postLoginRedirect", window.location.href);
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="google-signin-button"
      className={`w-full flex items-center justify-center ${className}`}
    />
  );
}

export default GoogleSignInButton;