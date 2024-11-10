import { SidebarTrue } from "@/components/Sidebar";
import Dashboard from "@/pages/dashboard/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Vivamed - Painel de controle'
}

export default function Home() {
  return (
    <div className="flex h-screen">
      <SidebarTrue />
      <div className="w-full">
        <Dashboard />
      </div>
    </div>
  );
}
