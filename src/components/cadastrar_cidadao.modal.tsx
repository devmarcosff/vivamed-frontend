'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  CheckBadgeIcon,
  NumberedListIcon
} from "@heroicons/react/24/solid";
import axios from 'axios';
import clsx from 'clsx';
import Cookie from 'js-cookie';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiAlertTriangle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import ReactInputMask from 'react-input-mask';
import { toast } from 'react-toastify';

interface CadastroCidadao {
  nome?: string,
  nascimento?: string,
  mae?: string,
  prontuario?: string,
  cpf?: string,
  inicioTratamento?: string,
  escolaridade?: string,
  pai?: string,
  conjuge?: string,
  cns?: string,
  telContato?: string,
  cor?: string,
  genero?: string,
  motivoAcolhimento?: string,
  servicoEncaminhado?: string,
  drogas?: string,
  doenca?: string,
  usaMedicacao?: string,
  alergiaMedicamento?: string,
  cid?: string,
  familiaVuneravel?: string,
  beneficioSocial?: string,
  condutaImediata?: string,
  tecResponsavel?: string,
  frequencia?: string,
  caps?: boolean,
  password?: string
}

export default function CadastrarCidadaoModal({ openModal, closeModal }: any) {
  const [activeTab, setActiveTab] = useState('pessoal');
  const [dadosCadastrais, setDadosCadastrais] = useState<CadastroCidadao>([] as any)

  const data = [
    {
      label: "Informações Pessoais",
      value: "pessoal",
      icon: NumberedListIcon,
      component: DadosPessoais({ setDadosCadastrais, setActiveTab, closeModal })
    },
    {
      label: "Informações Sociais",
      value: "social",
      icon: NumberedListIcon,
      component: DadosSociais({ setDadosCadastrais, setActiveTab, closeModal })
    },
    {
      label: "Finalizar Cadastro",
      value: "final",
      icon: CheckBadgeIcon,
      component: Final({ dadosCadastrais, setDadosCadastrais, setActiveTab, closeModal })
    }
  ];

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white min-h-[600px] w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[80%] data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>

            <div className="gap-2 h-[820px] overflow-auto">
              <div className='shadow-md p-4 bg-cyan-800 md:bg-white gap-4 justify-around flex'>
                <div className='hidden md:flex md:justify-between items-center w-full'>
                  {data.map(({ label, value, icon }) => (
                    <button
                      key={value}
                      className={
                        clsx('p-4 px-8 rounded-lg w-full text-gray-600 cursor-default',
                          {
                            'shadow-md bg-cyan-800 text-white': activeTab === value
                          }
                        )}
                    // onClick={() => {
                    //   setActiveTab(value)
                    // }}
                    >
                      <div className="flex items-center gap-1 relative">
                        {React.createElement(icon, { className: "w-5 h-5" })}
                        <b>{label}</b>
                        <span className={
                          clsx('rounded-full border-cyan-900 absolute top-[-10px] right-[-20px] border-2 shadow-md h-5 w-5 text-sm font-bold flex items-center justify-center',
                            {
                              'border-white': activeTab === value
                            }
                          )
                        }>
                          {
                            value == 'pessoal' ? 1 : value == 'social' ? 2 : 3
                          }
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex md:hidden justify-between items-center w-full">
                  <div className="flex items-center gap-1 relative text-white font-semibold uppercase">
                    <b>{data?.find(item => item.value === activeTab)?.label}</b>
                    <span className={
                      clsx('rounded-full border-cyan-900 absolute top-[-10px] right-[-20px] border-2 shadow-md h-5 w-5 text-sm font-bold flex items-center justify-center',
                        {
                          'border-white': activeTab === data?.find(item => item.value === activeTab)?.value
                        }
                      )
                    }>
                      {
                        data?.find(item => item.value === activeTab)?.value == 'pessoal' ? 1 : data?.find(item => item.value === activeTab)?.value == 'social' ? 2 : 3
                      }
                    </span>
                  </div>
                  <button className='text-white font-semibold border rounded-md px-3 py-1 hover:bg-white hover:text-black transition-all' onClick={() => { closeModal(false) }}>X</button>
                </div>
              </div>
              <div className="p-8">
                {data?.find(item => item.value === activeTab)?.component ?? <div>Não existe informações disponíveis</div>}
              </div>
            </div>

          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}

function DadosPessoais({ setDadosCadastrais, setActiveTab, closeModal }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const DadoPessoal = (data: any) => {
    setDadosCadastrais(data)
    setActiveTab('social')
  }


  return (
    <div className='transition-all'>
      <form className="w-full" onSubmit={handleSubmit(DadoPessoal)}>
        <h2 className='font-bold text-left'>Informações pessoais</h2>
        <div className="flex flex-wrap -mx-3 my-3 text-left">
          <div className="w-full md:w-1/2 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
              Nome completo *
            </label>
            <input placeholder='Nome completo do paciente' {...register('nome', { required: 'Por favor preencha este campo' })} className={`${errors.nome && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="nome" type="text" />
            {
              errors.nome && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
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
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
              CPF *
            </label>
            <ReactInputMask
              {...register('cpf', { required: 'Por favor preencha este campo' })}
              type='tel'
              id="cpf"
              mask="999.999.999-99"
              placeholder='999.999.999-99'
              className={`${errors.telContato && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            />
            {
              errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telContato">
              Telefone de contato *
            </label>
            <ReactInputMask
              {...register('telContato', { required: 'Por favor preencha este campo' })}
              type='tel'
              id="telContato"
              mask="(99) 99999-9999"
              placeholder='(22)99999-9999'
              className={`${errors.telContato && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
            />
            {
              errors.telContato && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
          <div className="w-full md:w-1/2 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mae">
              Nome da mãe *
            </label>
            <input {...register('mae', { required: 'Por favor preencha este campo' })} className={`${errors.mae && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="mae" type="text" placeholder="Mãe do paciente" />
            {
              errors.mae && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
          <div className="w-full md:w-1/2 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pai">
              Nome do pai <span className='text-cyan-700 font-semibold text-[10px]'>(não é obrigatório)</span>
            </label>
            <input {...register('pai')} className={`${errors.pai && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="pai" type="text" placeholder="Pai do paciente (opcional)" />
            {
              errors.pai && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
          <div className="w-full md:w-1/2 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conjuge">
              Conjuge <span className='text-cyan-700 font-semibold text-[10px]'>(não é obrigatório)</span>
            </label>
            <input {...register('conjuge')} className={`${errors.conjuge && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="conjuge" type="text" placeholder="Conjuge do paciente (opcional)" />
            {
              errors.conjuge && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 my-3 text-left">
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="genero">
              Gênero *
            </label>
            <select {...register('genero')} name="genero" id="genero" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="N">Gênero Neutro</option>
              <option value="Outro">Outro</option>
            </select>
            {
              errors.genero && <p className="text-red-500 text-xs italic">Por favor selecione um gênero</p>
            }
          </div>
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cor">
              Raça/Cor *
            </label>
            <select {...register('cor')} name="cor" id="cor" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
              <option value="branco">Branco</option>
              <option value="preto">Preto</option>
              <option value="pardo">Pardo</option>
              <option value="amarelo">Amarelo</option>
              <option value="indigena">Indígena</option>
            </select>
            {
              errors.cor && <p className="text-red-500 text-xs italic">Por favor selecione uma cor</p>
            }
          </div>
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="frequencia">
              Frequencia do usuário *
            </label>
            <select {...register('frequencia')} name="frequencia" id="frequencia" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
              <option value="INTENSIVO">INTENSIVO</option>
              <option value="SEMI-INTENSIVO">SEMI-INTENSIVO</option>
              <option value="NAO-INTENSIVO">NAO-INTENSIVO</option>
            </select>
            {
              errors.frequencia && <p className="text-red-500 text-xs italic">Por favor selecione uma frequencia</p>
            }
          </div>
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="caps">
              Usuário do caps? *
            </label>
            <select {...register('caps')} name="caps" id="caps" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
              <option value={`${true}`}>SIM</option>
              <option value={`${false}`}>NÃO</option>
            </select>
            {
              errors.caps && <p className="text-red-500 text-xs italic">Por favor preencha o campo caps</p>
            }
          </div>
        </div>

        <div className="border-t-[1px] py-3 sm:flex sm:flex-row-reverse justify-between items-center">
          <button
            type="submit"
            className={`cursor-pointer bg-cyan-800 hover:bg-cyan-700 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
          >
            Avançar
          </button>
          <button
            type="button"
            onClick={() => {
              reset()
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={() => {
              // reset()
              closeModal(false)
            }}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

function DadosSociais({ setDadosCadastrais, setActiveTab }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const DadosSocial = (data: any) => {
    setDadosCadastrais((prevState: any) => ({ ...prevState, ...data }))
    setActiveTab('final')
  }

  return (
    <form className="w-full transition-all" onSubmit={handleSubmit(DadosSocial)}>
      <h2 className='font-bold text-left'>Informações sociais</h2>
      <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
            Prontuario *
          </label>
          <input placeholder='N° de prontuário' {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" />
          {
            errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tecResponsavel">
            Responsável Técnico *
          </label>
          <input placeholder='Téc. do paciente'  {...register('tecResponsavel', { required: 'Por favor preencha este campo' })} className={`${errors.tecResponsavel && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="tecResponsavel" type="text" />
          {
            errors.tecResponsavel && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cns">
            cns *
          </label>
          <input placeholder='CNS do paciente' {...register('cns', { required: 'Por favor preencha este campo' })} className={`${errors.cns && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="cns" type="text" />
          {
            errors.cns && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cid">
            cid *
          </label>
          <input placeholder='CID do paciente' {...register('cid', { required: 'Por favor preencha este campo' })} className={`${errors.cid && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="cid" type="text" />
          {
            errors.cid && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inicioTratamento">
            Inicio do tratamento *
          </label>
          <input {...register('inicioTratamento', { required: 'Por favor preencha este campo' })} className={`${errors.inicioTratamento && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="inicioTratamento" type="date" />
          {
            errors.inicioTratamento && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="drogas">
            Alcool/Drogas *
          </label>
          <select {...register('drogas')} name="drogas" id="drogas" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.drogas && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doenca">
            Doença *
          </label>
          <select {...register('doenca')} name="doenca" id="doenca" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.doenca && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="usaMedicacao">
            Usa medicação? *
          </label>
          <select {...register('usaMedicacao')} name="usaMedicacao" id="usaMedicacao" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.medicacao && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alergiaMedicamento">
            Alergia Medicamento? *
          </label>
          <select {...register('alergiaMedicamento')} name="alergiaMedicamento" id="alergiaMedicamento" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.alergiaMedicamento && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="familiaVuneravel">
            Familia Vuneravel? *
          </label>
          <select {...register('familiaVuneravel')} name="familiaVuneravel" id="familiaVuneravel" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.familiaVuneravel && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="beneficioSocial">
            Beneficio Social *
          </label>
          <select {...register('beneficioSocial')} name="beneficioSocial" id="beneficioSocial" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.beneficioSocial && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="escolaridade">
            Escolaridade *
          </label>
          <select {...register('escolaridade')} name="escolaridade" id="escolaridade" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="Analfabeto">Analfabeto</option>
            <option value="FIncompleto">Ensino Fundamental Incompleto</option>
            <option value="FCompleto">Ensino Fundamental Competo</option>
            <option value="MIncompleto">Ensino Médio Incompleto</option>
            <option value="MCompleto">Ensino Médio Competo</option>
            <option value="SIncompleto">Ensino Superior Incompleto</option>
            <option value="SCompleto">Ensino Superior Competo</option>
            <option value="NTecnico">Nível Técnico</option>
          </select>
          {
            errors.escolaridade && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="motivoAcolhimento">
            Motivo do Acolhimento *
          </label>
          <textarea placeholder='Se houver motivo de acolhimento, informe-o aqui:' rows={4} {...register('motivoAcolhimento', { required: 'Por favor preencha este campo' })} className={`${errors.motivoAcolhimento && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="motivoAcolhimento" />
          {
            errors.motivoAcolhimento && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="servicoEncaminhado">
            Servico Encaminhado *
          </label>
          <textarea placeholder='Se houver serviço encaminhado, informe-o aqui:' rows={4} {...register('servicoEncaminhado', { required: 'Por favor preencha este campo' })} className={`${errors.servicoEncaminhado && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="servicoEncaminhado" />
          {
            errors.servicoEncaminhado && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="condutaImediata">
            Conduta Imediata *
          </label>
          <textarea placeholder='Se houver conduta imediata, informe-o aqui:' rows={4} {...register('condutaImediata', { required: 'Por favor preencha este campo' })} className={`${errors.condutaImediata && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="condutaImediata" />
          {
            errors.condutaImediata && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
      </div>

      <div className="border-t-[1px] py-3 sm:flex sm:flex-row-reverse justify-between items-center">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3 sm:w-auto"
        >
          Avançar
        </button>
        <button
          type="button"
          onClick={() => {
            reset()
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Limpar
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('pessoal')
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Voltar
        </button>
      </div>
    </form>
  )
}

function Final({ dadosCadastrais, setDadosCadastrais, setActiveTab, closeModal, reset }: any) {
  const [loading, setLoading] = useState(false);
  const phoneMask = (value: any) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
  }

  const finalizarCadastro = async () => {
    const token = Cookie.get('accessToken')
    var cadastro = {
      "nome": dadosCadastrais.nome,
      "nascimento": dadosCadastrais.birthday,
      "cpf": dadosCadastrais.cpf,
      "mae": dadosCadastrais.mae,
      "pai": dadosCadastrais.pai,
      "conjuge": dadosCadastrais.conjuge,
      "genero": dadosCadastrais.genero,
      "cor": dadosCadastrais.cor,
      "frequencia": dadosCadastrais.frequencia,
      "caps": dadosCadastrais.caps,
      "prontuario": dadosCadastrais.prontuario,
      "cns": dadosCadastrais.cns,
      "cid": dadosCadastrais.cid,
      "inicioTratamento": dadosCadastrais.inicioTratamento,
      "drogas": dadosCadastrais.drogas,
      "doenca": dadosCadastrais.doenca,
      "usaMedicacao": dadosCadastrais.usaMedicacao,
      "alergiaMedicamento": dadosCadastrais.alergiaMedicamento,
      "familiaVuneravel": dadosCadastrais.familiaVuneravel,
      "beneficioSocial": dadosCadastrais.beneficioSocial,
      "escolaridade": dadosCadastrais.escolaridade,
      "motivoAcolhimento": dadosCadastrais.motivoAcolhimento,
      "servicoEncaminhado": dadosCadastrais.servicoEncaminhado,
      "condutaImediata": dadosCadastrais.condutaImediata,
      "telContato": dadosCadastrais.telContato,
      "tecResponsavel": dadosCadastrais.tecResponsavel,
      "password": "smbji"
    }
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, cadastro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      setLoading(true)
      setTimeout(() => {
        closeModal(false)
        setDadosCadastrais([])
        setActiveTab('pessoal')
        toast.success(e.data, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    }).catch(e => {
      setLoading(true)
      setTimeout(() => {
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
      }, 1200);
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }

  return (
    <div className="w-full">
      <h2 className="mb-3 font-semibold text-gray-800">Resumo do Cadastro {dadosCadastrais.length < 26 ? <span className='text-red-500 font-semibold text-xs uppercase flex items-center gap-2'><FiAlertTriangle /> Existe informações pendentes</span> : ''}</h2>
      {
        !dadosCadastrais ? <span>Não existe informações de cadastro</span> : (
          <div>
            <h2 className='my-1'>Informações Pessoais</h2>
            <pre className="flex bg-gray-100 rounded shadow">
              <div className="flex flex-wrap w-full my-3 text-left ">
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome completo : {dadosCadastrais.nome || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Data de nascimento: {!!dadosCadastrais.birthday && moment(dadosCadastrais.birthday).format("DD/MM/YYYY") || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    CPF: {dadosCadastrais.cpf || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome da mãe: {dadosCadastrais.mae || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome do pai: {dadosCadastrais.pai || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Nome do conjuge: {dadosCadastrais.conjuge || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Gênero: {dadosCadastrais.genero || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Raça/Cor: {dadosCadastrais.cor || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Telefone para contato: {phoneMask(dadosCadastrais.telContato) || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
              </div>
            </pre >

            <h2 className='mt-4'>Informações Sociais</h2>
            <pre className="flex bg-gray-100 rounded shadow mb-3">
              <div className="flex flex-wrap w-full my-3 text-left">
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Prontuario: {dadosCadastrais.prontuario || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    cns: {dadosCadastrais.cns || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    cid: {dadosCadastrais.cid || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Técnico Responsável: {dadosCadastrais.tecResponsavel || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Frequencia do usuário: {dadosCadastrais.frequencia || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Inicio do tratamento: {!!dadosCadastrais.inicioTratamento && moment(dadosCadastrais.inicioTratamento).format("DD/MM/YYYY") || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Alcool/Drogas: {dadosCadastrais.drogas || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Doença: {dadosCadastrais.doenca || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Usa Medicacao: {dadosCadastrais.usaMedicacao || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Alergia Medicamento: {dadosCadastrais.alergiaMedicamento || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Usuário do caps: {dadosCadastrais.caps || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Familia Vuneravel: {dadosCadastrais.familiaVuneravel || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Beneficio Social: {dadosCadastrais.beneficioSocial || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Escolaridade: {dadosCadastrais.escolaridade || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Motivo do Acolhimento: {dadosCadastrais.motivoAcolhimento || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Servico Encaminhado: {dadosCadastrais.servicoEncaminhado || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Conduta Imediata: {dadosCadastrais.condutaImediata || <span className='text-red-500 underline font-semibold'>Não informado</span>}
                  </label>
                </div>
              </div>
            </pre>

            <div className="border-t-[1px] py-3 sm:flex sm:flex-row-reverse justify-between items-center">
              {
                dadosCadastrais.length < 26 ? (
                  <button
                    onClick={() => {
                      setActiveTab('pessoal')
                    }}
                    className="inline-flex transition-all uppercase w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-gray-200 sm:ml-3 sm:w-auto"
                  >
                    Voltar e preencher
                  </button>
                ) : (
                  <>
                    <button
                      onClick={finalizarCadastro}
                      disabled={loading}
                      className="inline-flex w-full sm:w-48 transition-all justify-center uppercase rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3"
                    >
                      {loading ? <ImSpinner2 className='animate-spin text-lg' /> : "Cadastrar paciente"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('social')
                      }}
                      className="mt-3 inline-flex w-full justify-center rounded-md uppercase bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Voltar
                    </button>
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}