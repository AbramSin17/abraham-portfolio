import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Abraham — WebAR Portfolio",
  description: "WebAR futuristic digital business card experience.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function WebARLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
