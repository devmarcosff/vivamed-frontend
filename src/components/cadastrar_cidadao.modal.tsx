'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axios from 'axios';
import Cookie from 'js-cookie';
import nookies from 'nookies';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//Form Tab to Tab
import {
  UserCircleIcon,
  UserPlusIcon
} from "@heroicons/react/24/solid";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from "@material-tailwind/react";

interface CadastroCidadao {
  nome: string,
  nascimento: string,
  mae: string,
  prontuario: string,
  cpf: string,
  inicioTratamento: string,
  escolaridade: string,
  pai: string,
  conjuge: string,
  cns: string,
  telContato: string,
  cor: string,
  genero: string,
  motivoAcolhimento: string,
  servicoEncaminhado: string,
  drogas: string,
  doenca: string,
  usaMedicacao: string,
  alergiaMedicamento: string,
  cid: string,
  familiaVuneravel: string,
  beneficioSocial: string,
  condutaImediata: string,
  tecResponsavel: string,
  frequencia: string,
  caps: boolean,
  password: string

  // Address
  street: string,
  city: string,
  num: string,
  cep: string,
  state: string
}

export default function CadastrarCidadaoModal({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = nookies.get(null, "accessToken")
  const [isRegistro, setIsRegistro] = useState<any>()
  const [isAddress, setIsAddress] = useState<any>()
  const [activeTab, setActiveTab] = useState(1);

  console.log(activeTab)

  const data = [
    {
      label: "Informações pessoais",
      value: 1,
      icon: UserCircleIcon
    },
    {
      label: "Contato",
      value: 2,
      icon: UserPlusIcon
    }
  ];

  const createAddress = async (data: any) => {
    try {
      const token = Cookie.get('accessToken')
      var address = {
        "street": data.street,
        "city": data.city,
        "num": data.num,
        "cep": data.cep,
        "state": "RJ",
        "userId": isRegistro.prontuario
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/cidadao`, address, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(e => {
        closeModal(false)
        setIsAddress('')
        setIsRegistro('')
        reset()
      }).catch(e => console.log(e.message))
    } catch (error) {
      console.error('Erro ao criar endereço', error);
    }
  }

  const createCidadao = async (data: any) => {
    var cadastro = {
      "prontuario": data.prontuario,
      "name": data.name,
      "cpf": data.cpf,
      "birthday": data.birthday,
      "frequencia": data.frequencia || "NAO-INTENSIVO",
      "caps": data.caps,
      "password": "smsbj"
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, cadastro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      setIsRegistro(cadastro)
      reset()
    }).catch(e => console.log(e))
  }

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white min-h-[600px] w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full ${isRegistro ? 'sm:max-w-[40%]' : 'sm:max-w-[80%]'} data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>

            <Tabs value={activeTab} onChange={(e: any, newValue: any) => setActiveTab(newValue)}>
              <TabsHeader className='shadow-md bg-cyan-800'>
                {data.map(({ label, value, icon }) => (
                  <Tab key={value} value={value} className='p-3'>
                    <div className="flex items-center gap-2">
                      {React.createElement(icon, { className: "w-5 h-5" })}
                      <b>{label}</b>
                    </div>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value }) => (
                  <TabPanel key={value} value={value}>
                    {value == 1 && DadosPessoais()}
                    {value == 2 && Contato()}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>

          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}

function DadosPessoais() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const createCidadao = async (data: any) => {
    const token = nookies.get(null, "accessToken")

    var cadastro = {
      "prontuario": data.prontuario,
      "name": data.name,
      "cpf": data.cpf,
      "birthday": data.birthday,
      "frequencia": data.frequencia || "NAO-INTENSIVO",
      "caps": data.caps,
      "password": "smsbj"
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, cadastro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      // setIsRegistro(cadastro)
      reset()
    }).catch(e => console.log(e))
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(createCidadao)}>
      <h2 className='font-bold text-left'>Informações pessoais</h2>
      <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
            Prontuário *
          </label>
          <input {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" placeholder="Informe o prontuário do paciente" />
          {
            errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Nome completo *
          </label>
          <input {...register('name', { required: 'Por favor preencha este campo' })} className={`${errors.name && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="name" type="text" placeholder="Informe o nome do paciente" />
          {
            errors.name && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthday">
            Data de nascimento *
          </label>
          <input {...register('birthday', { required: 'Por favor preencha este campo' })} className={`${errors.birthday && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="birthday" type="date" />
          {
            errors.birthday && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
            CPF *
          </label>
          <input {...register('cpf', { required: 'Por favor preencha este campo' })} className={`${errors.cpf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="cpf" type="text" placeholder="000.000.000.00" />
          {
            errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
      </div>
      <div className="w-full md:w-1/5 my-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="frequencia">
          Frequencia do usuário *
        </label>
        <select {...register('frequencia')} name="frequencia" id="frequencia" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
          <option value="">Selecione uma frequencia</option>
          <option value="INTENSIVO">INTENSIVO</option>
          <option value="SEMI-INTENSIVO">SEMI-INTENSIVO</option>
          <option value="NAO-INTENSIVO">NAO-INTENSIVO</option>
        </select>
        {
          errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um paciente</p>
        }
      </div>

      <div className="flex flex-wrap my-3">
        <div className="w-full px-3 md:mb-0 gap-2 flex items-center">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="caps">
            Declaro que este usuário está sobre a proteção e os serviços prestados pelo CAPS.
          </label>
          <input {...register('caps')} type='checkbox' defaultChecked name='caps' id='caps' />
        </div>
      </div>

      <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        >
          Cadastrar
        </button>
        <button
          type="button"
          onClick={() => {
            // closeModal(false)
            reset()
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

function Contato() {
  return (
    <>
      <h2>Contato</h2>
    </>
  )
}