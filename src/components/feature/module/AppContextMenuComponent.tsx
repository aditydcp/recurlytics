import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getNameInitials } from "@/lib/nameInitials";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Info, LogOut, User } from "lucide-react";
import { useGoogleAuth } from "@/contexts/GoogleAuthContext";

export default function AppContextMenuComponent() {
  const { user, logout } = useGoogleAuth();
  
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
        <DropdownMenuLabel className="px-2 py-1.5 text-xs text-end font-normal text-muted-foreground">
          v{import.meta.env.VITE_APP_VERSION || "0.0.1-alpha"}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}