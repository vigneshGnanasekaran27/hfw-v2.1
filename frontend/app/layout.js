import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import WhatsAppChatButton from "@/components/WhatsAppChatButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Home from "@/components/Home";
import ConstructionBanner from "@/components/ConstructionBanner";
import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div>
            <Home />
            <WhatsAppChatButton
              phoneNumber="7397355404"
              businessName="Hope Fit Wellness"
              message="I'm interested in your services!"
            />
            <ThemeToggle />
            <ScrollToTopButton />
            {/* <ConstructionBanner /> */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
