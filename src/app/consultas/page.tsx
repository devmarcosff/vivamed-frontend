import { SidebarTrue } from "@/components/Sidebar";
import ConsultationList from '@/pages/consultation/consultation';
import { Metadata } from "next";
import { NextRequest } from "next/server";

export const metadata: Metadata = {
  title: 'Vivamed - Painel de controle'
}

export default function Consultation(request: NextRequest) {
  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 h-screen">
        {/* <span>Você está na rota: {pathname}</span> */}
        <ConsultationList />
      </div>
    </div>
  );
}
