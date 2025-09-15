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
    <div className="flex flex-col items-center w-full min-h-screen bg-slate-100 text-black py-12 px-6">
      <div className="border-4 border-black rounded-2xl max-w-3xl w-full mx-4 p-10 text-center bg-white shadow-[8px_8px_0px_black]">
        <h1
          className={`${strokerFont.className} text-4xl md:text-7xl font-extrabold tracking-wide`}
        >
          Hackaphasia
        </h1>
        <p className="text-lg md:text-2xl mt-4 text-slate-700 italic">
          A 24 Hour AI Hackathon
        </p>

        <div className="h-1 w-2/3 mx-auto bg-black my-8" />

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            className="px-6 py-3 border-2 border-black rounded-lg bg-white text-black font-semibold shadow-[5px_5px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
            href="/"
          >
            Register Team
          </Link>
          <button
            className="px-6 py-3 border-2 border-black rounded-lg bg-white text-black font-semibold shadow-[5px_5px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition cursor-pointer"
            onClick={() => setShowProblems(!showProblems)}
          >
            {showProblems
              ? "Hide Problem Statements"
              : "Show Problem Statements"}
          </button>
          <Link
            className="px-6 py-3 border-2 border-black rounded-lg bg-white text-black font-semibold shadow-[5px_5px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition"
            href="/leaderboard"
          >
            Leaderboard
          </Link>
        </div>
      </div>

      {showProblems && (
        <div className="max-w-5xl w-full mt-12">
          <div className="border-4 border-black rounded-lg bg-white shadow-[6px_6px_0px_black] p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Problem Statements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {problemCategories.map((category, idx) => (
                <div key={idx} className="flex flex-col gap-6">
                  <h3 className="text-2xl font-bold px-4 py-2 bg-slate-200 border-2 border-black rounded-md shadow-[3px_3px_0px_black] text-center">
                    {category.name}
                  </h3>
                  {category.problems.map((p, i) => (
                    <ProblemCard
                      key={i}
                      title={p.title}
                      description={p.description}
                      sdgs={p.tags}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
