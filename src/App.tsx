import { GoogleAuthProvider, useGoogleAuth } from "@/contexts/GoogleAuthContext";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";

function AppContent() {
  const { isAuthenticated } = useGoogleAuth();
  return isAuthenticated ? <DashboardPage /> : <LandingPage />;
}

function App() {
  return (
    <GoogleAuthProvider>
      <div className="min-h-screen bg-background text-foreground px-4 flex flex-col items-center justify-center">
        <AppContent />
        <footer className="my-8 text-sm text-muted-foreground">
          Built with ❤️ using React, TypeScript & shadcn/ui
        </footer>
      </div>
    </GoogleAuthProvider>
  );
}

export default App;