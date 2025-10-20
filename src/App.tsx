import { GoogleAuthProvider, useGoogleAuth } from "@/contexts/GoogleAuthContext";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import { GoogleCalendarProvider } from "@/contexts/GoogleCalendarContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PopupProvider } from "@/contexts/PopupContext";
import { PreferencesProvider } from "@/contexts/preferences/PreferencesContext";

function AppContent() {
  const { isAuthenticated } = useGoogleAuth();
  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
}

function App() {
  return (
    <TooltipProvider>
      <PreferencesProvider>
        <PopupProvider>
          <GoogleAuthProvider>
            <GoogleCalendarProvider>
              <div className="min-h-screen bg-background text-foreground px-8 flex flex-col items-center justify-center">
                <AppContent />
                <footer className="my-8 text-sm text-muted-foreground">
                  Built with ❤️ using React, TypeScript & shadcn/ui
                </footer>
              </div>
            </GoogleCalendarProvider>
          </GoogleAuthProvider>
        </PopupProvider>
      </PreferencesProvider>
    </TooltipProvider>
  );
}

export default App;