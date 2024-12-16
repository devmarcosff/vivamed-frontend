'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'react-toastify';
import getCookie from './getCookie';

interface CadastroCidadao {
  id: string,
  name: string,
  role: string,
  idProf: string
}

export default function CadastrarNotaFiscal({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const token = Cookie.get('accessToken');
  const [consulta, setConsulta] = useState<any>()
  const [medicamento, setMedicamento] = useState<any>(false)
  const [receipts, setReceipts] = useState<any>([])
  const [user, setUser] = useState<CadastroCidadao | undefined>()
  const [loading, setLoading] = useState(false);

  const createMedicamento = async (data: any) => {
    var medicamentos = {
      "photo": "https://via.placeholder.com/70",
      "code": data.code,
      "name": data.name,
      "activeIngredient": data.activeIngredient,
      "pharmaceuticalForm": data.pharmaceuticalForm,
      "concentration": data.concentration,
      "healthRegistration": "123456789",
      "manufacturer": data.manufacturer,
      "leafletURL": "https://example.com/leaflet.pdf"
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v2/products`, medicamentos, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(() => {
      reset()
      toast.success("Medicamento inserido com sucesso.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).catch(e => {
      toast.error(`${e.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }).finally(() => {
      closeModal(false)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v2/receipts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setReceipts(e.data)).catch(e => console.log(e))
    }
    // Verifica se está no lado do cliente
    getCookie()

    fetchData()
  }, [token]);

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-1/2 data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className={`flex flex-col sm:h-full overflow-y-auto`}>
              <div>
                <div className='flex h-full items-center justify-between p-3 bg-cyan-800 sm:shadow sm:bg-white sm:text-gray-600'>
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 sm:text-gray-600 text-white">
                    Cadastrar Medicamento
                  </DialogTitle>

                  <button className='text-white flex sm:hidden font-semibold border rounded-md px-3 py-1 hover:bg-white hover:text-black transition-all' onClick={() => { closeModal(false) }}>X</button>
                </div>
              </div>
              <div className="p-3">
                <form className="w-full" onSubmit={handleSubmit(createMedicamento)}>
                  <h2 className='font-bold text-left'>Preencha as Informações do medicamento</h2>
                  <div className="flex flex-wrap -mx-3 my-3 text-left">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                        Nome *
                      </label>
                      <input {...register('name')} placeholder='Paracetamol' className={`${errors.name && 'border-red-500'} appearance-none shadow-sm block my-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="name" type="text" />
                      {
                        errors.name && <p className="text-red-500 text-xs italic">Por favor, preencha este campo. </p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="code">
                        Código *
                      </label>
                      <input {...register('code')} placeholder='PRD12345' className={`${errors.code && 'border-red-500'} appearance-none shadow-sm block my-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="code" type="text" />
                      {
                        errors.code && <p className="text-red-500 text-xs italic">Por favor, preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="activeIngredient">
                        Principio Ativo *
                      </label>
                      <input {...register('activeIngredient')} placeholder='Paracetamol' className={`${errors.activeIngredient && 'border-red-500'} appearance-none shadow-sm block my-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="activeIngredient" type="text" />
                      {
                        errors.activeIngredient && <p className="text-red-500 text-xs italic">Por favor, preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pharmaceuticalForm">
                        Formula Farmacêutica *
                      </label>
                      <input {...register('pharmaceuticalForm')} placeholder='Tablet' className={`${errors.pharmaceuticalForm && 'border-red-500'} appearance-none shadow-sm block my-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="pharmaceuticalForm" type="text" />
                      {
                        errors.pharmaceuticalForm && <p className="text-red-500 text-xs italic">Por favor, preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="concentration">
                        Concentração *
                      </label>
                      <input {...register('concentration')} placeholder='500mg' className={`${errors.concentration && 'border-red-500'} appearance-none shadow-sm block mt-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="concentration" type="text" />
                      {
                        errors.concentration && <p className="text-red-500 text-xs italic">Por favor, preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="manufacturer">
                        Fabricante *
                      </label>
                      <input {...register('manufacturer')} placeholder='PharmaCorp' className={`${errors.manufacturer && 'border-red-500'} appearance-none shadow-sm block mt-4 w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} id="manufacturer" type="text" />
                      {
                        errors.manufacturer && <p className="text-red-500 text-xs italic">Por favor, preencha este campo.</p>
                      }
                    </div>

                  </div>

                  <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full sm:w-36 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3"
                    >
                      {isSubmitting ? <ImSpinner2 className='animate-spin text-lg text-center' /> : "Inserir consulta"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeModal(false)
                        reset()
                      }}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
