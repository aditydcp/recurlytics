import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import ConnectCalendarComponent from "@/components/feature/connect-calendar";
import EventAnalyticsComponent from "@/components/feature/event-analytics";

export default function DashboardPage() {
  const { user, logout } = useGoogleAuth();

  return (
    <div className="flex flex-col items-center w-full">
      <header className="flex w-full justify-between items-center p-4">
        <h2 className="font-semibold text-xl">Recurlytics Dashboard</h2>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <img src={user.picture} alt="avatar" className="w-8 h-8 rounded-full" />
              <span>{user.name}</span>
            </>
          )}
          <Button size="sm" variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="flex flex-col items-center mt-6 space-y-6">
        {/* <ConnectCalendarComponent /> */}
        {/* <EventAnalyticsComponent events={events} /> */}
      </main>
    </div>
  );
}