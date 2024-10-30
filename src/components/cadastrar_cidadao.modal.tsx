'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  CheckBadgeIcon,
  NumberedListIcon
} from "@heroicons/react/24/solid";
import axios from 'axios';
import clsx from "clsx";
import Cookie from 'js-cookie';
import moment from 'moment';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
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
  const [dadosCadastrais, setDadosCadastrais] = useState<CadastroCidadao>()

  const data = [
    {
      label: "Detalhe Pessoal",
      value: "pessoal",
      icon: NumberedListIcon,
      component: DadosPessoais({ setDadosCadastrais, setActiveTab })
    },
    {
      label: "Detalhe Social",
      value: "social",
      icon: NumberedListIcon,
      component: DadosSociais({ setDadosCadastrais, setActiveTab })
    },
    {
      label: "Finalizar Cadastro",
      value: "final",
      icon: CheckBadgeIcon,
      component: Final({ dadosCadastrais, setDadosCadastrais, setActiveTab, closeModal })
    }
  ];

  console.log(dadosCadastrais)

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
            className={`relative transform overflow-hidden rounded-lg bg-white min-h-[600px] w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[80%] data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>

            <div className="gap-2">
              <div className='shadow-md p-4 bg-cyan-800 flex gap-4 justify-around'>
                {data.map(({ label, value, icon }) => (
                  <button key={value} className={
                    clsx('p-4 px-8 rounded-lg',
                      {
                        'bg-white shadow-md': activeTab === value
                      }
                    )} onClick={() => {
                      console.log({ value })
                      setActiveTab(value)
                    }}>
                    <div className="flex items-center gap-1 relative">
                      {React.createElement(icon, { className: "w-5 h-5" })}
                      <b>{label}</b>
                      <span className='rounded-full absolute top-[-10px] right-[-20px] border-2 shadow-md border-cyan-900 h-5 w-5 text-sm font-bold flex items-center justify-center'>
                        {
                          value == 'pessoal' ? 1 : value == 'social' ? 2 : 3
                        }
                      </span>
                    </div>
                  </button>
                ))}
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

function DadosPessoais({ setDadosCadastrais, setActiveTab }: any) {
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
            <InputMask
              mask="999.999.999-99"
              {...register('cpf', { required: 'Por favor preencha este campo' })}
            >
              {(inputProps: any) => <input {...inputProps} type="text" placeholder="000.000.000-00" className={`${errors.cpf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="cpf" />}
            </InputMask>
            {
              errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
            }
          </div>
          <div className="w-full md:w-1/4 px-3 my-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="telContato">
              Telefone de contato *
            </label>
            <InputMask
              mask="(99) 99999-9999"
              {...register('telContato', { required: 'Por favor preencha este campo' })}
            >
              {(inputProps: any) => <input {...inputProps} placeholder='(22)99999-9999' type="tel" className={`${errors.telContato && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="telContato" />}
            </InputMask>
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

        <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            className={`cursor-pointer bg-green-600 hover:bg-green-500 inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
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

      <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
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
      </div>
    </form>
  )
}

function Final({ dadosCadastrais, setDadosCadastrais, setActiveTab, closeModal }: any) {
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
      setDadosCadastrais([])
      setActiveTab('pessoal')
      closeModal(false)
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
      console.log('Paciente cadastrado com sucesso')
    }).catch(e => {
      toast.error(`Verifique as informações e tente novamente. ${e}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  return (
    <div className="w-full">
      <h2 className="mb-3 font-semibold text-gray-800">Resumo do Cadastro</h2>
      {
        !dadosCadastrais ? <span>Não existe informações de cadastro</span> : (
          <div>
            <h2 className='my-1'>Informações Pessoais</h2>
            <pre className="flex bg-gray-100 rounded shadow">
              <div className="flex flex-wrap w-full my-3 text-left ">
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Nome completo : {dadosCadastrais.nome}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Data de nascimento: {moment(dadosCadastrais.birthday).format("DD/MM/YYYY")}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    CPF: {dadosCadastrais.cpf}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Nome da mãe: {dadosCadastrais.mae}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Nome do pai: {dadosCadastrais.pai}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Nome do conjuge: {dadosCadastrais.conjuge}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Gênero: {dadosCadastrais.genero}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Raça/Cor: {dadosCadastrais.cor}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Telefone para contato: {phoneMask(dadosCadastrais.telContato)}
                  </label>
                </div>
              </div>
            </pre >

            <h2 className='mt-4'>Informações Sociais</h2>
            <pre className="flex bg-gray-100 rounded shadow">
              <div className="flex flex-wrap w-full my-3 text-left">
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Prontuario: {dadosCadastrais.prontuario}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    cns: {dadosCadastrais.cns}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    cid: {dadosCadastrais.cid}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Técnico Responsável: {dadosCadastrais.tecResponsavel}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Frequencia do usuário: {dadosCadastrais.frequencia}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Inicio do tratamento: {moment(dadosCadastrais.inicioTratamento).format("DD/MM/YYYY")}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Alcool/Drogas: {dadosCadastrais.drogas}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Doença: {dadosCadastrais.doenca}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Usa Medicacao: {dadosCadastrais.usaMedicacao}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Alergia Medicamento: {dadosCadastrais.alergiaMedicamento}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Usuário do caps: {dadosCadastrais.caps}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Familia Vuneravel: {dadosCadastrais.familiaVuneravel}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Beneficio Social: {dadosCadastrais.beneficioSocial}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Escolaridade: {dadosCadastrais.escolaridade}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Motivo do Acolhimento: {dadosCadastrais.motivoAcolhimento}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Servico Encaminhado: {dadosCadastrais.servicoEncaminhado}
                  </label>
                </div>
                <div className="w-full md:w-1/3 px-3 my-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                    Conduta Imediata: {dadosCadastrais.condutaImediata}
                  </label>
                </div>
              </div>
            </pre>

            <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                onClick={finalizarCadastro}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Finalizar cadastro
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}