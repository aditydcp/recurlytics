import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";

export default function LandingPage() {
  const { login } = useGoogleAuth();

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <h1 className="text-4xl font-bold">
        📅 Welcome to <span className="text-primary">Recurlytics</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-md">
        Analyze your recurring Google Calendar events. Discover patterns, track gaps, and predict what’s next.
      </p>
      <Button size="lg" onClick={login}>
        Connect to your Calendar
      </Button>
    </div>
  );
}