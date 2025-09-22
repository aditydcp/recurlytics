import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import { Button } from "@/components/ui/button";
import EventAnalyticsComponent from "./event-analytics";

function ConnectCalendarComponent() {
  const {
    isLoading,
    isConnected,
    connect,
    calendars,
    selectedCalendar,
    events,
    selectCalendarAndFetch,
  } = useGoogleAuth();

  if (isLoading) return <p>Loading Google API…</p>;

  if (!isConnected) {
    return <Button onClick={connect}>Connect to your calendar</Button>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <h2 className="font-semibold">Select a Calendar:</h2>
        <ul className="space-y-2">
          {calendars.map((cal: any) => (
            <li key={cal.id}>
              <Button
                variant={selectedCalendar === cal.id ? "default" : "outline"}
                onClick={() => selectCalendarAndFetch(cal.id)}
              >
                {cal.summary}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {selectedCalendar && (
        <div className="flex">
          <div>
            <h3 className="font-semibold mt-4">Events:</h3>
            {events.map((ev: any) => (
              <div key={ev.id}>
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