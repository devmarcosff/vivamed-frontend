"use client"

import { SidebarTrue } from "@/components/Sidebar";

const ItemPage = ({ params }: any) => {
  const { id } = params

  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 h-screen">
        <h2>ID da consulta: {id}</h2>
      </div>
    </div>
  );
};

export default ItemPage;