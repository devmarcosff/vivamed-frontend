"use client"
import { Check } from 'lucide-react';
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
                <div className="container p-4 w-1/2">
                    <Card
                        title="Cadastro de Nota Fiscal"
                        description={`Insira as informações da nota fiscal do fornecedor ${supplierData.name}`}
                    >
                        <form onSubmit={() => { }} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-number">Número da NF</Label>
                                    <Input
                                        id="invoice-number"
                                        placeholder="000000000"
                                        value={invoiceData.number}
                                        onChange={(e: any) => setInvoiceData({ ...invoiceData, number: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-date">Data de Emissão</Label>
                                    <Input
                                        id="invoice-date"
                                        type="date"
                                        value={invoiceData.date}
                                        onChange={(e: any) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="invoice-value">Valor Total</Label>
                                    <Input
                                        id="invoice-value"
                                        type="number"
                                        placeholder="0,00"
                                        value={invoiceData.value}
                                        onChange={(e: any) => setInvoiceData({ ...invoiceData, value: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Itens da Nota</Label>
                                <div className="border rounded-lg p-4 bg-allintra-primary-50">
                                    <p className="text-sm text-gray-500">
                                        Funcionalidade de adição de itens em desenvolvimento
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="secondary"
                                    onClick={() => setCurrentStep('fornecedor')}
                                >
                                    Voltar
                                </Button>
                                <Button>
                                    Finalizar
                                    <Check className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>

            </div>

            {/* <div className="container p-4 w-full">
                <Card
                    title="Controle de Estoque"
                    description="Gerencie o estoque dos itens da nota fiscal"
                >
                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <p className="text-sm text-gray-500">
                                Interface de gerenciamento de estoque será implementada aqui
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                variant="secondary"
                                onClick={() => setCurrentStep('endereco')}
                            >
                                Voltar
                            </Button>
                            <Button>
                                Finalizar
                                <Check className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div> */}
        </div>
    );
};

export default Fornecedor;