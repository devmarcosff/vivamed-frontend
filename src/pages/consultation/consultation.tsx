"use client"

import { BoxInfo } from '@/components/stylesComponents/molecules/BoxInfo';
import { SelectSearch } from '@/components/stylesComponents/molecules/SelectSearch';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import clsx from 'clsx';
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { BsClipboardPlusFill } from 'react-icons/bs';
import { IoMdCheckmark, IoMdPrint } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import './style.css';

export default function Consultation() {
  const router = useRouter();
  const pathname = usePathname();
  const [consulta, setConsulta] = useState<any>()
  const [drawer, setDrawer] = useState(false)
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const token = Cookie.get('accessToken')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const detalhesConsulta = (detalheconsulta: any) => {
    setDrawer(!drawer)
    setConsulta(detalheconsulta)
  }

  const abrirConsulta = () => {
    setOpen(!open)
  }

  const createCidadao = async (data: any) => {
    // var consulta = {
    //   "prontuario": data.prontuario,
    //   "respTec": user?.id,
    //   "role": data.role,
    //   "idProf": data.idProf,
    //   "descricao": data.descricao
    // }

    console.log(errors)

    // await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, consulta, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    // }).then(e => {
    //   // setLoading(true)
    //   // setTimeout(() => {
    //   setConsulta(e.data)
    //   toast.success("Consulta inserida com sucesso.", {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // }, 1000);
    // }).catch(e => {
    //   // setLoading(true)
    //   // setTimeout(() => {
    //   toast.error("Erro ao adicionar consulta.", {
    //     position: "bottom-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // }, 1000);
    // })
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setCidadao(e.data)).catch(e => console.log(e))
    }
    fetchData()
    isNotCaps(`${pathname}`)
  }, [open == false]);

  return (
    <>
      <div className="bg-white my-3 shadow-md rounded-md w-full max-h-full overflow-auto relative">
        <div className="flex lg:flex-row justify-between items-center w-full top-0 p-5 gap-3 sticky bg-white shadow-sm z-10">
          <h2 className='font-semibold'>Consultas realizadas</h2>
          <div className='flex gap-3 w-full sm:w-[initial]'>
            <button
              onClick={() => {
                abrirConsulta()
              }}
              className='px-3 py-2 text-allintra-primary-50 bg-allintra-primary-800 hover:bg-cyan-700 transition-all text-sm font-semibold shadow-md rounded-md flex gap-3 items-center justify-center'>
              <BsClipboardPlusFill size={20} />
              <span>Realizar consulta</span>
            </button>
          </div>
        </div>

        {
          cidadao.length ? (
            <div className='overflow-auto rounded-md shadow-sm m-3 mb-10'>
              <table className="table-auto w-full">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    <th className='py-5 px-2'>Prontuário</th>
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                    <th className='py-5 px-2 text-wrap'>Medicamento</th>
                    <th className='py-5 px-2'>Resp. Técnico</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center'>
                  {
                    cidadao.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => detalhesConsulta(item)}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <td className="py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500">{item.paciente || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.createAt && moment(item.createAt).format("DD/MM/YYYY - HH:mm") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.medicamentos.length ? 'Sim' : 'Não'}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.respTec || "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-md shadow-sm'>
              <span className='font-semibold text-gray-600'>Não existe consultas realizadas</span>
            </div>
          )
        }
      </div >
      {/* Drawer Detalhes da Consulta */}
      <Drawer.Root open={drawer} onOpenChange={setDrawer}>
        <Drawer.Content>

          <BoxInfo.Root type={`success`} className='mb-3'>
            <BoxInfo.Icon icon={IoMdCheckmark} type={'success'} />
            <BoxInfo.Message>Consulta inserida</BoxInfo.Message>
          </BoxInfo.Root>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[85%] flex flex-col justify-between relative'>
            <div className='h-full'>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                <h2 className='font-semibold text-allintra-gray-700'>Inserir Consulta</h2>
                <div className='flex gap-3 items-center'>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <MdModeEditOutline />
                  </button>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <IoMdPrint />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-full my-0 p-4">
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Data e Hora</span>
                  <div className='flex gap-1 text-gray-800'>
                    <span>{moment(consulta?.dataconsulta).format("DD/MM/YYYY")},</span>
                    <span>{moment(consulta?.horaconsulta, 'HH:mm:ss').format("HH:mm")}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Paciente</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.paciente}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Status</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.status}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.tecResponsavel}</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Recorrente</span>
                  <div className='text-gray-800'>
                    <span>Sim</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Data realizada</span>
                  <div className='text-gray-800'>
                    <span>{moment(consulta?.createAt).format("DD/MM/YYYY - HH:mm")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm truncate w-full'>{consulta?.id}</span>
              <div className='flex gap-3'>
                <button className='px-3 py-1 text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Cancelar Consulta')}>Cancelar</button>
                <button className='px-3 py-1 text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>

      {/* Drawer Inserir Consulta */}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Content>

          <BoxInfo.Root type={`success`} className='mb-3'>
            <BoxInfo.Icon icon={IoMdCheckmark} type={'success'} />
            <BoxInfo.Message>Inserir Consulta</BoxInfo.Message>
          </BoxInfo.Root>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[85%] flex flex-col justify-between relative'>
            <div className='h-full'>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                <h2 className='font-semibold text-allintra-gray-700'>Preencha os dados e preencha a consulta</h2>
                <div className='flex gap-3 items-center'>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <MdModeEditOutline />
                  </button>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <IoMdPrint />
                  </button>
                </div>
              </div>

              <form className="w-full" onSubmit={handleSubmit(createCidadao)}>
                <div className="flex flex-wrap -mx-3 p-5 text-left">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <SelectSearch.Root
                      list={[
                        { label: 'Cri Diretora', value: 'cris' },
                        { label: 'Chico Farmacia', value: 'chico' },
                        { label: 'Marcos Stevanini', value: 'marcos' },
                      ]}
                      onValueChange={(e) => console.log(e)}
                      isLoading={false}
                      emptyMessage="No branch found."
                    >
                      <SelectSearch.Label>Branch</SelectSearch.Label>
                      <SelectSearch.Trigger
                        placeholder="Select branch"
                        isLoading={isSubmitting}
                        className={clsx('!text-allintra-black-500 !min-h-10 min-w-[200px]', {
                          '!border-allintra-error-500': errors,
                        })}
                      />
                    </SelectSearch.Root>
                  </div >
                </div >
                <div>
                  <button type="submit">
                    Enviar
                  </button>
                </div>
              </form >
              {/* <SelectSearch.Root
                      list={[
                        { label: 'Cri Diretora', value: 'cris' },
                        { label: 'Chico Farmacia', value: 'chico' },
                        { label: 'Marcos Stevanini', value: 'marcos' },
                      ]}
                      onValueChange={(e) => console.log(e)}
                      isLoading={false}
                      emptyMessage="No branch found."
                    >
                      <SelectSearch.Label>Branch</SelectSearch.Label>
                      <SelectSearch.Trigger
                        placeholder="Select branch"
                        isLoading={isSubmitting}
                        className={clsx('!text-allintra-black-500 !min-h-10 min-w-[200px]', {
                          '!border-allintra-error-500': errors,
                        })}
                      />
                    </SelectSearch.Root> */}
            </div >

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm truncate w-full'>{consulta?.id}</span>
              <div className='flex gap-3'>
                <button className='px-3 py-1 text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Cancelar Consulta')}>Cancelar</button>
                <button className='px-3 py-1 text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div>
            </div>
          </div >
        </Drawer.Content >
      </Drawer.Root >

      {/* <CadastrarConsulta openModal={open} closeModal={setOpen} /> */}
    </>
  );
}
