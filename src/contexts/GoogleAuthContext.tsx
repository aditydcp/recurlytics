import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { loadGoogleIdentityLibrary } from "@/lib/googleAuth";

interface TokenCache {
  token: string;
  expiry: number; // ms timestamp
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds until expiration
  scope: string;
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface GoogleAuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  token: string | null;
  login: () => void;
  logout: () => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(
  undefined
);

const TOKEN_KEY = "recurlytics_google_token";
const SCOPES =
  "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.profile openid email profile";

export const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const tokenClientRef = useRef<any>(null);

  // Load Google API & setup token client
  useEffect(() => {
    loadGoogleIdentityLibrary().then(() => {
      tokenClientRef.current = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
        scope: SCOPES,
        callback: (res: TokenResponse) => {
          if (res.access_token) {
            const expiry = Date.now() + (res.expires_in || 3600) * 1000;
            const cache: TokenCache = { token: res.access_token, expiry };
            localStorage.setItem(TOKEN_KEY, JSON.stringify(cache));
            setToken(res.access_token);
            fetchUserProfile(res.access_token);
          }
        },
      });

      // Restore saved token if still valid
      const saved = localStorage.getItem(TOKEN_KEY);
      if (saved) {
        const { token, expiry } = JSON.parse(saved) as TokenCache;
        if (Date.now() < expiry) {
          setToken(token);
          fetchUserProfile(token);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
    });
  }, []);

  const fetchUserProfile = async (accessToken: string) => {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const profile = await res.json();
    setUser(profile);
  };

  const login = () => {
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const ctx = useContext(GoogleAuthContext);
  if (!ctx) throw new Error("useGoogleAuth must be used within GoogleAuthProvider");
  return ctx;
};