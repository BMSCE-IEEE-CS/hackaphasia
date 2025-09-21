import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
import { NextResponse } from "next/server";

async function getLeaderboardData() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;

  console.log("Spreadsheet ID:", spreadsheetId);

  const range = "Sheet1!A:D"; 

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];

  const healthcareTeams = rows.slice(1).map((row, idx) => ({
    rank: idx + 1,
    team: row[0], // Column A Healthcare Team Name
    score: Number(row[1]) || 0, // Column B Healthcare Total Score
    category: "Healthcare",
  }));

 
  const agritechTeams = rows.slice(1).map((row, idx) => ({
    rank: idx + 1,
    team: row[2], // Column C Agritech Team Name
    score: Number(row[3]) || 0, // Column D Agritech Total Score
    category: "Agritech",
  }));

  const allTeams = [...healthcareTeams, ...agritechTeams];
  allTeams.sort((a, b) => b.score - a.score);

  const healthcareRanked = healthcareTeams
    .sort((a, b) => b.score - a.score)
    .map((team, idx) => ({ ...team, rank: idx + 1 }));

  const agritechRanked = agritechTeams
    .sort((a, b) => b.score - a.score)
    .map((team, idx) => ({ ...team, rank: idx + 1 }));

  return [...healthcareRanked, ...agritechRanked];
}

export async function GET() {
  try {
    const teams = await getLeaderboardData();
    return NextResponse.json({ teams });
  } catch (err) {
    console.error("Failed to fetch:", err);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}