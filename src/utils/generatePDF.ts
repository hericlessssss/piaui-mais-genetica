import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { supabase } from '../lib/supabase';

const generatePDF = async (data: FormData & { comprovante_url: string }, fileUrl: string) => {
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
  doc.text('Piauí +Genética', pageWidth / 2, 20, { align: 'center' });
  
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

  // Adicionar rodapé na primeira página
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

  // ===== PÁGINA 2: PÁGINA INTERMEDIÁRIA =====
  doc.addPage();

  // Centralizar o texto na página
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0);
  doc.text('Anexo do Comprovante de Inscrição ADAPI', pageWidth / 2, pageHeight / 2 - 10, {
    align: 'center'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.text('Documento anexado pelo produtor rural', pageWidth / 2, pageHeight / 2 + 10, {
    align: 'center'
  });

  addFooter(2);

  try {
    // Baixar o arquivo do Supabase
    const { data: fileData, error } = await supabase.storage
      .from('comprovantes')
      .download(fileUrl);

    if (error) throw error;

    if (fileData) {
      // Converter o arquivo para base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });
      reader.readAsDataURL(fileData);
      const base64Data = await base64Promise;

      if (fileData.type.startsWith('image/')) {
        // Se for uma imagem, adicionar como imagem
        doc.addPage();
        
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = base64Data;
        });

        // Calcular dimensões mantendo a proporção
        const maxWidth = pageWidth - (2 * margin);
        const maxHeight = pageHeight - (2 * margin);
        let imgWidth = img.width;
        let imgHeight = img.height;

        if (imgWidth > maxWidth) {
          const ratio = maxWidth / imgWidth;
          imgWidth = maxWidth;
          imgHeight = imgHeight * ratio;
        }

        if (imgHeight > maxHeight) {
          const ratio = maxHeight / imgHeight;
          imgHeight = maxHeight;
          imgWidth = imgWidth * ratio;
        }

        // Centralizar a imagem na página
        const xPos = (pageWidth - imgWidth) / 2;
        const yPos = (pageHeight - imgHeight) / 2;

        doc.addImage(base64Data, 'JPEG', xPos, yPos, imgWidth, imgHeight);
        addFooter(3);
      } else if (fileData.type === 'application/pdf') {
        // Se for PDF, importar as páginas do PDF
        const pdfBytes = await fileData.arrayBuffer();
        const pdfDoc = await (window as any).pdfjsLib.getDocument({ data: pdfBytes }).promise;
        
        // Importar cada página do PDF anexado
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          doc.addPage();
          
          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1 });
          
          // Criar um canvas temporário para renderizar a página do PDF
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context!,
            viewport: viewport
          }).promise;
          
          // Adicionar a página renderizada ao PDF final
          const pageImage = canvas.toDataURL('image/jpeg', 1.0);
          doc.addImage(pageImage, 'JPEG', 0, 0, pageWidth, pageHeight);
          
          addFooter(pageNum + 2); // +2 porque já temos 2 páginas anteriores
        }
      }
    }
  } catch (error) {
    console.error('Erro ao adicionar arquivo ao PDF:', error);
    doc.addPage();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(255, 0, 0);
    doc.text('Não foi possível incluir o arquivo anexado.', pageWidth / 2, pageHeight / 2, {
      align: 'center'
    });
    addFooter(3);
  }

  return doc;
};

export default generatePDF;