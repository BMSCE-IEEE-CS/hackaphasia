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
  const range = "Sheet1!A:G";

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];

  const teams = rows.slice(1).map((row, idx) => ({
    rank: idx + 1,
    team: row[0],
    score: Number(row[6]) || 0,
  }));

  teams.sort((a, b) => b.score - a.score);
  teams.forEach((t, i) => (t.rank = i + 1));

  return teams;
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
