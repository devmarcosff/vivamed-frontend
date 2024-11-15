import { SidebarTrue } from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Medicamentos - Vivamed'
}

export default function Medicamentos() {


    return (
        <div className="flex">
            <SidebarTrue />
            <div className="bg-white m-3 w-full rounded-md flex gap-5 justify-center items-center">
                Medicamentos
            </div>
        </div>
    );
}
