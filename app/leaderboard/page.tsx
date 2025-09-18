"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";

const strokerFont = localFont({ src: "../font/stroker.otf" });

type Team = {
  rank: number;
  team: string;
  score: number;
};

export default function LeaderboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setTeams(data.teams || []);
      setLastUpdated(new Date().toLocaleTimeString());
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
            <h1 className="text-4xl font-extrabold mt-2">Live Leaderboard</h1>
            <p className="text-sm italic text-slate-600 mt-2 items-center">
              Auto-refreshes every 15 seconds{" "}
              {lastUpdated && <span>- Last updated: {lastUpdated}</span>}
            </p>
          </div>

          <div className="p-6">
            {loading ? (
              <p className="text-center italic text-slate-500">Loading...</p>
            ) : teams.length === 0 ? (
              <p className="text-center italic text-slate-500">
                No data available
              </p>
            ) : (
              <ul className="space-y-3">
                {teams
                  .filter((team) => team.score > 0)
                  .map((team) => (
                    <li
                      key={team.rank}
                      className="flex items-center justify-between bg-slate-50 border-2 border-black rounded-xl px-4 py-3 hover:translate-x-1 transition-transform"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold w-8 text-center">
                          {team.rank}
                        </span>
                        <span className="font-semibold">{team.team}</span>
                      </div>
                      <span className="text-lg font-bold">{team.score}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
