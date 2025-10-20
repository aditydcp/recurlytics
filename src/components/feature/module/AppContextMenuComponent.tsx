import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getNameInitials } from "@/lib/ui/string";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bolt, Info, LogOut, User } from "lucide-react";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";
import { usePopup } from "@/contexts/PopupContext";
import { PreferencesMenu } from "@/components/feature/module/PreferencesMenu";

export default function AppContextMenuComponent() {
  const { user, logout } = useGoogleAuth();
  const { open, close } = usePopup();

  const handleMoreInfo = () => {
    window.open(
      "https://github.com/aditydcp/recurlytics?tab=readme-ov-file#readme",
      "_blank",
      "noopener noreferrer"
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80 transition">
          <AvatarImage src={user?.picture} />
          <AvatarFallback>
            {user?.name ? getNameInitials(user.name) : (<User className="h-4 w-4" />)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-2 p-2 min-w-48 space-y-2">
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-start font-normal text-muted-foreground">
          Logged in as <br />
          <span className="font-medium">{user?.email || "Unknown User"}</span>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => open({
              title: "Settings",
              content: (<PreferencesMenu />),
            })}
            className="w-full justify-start px-4"
          >
            <Bolt className="mr-3 h-4 w-4" />
            Settings
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-0 mb-2 w-[95%] mx-auto" />
        <DropdownMenuItem asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={handleMoreInfo}
            className="w-full justify-start px-4"
          >
            <Info className="mr-3 h-4 w-4" />
            More Info
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            size="sm"
            variant="outline"
            onClick={() => open({
              title: "Are you sure you want to logout?",
              description: "Logging out of current session",
              content: <>We will miss you 🥺</>,
              footer: (
                <>
                  <Button variant="outline" onClick={() => close()}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      close();
                      logout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ),
            })}
            className="w-full justify-start px-4"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </DropdownMenuItem>
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-end font-normal text-muted-foreground">
          v{import.meta.env.VITE_APP_VERSION || "0.0.1-alpha"}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}