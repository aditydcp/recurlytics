const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
const BASE_URL = "https://www.googleapis.com/calendar/v3";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export async function loadGoogleIdentityLibrary() {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity script"));
    document.body.appendChild(script);
  });
}

export function initializeTokenClient(onSuccess: (tokenResponse: any) => void) {
  // @ts-ignore or proper typings
  return window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: onSuccess, // called when authorized (or after token refreshed)
  });
}

export async function listCalendarEvents(accessToken: string) {
  const response = await fetch(
    `${BASE_URL}/calendars/primary/events`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await response.json();
  return data;
}

export async function listCalendars(accessToken: string) {
  const response = await fetch(`${BASE_URL}/users/me/calendarList`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("Failed to fetch calendars");
  const data = await response.json();
  return data.items;
}

export async function listEventsFromCalendar(accessToken: string, calendarId: string) {
  const response = await fetch(`${BASE_URL}/calendars/${encodeURIComponent(calendarId)}/events`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("Failed to fetch events");
  const data = await response.json();
  return data.items;
}