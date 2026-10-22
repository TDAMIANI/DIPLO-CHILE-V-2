import { jsPDF } from 'jspdf';
import { SESSIONS_DATA } from '../data';

export function exportCompletedSessionsPDF(completedSessionIds: string[]) {
  if (completedSessionIds.length === 0) {
    alert("No tienes sesiones marcadas como completadas para exportar.");
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  let y = 20;

  // Helper to check page bounds and auto-add pages
  function checkPageBreak(lineHeight: number) {
    if (y + lineHeight > pageHeight - margin - 10) {
      doc.addPage();
      drawRunningHeader();
      y = 25;
    }
  }

  // Draw header for new pages
  function drawRunningHeader() {
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // Slate 400
    doc.text("Taller Corporativo de IA Aplicada • Reporte de Avances", margin, 12);
    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.2);
    doc.line(margin, 14, pageWidth - margin, 14);
  }

  // Cover Page or Main Header
  // Elegant Slate background header
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Title
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("IA APLICADA A PRODUCTOS Y SERVICIOS", margin, 18);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(129, 140, 248); // Indigo 400
  doc.text("REPORTE DE AVANCES Y NOTAS PERSONALES • MÓDULO 4", margin, 26);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text(`Generado el: ${new Date().toLocaleDateString()} • Alumna: Tania Damiani`, margin, 34);

  y = 55;

  // Overview Stats
  doc.setFillColor(248, 250, 252); // Slate 50
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'FD');

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text("Resumen de Progreso Académico:", margin + 6, y + 8);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105); // Slate 600
  doc.text(`Sesiones Completadas: ${completedSessionIds.length} de ${SESSIONS_DATA.length} misiones del programa.`, margin + 6, y + 15);

  y += 32;

  // Iterate over completed sessions
  SESSIONS_DATA.forEach((session, sIdx) => {
    if (!completedSessionIds.includes(session.id)) return;

    checkPageBreak(35);

    // Session Title Banner
    doc.setFillColor(241, 245, 249); // Slate 100
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'FD');

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text(`SESIÓN ${sIdx + 1}: ${session.title.toUpperCase()}`, margin + 5, y + 7);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text(session.date, margin + 5, y + 13.5);

    y += 24;

    // Theory Topics Section
    checkPageBreak(15);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text("Temas Teóricos Abordados:", margin, y);
    y += 6;

    session.theory.points.forEach((point) => {
      // Split the title to ensure it fits
      const cleanPointTitle = point.title.includes(':') ? point.title.split(':')[1].trim() : point.title;
      const wrappedTitle = doc.splitTextToSize(`•  ${cleanPointTitle}`, contentWidth - 5);
      
      checkPageBreak(wrappedTitle.length * 5 + 2);
      
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85); // Slate 700
      wrappedTitle.forEach((line: string) => {
        doc.text(line, margin + 3, y);
        y += 5;
      });

      // Add details (first 2 details for space efficiency)
      point.details.slice(0, 2).forEach((detail) => {
        const detailMain = detail.split(' | ')[0];
        const wrappedDetail = doc.splitTextToSize(detailMain, contentWidth - 12);
        
        checkPageBreak(wrappedDetail.length * 4.5 + 2);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(100, 116, 139); // Slate 500
        wrappedDetail.forEach((line: string) => {
          doc.text(line, margin + 8, y);
          y += 4.5;
        });
      });
      y += 2;
    });

    y += 4;

    // Practice Laboratory Section
    checkPageBreak(25);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("Laboratorio Práctico Desarrollado:", margin, y);
    y += 6;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(219, 39, 119); // Pink 600
    doc.text(session.practice.title, margin + 3, y);
    y += 5;

    const wrappedDesc = doc.splitTextToSize(session.practice.description, contentWidth - 5);
    checkPageBreak(wrappedDesc.length * 4.5 + 4);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    wrappedDesc.forEach((line: string) => {
      doc.text(line, margin + 3, y);
      y += 4.5;
    });
    y += 2;

    // Tools Used row
    checkPageBreak(8);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Herramientas de IA Utilizadas: ${session.practice.toolsUsed.map(t => t.toUpperCase()).join(', ')}`, margin + 3, y);
    y += 8;

    // User's Personal Notes
    const notes = localStorage.getItem(`session_notes_${session.id}`);
    if (notes && notes.trim().length > 0) {
      checkPageBreak(25);

      doc.setFillColor(254, 252, 232); // Amber 50 (warm notes background)
      doc.setDrawColor(253, 224, 71); // Yellow 300
      doc.setLineWidth(0.3);
      
      const wrappedNotes = doc.splitTextToSize(notes.trim(), contentWidth - 10);
      const notesBlockHeight = (wrappedNotes.length * 4.5) + 12;

      checkPageBreak(notesBlockHeight + 6);

      doc.roundedRect(margin, y, contentWidth, notesBlockHeight, 2, 2, 'FD');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(133, 77, 14); // Amber 800
      doc.text("Mis Notas Personales y Apuntes de la Clase:", margin + 5, y + 6);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(69, 26, 3); // Amber 950
      
      let noteY = y + 12;
      wrappedNotes.forEach((line: string) => {
        doc.text(line, margin + 5, noteY);
        noteY += 4.5;
      });

      y += notesBlockHeight + 8;
    } else {
      y += 4;
    }

    y += 6; // separator gap between sessions
  });

  // Footer on last page
  checkPageBreak(20);
  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Fin del Reporte • Taller Diseñado para Tania Damiani • Santiago, Chile", pageWidth / 2, y + 10, { align: 'center' });

  doc.save(`Reporte_IA_Aplicada_Tania_Damiani_${new Date().toISOString().split('T')[0]}.pdf`);
}
