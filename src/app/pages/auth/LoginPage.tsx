"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Context } from "@/worker";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import { KeyRound, Loader2, UserPlus } from "lucide-react";
import { useState, useTransition } from "react";
import { Header } from "../Header";
import {
  finishPasskeyLogin,
  finishPasskeyRegistration,
  startPasskeyLogin,
  startPasskeyRegistration,
} from "./functions";

export function LoginPage({ ctx }: { ctx: Context }) {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const passkeyLogin = async () => {
    try {
      const options = await startPasskeyLogin();
      const login = await startAuthentication({ optionsJSON: options });
      const success = await finishPasskeyLogin(login);

      if (!success) {
        setResult("Login failed");
        setIsSuccess(false);
      } else {
        setResult("Login successful!");
        setIsSuccess(true);
        window.location.href = "/";
      }
    } catch (error) {
      setResult("An error occurred during login");
      setIsSuccess(false);
    }
  };

  const passkeyRegister = async () => {
    try {
      const options = await startPasskeyRegistration(username);
      const registration = await startRegistration({ optionsJSON: options });
      const success = await finishPasskeyRegistration(username, registration);

      if (!success) {
        setResult("Registration failed");
        setIsSuccess(false);
      } else {
        setResult("Registration successful!");
        setIsSuccess(true);
      }
    } catch (error) {
      setResult("An error occurred during registration");
      setIsSuccess(false);
    }
  };

  const handlePerformPasskeyLogin = () => {
    startTransition(() => void passkeyLogin());
  };

  const handlePerformPasskeyRegister = () => {
    startTransition(() => void passkeyRegister());
  };

  return (
    <>
      <Header ctx={ctx} />
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center ">
          <Card className="w-full max-w-md shadow-sm border-muted">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Authentication</CardTitle>
              <CardDescription>
                Login or register with your passkey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handlePerformPasskeyRegister}
                  disabled={isPending || !username.trim()}
                  className="w-full"
                  variant="outline"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Register
                    </>
                  )}
                </Button>
                <Button
                  onClick={handlePerformPasskeyLogin}
                  disabled={isPending || !username.trim()}
                  variant="default"
                  className="w-full"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <>
                      <KeyRound className="mr-2 h-4 w-4" /> Login
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
            {result && (
              <CardFooter>
                <Alert variant={isSuccess ? "default" : "destructive"} className="w-full">
                  <AlertDescription>{result}</AlertDescription>
                </Alert>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
