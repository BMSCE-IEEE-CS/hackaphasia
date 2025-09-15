"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import Link from "next/link";
import ProblemCard from "../components/ProblemCard";
import { problemCategories } from "@/lib/data";

const strokerFont = localFont({ src: "./font/stroker.otf" });

const Home = () => {
  const [showProblems, setShowProblems] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-slate-200 text-black py-12 px-4">
      <div className="border-4 border-black rounded-lg max-w-2xl w-full mx-4 p-10 text-center bg-white shadow-[6px_6px_0px_black]">
        <h1
          className={`${strokerFont.className} text-3xl md:text-6xl font-bold tracking-wider`}
        >
          Hackaphasia
        </h1>
        <p className="text-lg md:text-xl mt-4 text-slate-700 italic">
          A 24 Hour AI Hackathon
        </p>

        <div className="h-1 w-2/3 mx-auto bg-black my-8" />

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            className="px-6 py-3 border-2 border-black rounded-md bg-white text-black font-semibold shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
            href="/"
          >
            Register Team
          </Link>
          <button
            className="px-6 py-3 border-2 border-black rounded-md bg-white text-black font-semibold shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
            onClick={() => setShowProblems(!showProblems)}
          >
            {showProblems
              ? "Hide Problem Statements"
              : "Show Problem Statements"}
          </button>
          <Link
            className="px-6 py-3 border-2 border-black rounded-md bg-white text-black font-semibold shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
            href="/"
          >
            Leaderboard
          </Link>
        </div>
      </div>

      {showProblems && (
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-12 w-full px-4 md:px-12">
          {problemCategories.map((category, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-6 w-full md:w-1/2"
            >
              <h2 className="text-3xl font-bold underline">{category.name}</h2>
              <div className="flex flex-col items-center gap-6 w-full">
                {category.problems.map((p, i) => (
                  <ProblemCard
                    key={i}
                    title={p.title}
                    description={p.description}
                    sdgs={p.tags}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
