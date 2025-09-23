import { Button } from "@/components/ui/button";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import EventAnalyticsComponent from "@/components/feature/event-analytics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/nameInitials";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Info, User } from "lucide-react";
import ControlPanelComponent from "@/components/feature/ControlPanelComponent";

export default function DashboardPage() {
  const { user, logout } = useGoogleAuth();

  return (
    <>
      <header className="sticky top-0 z-50 shadow-sm flex w-full justify-between items-center p-4">
        <h2 className="font-semibold text-2xl text-primary cursor-default">Recurlytics</h2>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:opacity-80 transition">
                <AvatarImage src={user?.picture} />
                <AvatarFallback>
                  {user?.name ? getNameInitials(user.name) : (<User className="h-4 w-4" />)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-2 p-2 min-w-40 space-y-2">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-end font-normal text-muted-foreground">
                v{import.meta.env.VITE_APP_VERSION || "0.0.1-alpha"}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start px-4"
                  asChild
                >
                  <a
                    href="https://github.com/aditydcp/recurlytics?tab=readme-ov-file#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Info className="mr-3 h-4 w-4" />
                    More Info
                  </a>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                  className="w-full justify-start px-4"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-col items-center mt-6 w-full h-full">
        <main className="flex flex-col items-center space-y-6">
          <ControlPanelComponent />
          {/* <EventAnalyticsComponent /> */}
        </main>
      </div>
    </>
  );
}