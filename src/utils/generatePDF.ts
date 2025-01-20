import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

const generatePDF = async (data: FormData) => {
  const doc = new jsPDF();
  
  // Configurações iniciais
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // ===== PÁGINA 1: DADOS DO FORMULÁRIO =====
  
  // Adiciona cabeçalho
  doc.setFillColor(34, 197, 94); // bg-green-600
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Piauí + Genética', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Comprovante de Inscrição', pageWidth / 2, 30, { align: 'center' });

  // Reset configurações
  yPos = 50;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);

  // Número de protocolo e data
  const protocolo = `${Date.now().toString(36).toUpperCase()}`;
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Protocolo: ${protocolo}`, margin, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`Data: ${dataAtual}`, pageWidth - margin - 40, yPos);

  yPos += 20;

  // Dados Pessoais
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Dados Pessoais', margin, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const dadosPessoais = [
    ['Nome:', data.nome],
    ['CPF:', data.cpf],
    ['Telefone:', data.telefone],
    ['Email:', data.email],
    ['Cidade:', data.cidade],
    ['Localidade:', data.localidade]
  ];

  (doc as any).autoTable({
    startY: yPos,
    head: [],
    body: dadosPessoais,
    theme: 'plain',
    styles: { fontSize: 12, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 'auto' }
    },
    margin: { left: margin }
  });

  yPos = (doc as any).lastAutoTable.finalY + 15;

  // Dados da Propriedade
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Dados da Propriedade', margin, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const dadosPropriedade = [
    ['Área do Imóvel:', `${data.area_imovel} hectares`],
    ['Área de Pastagem:', `${data.area_pastagem} hectares`],
    ['Rebanho Total:', data.rebanho_total.toString()],
    ['Fêmeas em Reprodução:', data.femeas_reproducao.toString()],
    ['Animais para +Genética:', data.animais_genetica.toString()],
    ['Sêmen Utilizado:', data.semen_utilizado]
  ];

  (doc as any).autoTable({
    startY: yPos,
    head: [],
    body: dadosPropriedade,
    theme: 'plain',
    styles: { fontSize: 12, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 'auto' }
    },
    margin: { left: margin }
  });

  // Adicionar rodapé
  const addFooter = (pageNumber: number) => {
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    const rodape = [
      'Secretaria Municipal de Desenvolvimento Rural de Corrente - PI',
      'Avenida Manoel Lourenço Cavalcante, 600 - Nova Corrente',
      'CEP: 64980-000 - Corrente/PI',
      'Tel: (89) 3573-1053 | Email: prefeitura.corrente.pi@gmail.com',
      `Página ${pageNumber}`
    ];

    const footerY = pageHeight - 30;
    rodape.forEach((linha, index) => {
      doc.text(linha, pageWidth / 2, footerY + (index * 5), {
        align: 'center'
      });
    });
  };

  addFooter(1);

  return doc;
};

export default generatePDF;