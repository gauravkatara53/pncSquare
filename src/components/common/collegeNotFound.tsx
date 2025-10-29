"use client";

import React from "react";
import LottieAnimation from "@/components/common/LottieAnimation";
import loadingAnimation from "../../../public/NoResultsFound.json";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center  bg-gray-50">
      <LottieAnimation
        animationData={loadingAnimation}
        className="w-84 h-84 -mt-20 sm:-mt-56"
      />
      <p className="text-gray-600 text-sm md:text-lg mb-10">
        Can&#39;t find your college?{" "}
        <a
          href="https://forms.zohopublic.in/gauravkatara53zoho1/form/ProductFeedback/formperma/Xvd11RzQXqlj3t7KnzAU482GYGrll1oSK8V0NHLajqg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Suggest it here
        </a>
        .
      </p>
    </main>
  );
}
