import { Button } from "@/components/ui/button";
import ConnectCalendarComponent from "@/components/feature/connect-calendar";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <header className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          📅 Welcome to <span className="text-primary">Recurlytics</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Analyze your recurring Google Calendar events.  
          Discover patterns, track gaps between events, and predict what’s next.
        </p>
      </header>

      <div className="mt-8 flex space-x-4">
        <ConnectCalendarComponent />
        <Button size="lg" variant="outline">
          Learn More
        </Button>
      </div>

      <footer className="absolute bottom-6 text-sm text-muted-foreground">
        Built with ❤️ using React, TypeScript & shadcn/ui
      </footer>
    </div>
  );
}

export default App;