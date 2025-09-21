import { useEffect, useState } from "react";
import { loadGoogleIdentityLibrary, initializeTokenClient, listCalendarEvents } from "@/lib/googleAuth";
import { Button } from "@/components/ui/button";

function ConnectCalendarComponent() {
  const [events, setEvents] = useState<any[]>([]);
  const [tokenClient, setTokenClient] = useState<any>(null);

  useEffect(() => {
    loadGoogleIdentityLibrary().then(() => {
      const client = initializeTokenClient((tokenResponse: any) => {
        const token = tokenResponse.access_token;
        if (token) {
          listCalendarEvents(token).then((res: any) => {
            setEvents(res.items || []);
          });
        }
      });
      setTokenClient(client);
    });
  }, []);

  const handleConnect = () => {
    if (!tokenClient) return;
    tokenClient.requestAccessToken(); // this will open the Google consent prompt
  };

  return (
    <div>
      <Button onClick={handleConnect}>Connect Google Calendar</Button>
      <div>
        {events.map((ev) => (
          <div key={ev.id}>
            <strong>{ev.summary}</strong> — {ev.start?.dateTime || ev.start?.date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConnectCalendarComponent;