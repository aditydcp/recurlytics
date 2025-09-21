import { createContext, useContext, useEffect, useState } from "react";
import {
  loadGoogleIdentityLibrary,
  initializeTokenClient,
  listCalendars,
  listEventsFromCalendar,
} from "@/lib/googleAuth";

type GoogleAuthContextType = {
  isLoading: boolean;
  isConnected: boolean;
  accessToken: string | null;
  calendars: any[];
  selectedCalendar: string | null;
  events: any[];
  connect: () => void;
  selectCalendarAndFetch: (calendarId: string) => Promise<void>;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(
  undefined
);

const TOKEN_KEY = "recurlytics_google_token";

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [calendars, setCalendars] = useState<any[]>([]);
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [tokenClient, setTokenClient] = useState<any>(null);

  // Restore token from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      const { token, expiry } = JSON.parse(saved);
      if (Date.now() < expiry) {
        setAccessToken(token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  }, []);

  // Load Google library + init token client
  useEffect(() => {
    loadGoogleIdentityLibrary().then(() => {
      const client = initializeTokenClient((tokenResponse: any) => {
        const token = tokenResponse.access_token;
        const expiresIn = tokenResponse.expires_in || 3600; // fallback 1h
        const expiry = Date.now() + expiresIn * 1000;

        if (token) {
          setAccessToken(token);
          localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiry }));
        }
      });
      setTokenClient(client);
      setIsLoading(false);
    });
  }, []);

  // When connected, fetch calendars
  useEffect(() => {
    if (!accessToken) return;
    listCalendars(accessToken).then(setCalendars).catch(console.error);
  }, [accessToken]);

  const connect = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    }
  };

  const selectCalendarAndFetch = async (calendarId: string) => {
    if (!accessToken) return;
    setSelectedCalendar(calendarId);
    const evts = await listEventsFromCalendar(accessToken, calendarId);
    setEvents(evts);
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        isLoading,
        isConnected: !!accessToken,
        accessToken,
        calendars,
        selectedCalendar,
        events,
        connect,
        selectCalendarAndFetch,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const ctx = useContext(GoogleAuthContext);
  if (!ctx) throw new Error("useGoogleAuth must be used inside GoogleAuthProvider");
  return ctx;
}