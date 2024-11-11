'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { DialogHeader } from '@material-tailwind/react'

export default function EditarDrawer({ openModal, closeModal, consulta }) {
  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => closeModal(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="shadow-md">
                  <DialogHeader className='flex justify-between items-center'>
                    <DialogTitle className="text-sm font-semibold text-gray-600 truncate max-w-[225px] hover:max-w-full cursor-pointer">Detalhes da consulta</DialogTitle>
                  </DialogHeader>
                </div>
                <div className="p-4">
                  <div className='shadow-md p-4 rounded-md'>
                    <h2>Data da consulta: {consulta?.dataconsulta}</h2>
                    <h2>Tec. Responsável: {consulta?.tecResponsavel}</h2>
                    <h2>Paciente: {consulta?.paciente}</h2>
                    <h2>Prontuário: {consulta?.prontuario}</h2>
                    <h2>Recorrente: {consulta?.recorrente}</h2>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
