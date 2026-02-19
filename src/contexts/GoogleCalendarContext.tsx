import React, { createContext, useContext, useEffect, useState } from "react";
import { listCalendars, listEventsFromCalendar } from "@/lib/googleAuth";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import type { Calendar } from "@/types/CalendarType";
import type { Event } from "@/types/EventType";
import { useAutoRefresh } from "@/contexts/preferences/AutoRefreshContext";
import { isExpired } from "@/lib/autoRefresh";
import type { LimitedTimeData } from "@/types/PreferenceType";

const CALENDARS_KEY = "recurlytics_google_calendars";
const EVENTS_KEY = "recurlytics_google_events";
const SELECTED_CAL_KEY = "recurlytics_selected_calendar";

type GoogleCalendarContextType = {
  calendars: Calendar[];
  selectedCalendar: string | null;
  events: Event[];
  loading: boolean;
  fetchCalendars: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  selectCalendarAndFetch: (calendarId: string) => Promise<void>;
};

const GoogleCalendarContext = createContext<GoogleCalendarContextType | undefined>(
  undefined
);

export const GoogleCalendarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { autoRefreshMode } = useAutoRefresh();
  const { token } = useGoogleAuth();
  const [calendars, setCalendars] = useState<Calendar[]>(() => {
    const saved = localStorage.getItem(CALENDARS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(() => {
    return localStorage.getItem(SELECTED_CAL_KEY);
  });
  const [eventsCache, setEventsCache] = useState<LimitedTimeData<Event[]>>(() => {
    const saved = localStorage.getItem(EVENTS_KEY);
    if (!saved) {
      return { iat: 0, data: [] };
    }

    return JSON.parse(saved);
  });
  const [loading, setLoading] = useState(false);

  // fetch calendars when token changes
  useEffect(() => {
    fetchCalendars();
  }, [token]);

  const fetchCalendars = async () => {
    if (!token) return;
    setLoading(true);
    listCalendars(token)
      .then((res) => {
        setCalendars(res);
        localStorage.setItem(CALENDARS_KEY, JSON.stringify(res));
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  // fetch events when expired
  useEffect(() => {
    if (!token || !selectedCalendar) return;
    if (!eventsCache?.iat) return;
    if (autoRefreshMode === "never") return;

    const expired = isExpired(eventsCache.iat, autoRefreshMode);

    if (expired) {
      selectCalendarAndFetch(selectedCalendar);
    }
  }, [autoRefreshMode, token, selectedCalendar]);

  /**
   * Select Calendar and fetch events
   */
  const selectCalendarAndFetch = async (calendarId: string) => {
    if (!token || !calendarId) return;

    try {
      setLoading(true);
      setSelectedCalendar(calendarId);
      localStorage.setItem(SELECTED_CAL_KEY, calendarId);

      const evts = await listEventsFromCalendar(token, calendarId);
      const newCache = {
        iat: Date.now(),
        data: evts
      };
      setEventsCache(newCache);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(newCache));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch events using the currently selected calendar
   */
  const fetchEvents = async () => {
    if (!token || !selectedCalendar) return;
    try {
      setLoading(true);
      const evts = await listEventsFromCalendar(token, selectedCalendar);
      const newCache = {
        iat: Date.now(),
        data: evts
      };
      setEventsCache(newCache);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(newCache));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleCalendarContext.Provider
      value={{
        calendars,
        selectedCalendar,
        events: eventsCache.data,
        loading,
        fetchCalendars,
        fetchEvents,
        selectCalendarAndFetch,
      }}
    >
      {children}
    </GoogleCalendarContext.Provider>
  );
};

export function useGoogleCalendar() {
  const context = useContext(GoogleCalendarContext);
  if (!context) {
    throw new Error(
      "useGoogleCalendar must be used within a GoogleCalendarProvider"
    );
  }
  return context;
}