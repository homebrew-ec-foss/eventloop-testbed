"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { GoogleLogin } from "@react-oauth/google";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const [alert, setAlert] = useState({ visible: false, message: "", variant: "default" });
  const [user, setUser] = useState(null); // authenticated user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => setAlert({ visible: false, message: "", variant: "default" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Check if user is logged in by hitting /refresh
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`, {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            credentials: credentialResponse.credential,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setAlert({
            visible: true,
            message: `Successfully logged in as ${data.user.role}`,
            variant: "success",
          });
        } else {
          setAlert({
            visible: true,
            message: "Invalid login. Please contact admin.",
            variant: "destructive",
          });
        }
      } else {
        console.error("No credential found in response");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert({
        visible: true,
        message: "Login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLoginFailure = () => {
    setAlert({
      visible: true,
      message: "Login Failed. Please try again.",
      variant: "destructive",
    });
    console.error("Google login failed");
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        setAlert({
          visible: true,
          message: "Logged out.",
          variant: "success"
        });
      }
      else {
        throw new Error("Logout failed");
      }
    }
    catch (err) {
      console.error('logout failed: ', err);
      setAlert({
        visible: true,
        message: "Logout failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-5 md:p-28 gap-4">
      <NavigationMenu />

      {alert.visible && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs p-3 rounded-lg shadow-lg
                    ${alert.variant === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}
                    animate-slide-down`}
          onClick={() => setAlert({ visible: false, message: "", variant: "default" })}
        >
          <AlertTitle className="text-sm font-bold">
            {alert.variant === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription className="text-xs">
            {alert.message}
          </AlertDescription>
        </div>
      )}

      <Card className="hover:bg-slate-100 transition duration-200 ease-in-out">
        <CardHeader>
          <CardTitle>Welcome to Event-Loop</CardTitle>
          <CardDescription>
            Get started with creating your event
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-4">
        {loading ? (
          <p>Loading session...</p>
        ) : !user ? (
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Logged in as <strong>{user.name}</strong> ({user.role})
            </p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-fit text-sm">
              Logout
            </button>
          </>
        )}
      </div>

      <footer>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; JS Hate.
        </p>
      </footer>
    </main>
  );
}
