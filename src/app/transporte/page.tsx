import { SidebarTrue } from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Transporte - Vivamed | Bom Jesus do Itabapoana'
}

export default function Transporte() {
  return (
    <div className="flex">
      <SidebarTrue />
    </div>
  );
}
