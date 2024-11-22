import { SidebarTrue } from "@/components/Sidebar";
import TransportePage from "@/pages/transporte/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Transporte - Vivamed | Bom Jesus do Itabapoana'
}

export default function Transporte() {
  return (
    <div className="flex">
      <SidebarTrue />

      <div className="bg-gradient-to-br from-allintra-primary-800/35 to-allintra-primary-50 to-80% m-3 w-full rounded-xl flex gap-5">
        <TransportePage />
      </div>
    </div>
  );
}
