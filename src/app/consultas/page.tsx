import { SidebarTrue } from "@/components/Sidebar";
import AgendarConsulta from '@/pages/consultation/agendaConsulta';
import ConsultationList from '@/pages/consultation/consultation';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Vivamed - Painel de controle'
}

export default function Consultation() {
  return (
    <div className="flex">
      <SidebarTrue />

      <div className="flex flex-wrap w-full my-16 sm:my-0">
        <div className="w-full md:w-1/2 px-3 my-2">
          <AgendarConsulta />
        </div>
        <div className="w-full md:w-1/2 px-3 my-2">
          <ConsultationList />
        </div>
      </div>

    </div>
  );
}
