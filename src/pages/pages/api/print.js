import escpos from 'escpos';
import usb from 'escpos-usb'; // Adicione o módulo USB

escpos.USB = usb; // Conecte o escpos ao módulo USB

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const device = new escpos.USB(); // Aqui conecta na impressora USB
            const printer = new escpos.Printer(device);

            device.open(() => {
                printer
                    .align('ct')
                    .text('Nome do Produto')
                    .text('Quantidade: 1')
                    .text('Valor: R$ 10,00')
                    .cut()
                    .close();
            });

            res.status(200).json({ message: 'Impressão realizada com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao tentar imprimir' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
