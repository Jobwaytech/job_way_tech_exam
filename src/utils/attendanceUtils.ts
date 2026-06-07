import { dataAPI } from "../services/api";

// Parse time like "11:20:28 AM" → Date object
const parseTimeToDate = (timeStr: string): Date => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes, seconds] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(1970, 0, 1, hours, minutes, seconds);
};

const calculateTotalSeconds = (
  sessions: { login: string; logout: string }[],
  includeCurrent = false,
): number => {
  let totalSec = 0;

  for (let { login, logout } of sessions) {
    if (!login || (!logout && !includeCurrent)) continue;

    try {
      const loginDate = parseTimeToDate(login);
      const logoutDate = logout
        ? parseTimeToDate(logout)
        : parseTimeToDate(new Date().toLocaleTimeString());

      let diff = (logoutDate.getTime() - loginDate.getTime()) / 1000;
      if (diff < 0) diff += 86400;

      totalSec += diff;
    } catch (err) {
      console.error("⛔ Time parse error", err);
    }
  }

  return totalSec;
};

// Format seconds to "Xh Ym Zs"
const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
};

// Determine status by total seconds
const getDayStatus = (seconds: number): "Present" | "Half Day" | "Absent" => {
  const hours = seconds / 3600;
  if (hours >= 9) return "Present";
  if (hours >= 4.5) return "Half Day";
  return "Absent";
};

// ✅ Main Function to Generate Monthly Summary
export const generateMonthlySummary = async (
  userId: string,
  yearMonth: string,
) => {
  console.log(
    `⚙️ Generating monthly summary for: ${userId}, month: ${yearMonth}`,
  );

  const [year, month] = yearMonth.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  const attendanceRows = await dataAPI.list("attendance");

  let presentDays = 0,
    halfDays = 0,
    absentDays = 0,
    totalSeconds = 0;

  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${yearMonth}-${String(d).padStart(2, "0")}`;
    const data = attendanceRows.find(
      (row: any) =>
        row.id === `${userId}_${date}` ||
        row._id === `${userId}_${date}` ||
        row.key === `${userId}_${date}` ||
        (row.userId === userId && row.date === date),
    );

    if (!data) {
      continue;
    }

    const sessions = data.sessions || [];

    const daySeconds = calculateTotalSeconds(sessions);
    const status = getDayStatus(daySeconds);

    if (status === "Present") presentDays++;
    else if (status === "Half Day") halfDays++;
    else absentDays++;

    totalSeconds += daySeconds;
  }

  const totalWorkingDays = presentDays + halfDays + absentDays;
  const leavesTaken = Math.min(absentDays, 1); // 1 allowed leave
  const extraLeaves = Math.max(0, absentDays - 1);
  const carryForwardLeaves = absentDays === 0 ? 2 : 0;

  const totalHours = formatTime(totalSeconds);

  const summary = {
    userId,
    month: yearMonth,
    presentDays,
    halfDays,
    absentDays,
    leavesTaken,
    extraLeaves,
    carryForwardLeaves,
    totalWorkingDays,
    totalHours,
  };

  console.log("📤 Writing attendance summary:", summary);

  const summaryKey = `${userId}_${yearMonth}`;
  const existingSummaries = await dataAPI.list("attendanceSummary");
  const existing = existingSummaries.find(
    (row: any) =>
      row.id === summaryKey ||
      row._id === summaryKey ||
      row.key === summaryKey ||
      (row.userId === userId && row.month === yearMonth),
  );

  if (existing?._id || existing?.id) {
    await dataAPI.update("attendanceSummary", existing._id || existing.id, summary);
  } else {
    await dataAPI.create("attendanceSummary", { key: summaryKey, ...summary });
  }
};
