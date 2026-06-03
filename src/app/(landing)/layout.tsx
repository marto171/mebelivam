import React, { ReactNode } from "react";
import { Navbar } from "@/components/sections/navbar";
import FloatingCTA from "@/components/ui/floating-cta";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <Navbar />
      {children}
      <FloatingCTA />
    </div>
  );
};

export default Layout;
