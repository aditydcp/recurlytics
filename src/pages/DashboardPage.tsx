import ControlPanelComponent from "@/components/feature/module/ControlPanelComponent";
import EventAnalyticsComponent from "@/components/feature/module/EventAnalyticsComponent";
import AppContextMenuComponent from "@/components/feature/module/AppContextMenuComponent";
import { ThemeToggleButton } from "@/components/feature/unit/ThemeToggleButton";

export default function DashboardPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-background shadow-sm flex w-full justify-between items-center p-4">
        <h2 className="font-semibold text-2xl text-primary cursor-default">Recurlytics</h2>
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <AppContextMenuComponent />
        </div>
      </header>
      <div className="flex flex-col items-center mt-6 w-full h-full">
        <main className="flex flex-col items-center space-y-2 w-full">
          <ControlPanelComponent />
          <EventAnalyticsComponent />
        </main>
      </div>
    </>
  );
}