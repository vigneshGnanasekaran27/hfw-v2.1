"use client";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import React, { useState } from "react";

const AddressPage = () => {
  console.log("Google Sign In button clicked");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-xs w-full relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl">
          &times;
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Sign in to continue
        </h3>
        <GoogleSignInButton />
      </div>
    </div>
  );
};

export default AddressPage;
