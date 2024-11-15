'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { IoMdPrint } from 'react-icons/io';

export default function NovaSenha({ openAgenda, closeAgenda, info }: any) {

  const handlePrint = async () => {
    try {
      const response = await fetch('/painel/api/print', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Erro ao tentar imprimir');
    }
  };

  return (
    <Dialog open={openAgenda} onClose={closeAgenda} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:w-1/4 data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className={`flex flex-col sm:h-full overflow-y-auto`}>
              <div>
                <div className='flex h-full items-center justify-between p-3 bg-cyan-800 sm:shadow sm:bg-white sm:text-gray-600'>
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 sm:text-gray-600 text-white">
                    Clinica da Familia - Bem vindo
                    <p>
                      Ficamos feliz em ter você como nosso paciente
                    </p>
                  </DialogTitle>


                  <button
                    onClick={handlePrint}
                    className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <IoMdPrint />
                  </button>
                  {/* <button className='text-white flex font-semibold border rounded-md px-3 py-1 hover:bg-white hover:text-black transition-all' onClick={() => { closeAgenda(false) }}>X</button> */}
                </div>
              </div>

              <div className="p-3 h-48 text-center flex flex-col gap-3 justify-center items-center">
                <p className='text-xl'>Sua senha:</p>
                <p className='text-7xl font-bold'>{info.senha}</p>
                <p>Aguarde até que seu numero seja chamado no painel</p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
