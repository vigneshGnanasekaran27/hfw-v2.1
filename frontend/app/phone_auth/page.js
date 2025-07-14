"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDoVZo0QI1V9Dkk7VPH35wBhQ61RmqQb4I",
  authDomain: "intense-pointer-266409.firebaseapp.com",
  projectId: "intense-pointer-266409",
  storageBucket: "intense-pointer-266409.appspot.com",
  messagingSenderId: "1040322452252",
  appId: "1:1040322452252:web:c77e8a7c9977aec7fdb8d9",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function PhoneAuthPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Setup reCAPTCHA
  useEffect(() => {
    if (typeof window !== "undefined" && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved");
          },
        }
      );

      window.recaptchaVerifier.render().catch(console.error);
    }
  }, []);

  // ✅ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const isValidPhone = /^\+[1-9]\d{1,14}$/;

    if (!isValidPhone.test(phone)) {
      setMessage("Invalid phone number format. Use +<countrycode><number>");
      setLoading(false);
      return;
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmation(confirmationResult);
      setMessage("OTP sent!");
    } catch (err) {
      console.error(err);
      setMessage("Error sending OTP: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP and send ID token to backend
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await confirmation.confirm(otp);
      const user = auth.currentUser;

      if (user) {
        const idToken = await user.getIdToken(); // ✅ Get Firebase ID token
        console.log("User:", user);
        console.log("ID Token:", idToken);

        // ✅ Send to backend
        const res = await fetch(
          "http://localhost:3000/api/firebase_auth/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          }
        );

        const data = await res.json();
        if (res.ok) {
          console.log("Backend verified:", data);
          setMessage("✅ Phone number verified and backend trusted the token.");
        } else {
          console.error("Backend rejected token:", data);
          setMessage("❌ Verification failed at server: " + data.error);
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>📱 Phone Number OTP Authentication</h2>

      <form onSubmit={confirmation ? handleVerifyOtp : handleSendOtp}>
        {!confirmation ? (
          <>
            <input
              type="tel"
              placeholder="+91xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ padding: "8px", marginBottom: "1rem", width: "250px" }}
            />
            <div id="recaptcha-container"></div>
            <br />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "10px 20px" }}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ padding: "8px", marginBottom: "1rem", width: "150px" }}
            />
            <br />
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "10px 20px" }}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </form>

      {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
    </div>
  );
}
