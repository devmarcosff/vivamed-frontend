import { SidebarTrue } from "@/components/Sidebar";
import ConsultationList from '@/pages/consultation/consultation';
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Vivamed - Painel de controle'
}

export default function Consultation() {

  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 overflow-hidden h-[650px]">
        <ConsultationList />
      </div>
    </div>
  );
}
