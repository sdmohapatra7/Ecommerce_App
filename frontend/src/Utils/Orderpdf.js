import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../components/images/logo.png"; // logo path or base64

export const Orderpdf = (order, action = "download") => {
  // A4 portrait mode
  const doc = new jsPDF({
    unit: "mm",
    format: "a4",
    orientation: "portrait",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;

  // -----------------------
  // 🔹 Header
  if (logo) {
    doc.addImage(logo, "PNG", pageWidth - 60, 10, 50, 10);
  }

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ESmart", margin, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const address = [
    "123, Tech Park, Silicon City",
    "Email: info@esmart.com | Phone: +91-9876543210",
    "Website: www.esmart.com",
  ];
  address.forEach((line, i) => {
    doc.text(line, pageWidth - margin, 25 + (i + 1) * 4.5, { align: "right" });
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  const orderIdLine = `Order ID: ${order._id}`;
const orderDateLine = `Date: ${new Date(order.createdAt).toLocaleDateString()}`;

// Draw lines
doc.text(orderIdLine, margin, 28);
doc.text(orderDateLine, margin, 34);

  // -----------------------
  // 🔹 Customer Info Box
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Customer Details", margin, 45);

  doc.setDrawColor(180);
  doc.setLineWidth(0.5);
  doc.rect(margin, 48, pageWidth - 2 * margin, 25, "S");

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${order.user?.name || "Guest"}`, margin + 4, 56);
  doc.text(`Email: ${order.user?.email || "-"}`, margin + 4, 62);
  doc.text(`Status: ${order.orderStatus}`, margin + 4, 68);

  // -----------------------
  // 🔹 Order Items Table
  const tableColumn = ["Product", "Qty", "Price", "Total"];
  const tableRows = [];

  order.orderItems.forEach((item) => {
    tableRows.push([
      item.name,
      item.quantity,
      `${item.price.toFixed(2)}`,
      `${(item.quantity * item.price).toFixed(2)}`,
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 80,
    theme: "grid",
    styles: {
      fontSize: 11,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [0, 123, 255],
      textColor: 255,
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 90 }, // Product
      1: { halign: "center" },
      2: { halign: "right" },
      3: { halign: "right" },
    },
    didParseCell: (data) => {
      if (data.section === "head" && (data.column.index === 2 || data.column.index === 3)) {
        data.cell.styles.halign = "right";
      }
    },
  });

  // -----------------------
  // 🔹 Totals Section
  let finalY = doc.lastAutoTable.finalY + 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Summary", margin, finalY);

  autoTable(doc, {
    body: [
      ["Items Price", `${order.itemsPrice.toFixed(2)}`],
      ["Shipping", `${order.shippingPrice.toFixed(2)}`],
      ["Tax", `${order.taxPrice.toFixed(2)}`],
      ["Grand Total", `${order.totalPrice.toFixed(2)}`],
    ],
    startY: finalY + 5,
    theme: "plain",
    styles: { fontSize: 12 },
    columnStyles: {
      0: { fontStyle: "bold" },
      1: { halign: "right" },
    },
    didParseCell: (data) => {
      if (data.row.index === 3) {
        data.cell.styles.fontSize = 14;
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = [200, 0, 0];
      }
    },
  });

  // -----------------------
  // 🔹 Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(200);
    doc.line(margin, 285, pageWidth - margin, 285);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("ESmart - Thank you for shopping with us!", margin, 292);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, 292, { align: "right" });
  }

  // -----------------------
  // 🔹 Action (Download / Print)
  if (action === "download") {
    setTimeout(() => {
      doc.save(`order_${order._id}.pdf`);
    }, 100);
  } else if (action === "print") {
    const pdfUrl = doc.output("bloburl");
    const win = window.open(pdfUrl, "_blank");
    win.onload = () => win.print();
  }
};
