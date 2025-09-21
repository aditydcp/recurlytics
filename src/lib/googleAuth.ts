const CLIENT_ID = import.meta.env.VITE_OAUTH_CLIENT_ID;
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
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await response.json();
  return data;
}