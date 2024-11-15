"use client"
import { useState } from 'react';

const Fornecedor = () => {
    const [currentStep, setCurrentStep] = useState('fornecedor');
    const [showSuccess, setShowSuccess] = useState(false);
    const [supplierData, setSupplierData] = useState({
        name: '',
        cnpj: '',
        email: '',
        phone: '',
        address: '',
    });

    const [invoiceData, setInvoiceData] = useState({
        number: '',
        date: '',
        value: '',
        items: [],
    });

    const handleSupplierSubmit = (e: any) => {
        e.preventDefault();
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            // setCurrentStep('endereco');
        }, 2000);
    };

    const finalizarCadastro = (e: any) => {
        alert(e)
    };

    const Tab = ({ label, active, disabled, onClick }: any) => (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        py-2 px-4 text-sm font-medium rounded-lg transition-all
        ${active
                    ? 'bg-allintra-primary-800 text-white'
                    : 'bg-gray-100 text-gray-500'}
        ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-allintra-primary-700 hover:text-white'}
      `}
        >
            {label}
        </button>
    );

    const Label = ({ htmlFor, children }: any) => (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {children}
        </label>
    );

    const Input = ({ id, type = "text", placeholder, value, onChange, required }: any) => (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
    );

    const Button = ({ type = "button", variant = "primary", onClick, children }: any) => (
        <button
            type={type}
            onClick={onClick}
            className={`
        px-4 py-2 rounded-lg font-medium flex items-center
        ${variant === 'primary'
                    ? 'bg-allintra-primary-800 text-white hover:bg-allintra-primary-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-allintra-primary-50'}
      `}
        >
            {children}
        </button>
    );

    const Card = ({ title, description, children }: any) => (
        <div className="bg-white rounded-lg shadow-sm border border-allintra-primary-50 h-full">
            <div className="p-6">
                <h2 className="text-xl font-semibold text-allintra-black-500">{title}</h2>
                <p className="mt-1 text-sm text-allintra-gray-500">{description}</p>
            </div>
            <div className="px-6 pb-6">
                {children}
            </div>
        </div>
    );

    return (
        <div className='bg-white my-3 w-full rounded-md'>
            <div className='rounded-md w-full flex gap-3 relative justify-center'>
                <div className="p-4 w-full">
                    <h2>Medicamentos</h2>
                </div>
            </div>
        </div>
    );
};

export default Fornecedor;