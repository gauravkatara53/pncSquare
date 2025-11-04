"use client";

import React from "react";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center  bg-gray-50">
      <section className="flex flex-col items-center justify-center">
        <Image
          src="https://ik.imagekit.io/ak2ol9uti/PNC-MANUL/college-no-found.png"
          alt="No college"
          width={1200}
          height={800}
          quality={70}
          sizes="(max-width:600px) 480px, (max-width:1200px) 800px, 1200px"
          style={{ width: "70%", height: "auto" }}
        />
        <p className="mt-6 text-lg text-slate-600 text-center">
          Can&#39;t find your college?{" "}
          <a
            href="https://linkly.link/2HYiw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Suggest it here
          </a>
          .
        </p>
      </section>
    </main>
  );
}
