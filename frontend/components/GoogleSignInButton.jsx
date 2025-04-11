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
        login_uri: "http://localhost:3000/api/auth/google_signin",
        auto_prompt: false,
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