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

      <div className="flex flex-wrap w-full mt-16 sm:my-0 px-3 overflow-hidden h-screen ">
        {/* <div className="w-full md:w-1/2 px-3 my-2">
          <AgendarConsulta />
        </div> */}
        {/* <div className="w-full md:w-1/2 px-3 my-2"> */}
        <ConsultationList />
        {/* </div> */}
      </div>
    </div>
  );
}
