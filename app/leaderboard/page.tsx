"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";

const strokerFont = localFont({ src: "../font/stroker.otf" });

type Team = {
  rank: number;
  team: string;
  score: number;
  category: string;
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setTeams(data.teams || []);
    } catch (err) {
      console.error("Failed to load leaderboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-black py-10 px-4">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <h1
          className={`${strokerFont.className} text-4xl md:text-6xl font-bold tracking-wider`}
        >
          Hackaphasia
        </h1>
        <p className="text-lg md:text-xl mt-2 text-slate-700 italic">
          A 24 Hour AI Hackathon
        </p>
        <div className="bg-white rounded-2xl shadow-[6px_6px_0px_black] border-4 border-black w-full mt-4">
          <div className="flex flex-col items-center py-6 border-b-4 border-black text-center">
            <h1 className="text-4xl font-extrabold mt-2">Leaderboard</h1>
          </div>

          <div className="flex justify-around mt-4">
            {/* Healthcare Column */}
            <div className="w-1/2 text-center">
              <h2 className="text-2xl font-bold mb-4">Healthcare</h2>
              {loading ? (
                <p className="text-center italic text-slate-500">Loading...</p>
              ) : teams.filter((team) => team.category === "Healthcare")
                  .length === 0 ? (
                <p className="text-center italic text-slate-500">
                  No data available
                </p>
              ) : (
                <ul className="space-y-3 m-2">
                  {teams
                    .filter((team) => team.category === "Healthcare")
                    .map((team) => (
                      <li
                        key={team.rank}
                        className="flex items-center justify-between bg-slate-50 border-2 border-black rounded-xl px-4 py-3 hover:translate-x-1 transition-transform"
                      >
                        <span className="text-lg font-bold">{team.rank}</span>
                        <span className="font-semibold">{team.team}</span>
                        <span className="text-lg font-bold">{team.score}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Agritech Column */}
            <div className="w-1/2 text-center">
              <h2 className="text-2xl font-bold mb-4">Agritech</h2>
              {loading ? (
                <p className="text-center italic text-slate-500">Loading...</p>
              ) : teams.filter((team) => team.category === "Agritech")
                  .length === 0 ? (
                <p className="text-center italic text-slate-500">
                  No data available
                </p>
              ) : (
                <ul className="space-y-3 m-2">
                  {teams
                    .filter((team) => team.category === "Agritech")
                    .map((team) => (
                      <li
                        key={team.rank}
                        className="flex items-center justify-between bg-slate-50 border-2 border-black rounded-xl px-4 py-3 hover:translate-x-1 transition-transform"
                      >
                        <span className="text-lg font-bold">{team.rank}</span>
                        <span className="font-semibold">{team.team}</span>
                        <span className="text-lg font-bold">{team.score}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
