import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flash Card Course",
  description: "A flash card learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("localhost:4318");
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        cssLayerName: "clerk",
        variables: {
          colorBackground: "#1a1a1a",
          colorText: "#ffffff",
          colorPrimary: "#3b82f6",
          colorInputBackground: "#2a2a2a",
          colorInputText: "#ffffff",
        },
        elements: {
          card: "bg-[#1a1a1a]",
          headerTitle: "text-white",
          headerSubtitle: "text-gray-400",
          socialButtonsBlockButton: "bg-[#2a2a2a] text-white border-gray-700 hover:bg-[#3a3a3a]",
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          footerActionLink: "text-blue-400 hover:text-blue-300",
          formFieldLabel: "text-gray-300",
          formFieldInput: "bg-[#2a2a2a] text-white border-gray-700",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-blue-400",
          // UserButton dropdown (manage account / sign out)
          userButtonPopoverCard: "bg-[#2a2a2a] border border-gray-700",
          userButtonPopoverMain: "text-white",
          userButtonPopoverActionButton: "text-white hover:bg-[#3a3a3a]",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="antialiased">
          <header className="relative z-10 flex justify-between items-center p-4 border-b bg-background">
            <div className="font-bold text-xl">Flashy Cardy Course</div>
            <div className="flex gap-4 items-center">
              <SignedOut>
                <SignInButton mode="modal">
                  <button type="button" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button type="button" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
                <SignOutButton>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors">
                    Log out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
