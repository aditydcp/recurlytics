import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import { Button } from "@/components/ui/button";
import EventAnalyticsComponent from "./event-analytics";

function ConnectCalendarComponent() {
  const { isAuthenticated, login, logout, user } = useGoogleAuth();
  const {
    calendars,
    selectedCalendar,
    events,
    selectCalendarAndFetch,
    loading,
  } = useGoogleCalendar();

  if (!isAuthenticated) {
    return <Button onClick={login}>Connect to your calendar</Button>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold">Welcome, {user?.name}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>

      <div>
        <h2 className="font-semibold">Select a Calendar:</h2>
        <ul className="space-y-2">
          {calendars.map((cal: any) => (
            <li key={cal.id}>
              <Button
                variant={selectedCalendar === cal.id ? "default" : "outline"}
                onClick={() => selectCalendarAndFetch(cal.id)}
                disabled={loading && selectedCalendar === cal.id}
              >
                {cal.summary}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {selectedCalendar && (
        <div className="flex space-x-8">
          <div>
            <h3 className="font-semibold mt-4">Events:</h3>
            {loading && <p>Loading events…</p>}
            {!loading && events.length === 0 && <p>No events found</p>}
            {events.map((ev: any) => (
              <div key={ev.id} className="mb-2">
                <strong>{ev.summary}</strong> —{" "}
                {ev.start?.dateTime || ev.start?.date}
              </div>
            ))}
          </div>

          <div>
            <EventAnalyticsComponent events={events} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectCalendarComponent;