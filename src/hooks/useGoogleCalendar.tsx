import { useEffect, useState } from "react";
import { listCalendars, listEventsFromCalendar } from "@/lib/googleAuth";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";

const CALENDARS_KEY = "recurlytics_google_calendars";
const EVENTS_KEY = "recurlytics_google_events";
const SELECTED_CAL_KEY = "recurlytics_selected_calendar";

export function useGoogleCalendar() {
  const { token } = useGoogleAuth();
  const [calendars, setCalendars] = useState<any[]>(() => {
    const saved = localStorage.getItem(CALENDARS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCalendar, setSelectedCalendar] = useState<string | null>(() => {
    return localStorage.getItem(SELECTED_CAL_KEY);
  });
  const [events, setEvents] = useState<any[]>(() => {
    const saved = localStorage.getItem(EVENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  // fetch calendars when token changes
  useEffect(() => {
    if (!token) return;
    listCalendars(token)
      .then((res) => {
        setCalendars(res);
        localStorage.setItem(CALENDARS_KEY, JSON.stringify(res));
      })
      .catch(console.error);
  }, [token]);

  const selectCalendarAndFetch = async (calendarId: string) => {
    if (!token) return;
    setLoading(true);
    setSelectedCalendar(calendarId);
    localStorage.setItem(SELECTED_CAL_KEY, calendarId);

    try {
      const evts = await listEventsFromCalendar(token, calendarId);
      setEvents(evts);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(evts));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    calendars,
    selectedCalendar,
    events,
    loading,
    selectCalendarAndFetch,
  };
}