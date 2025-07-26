/* eslint-disable @typescript-eslint/no-explicit-any */
import PDFDocument from "pdfkit";
import AppError from "../../erroralpers/appError";

export interface IInvoiceData {
  bookingDate: Date;
  transactionId: string;
  userName: string;
  tourTitle: string;
  guestCount: number;
  totalAmount: number;
}

export const generaPDF = async (
  invoiceData: IInvoiceData
): Promise<Buffer<ArrayBufferLike>> => {
  try {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      const buffer: Uint8Array[] = [];
      doc.on("data", (chunk) => buffer.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffer)));
      doc.on("error", (err) => reject(err));

      // PDF Content
      doc
        .fontSize(22)
        .fillColor("#2c3e50")
        .text("INVOICE", { align: "center", underline: true });
      doc.moveDown(1.5);

      // Transaction Details Section
      doc
        .fontSize(12)
        .fillColor("#333")
        .text(`Transaction ID:`, { continued: true })
        .font("Helvetica-Bold")
        .text(` ${invoiceData.transactionId}`);

      doc
        .font("Helvetica")
        .text(`Booking Date:`, { continued: true })
        .font("Helvetica-Bold")
        .text(` ${invoiceData.bookingDate.toLocaleDateString()}`);

      doc
        .font("Helvetica")
        .text(`Customer:`, { continued: true })
        .font("Helvetica-Bold")
        .text(` ${invoiceData.userName}`);

      doc.moveDown(1);

      // Booking Info Section
      doc
        .font("Helvetica")
        .text(`Tour Title:`, { continued: true })
        .font("Helvetica-Bold")
        .text(` ${invoiceData.tourTitle}`);

      doc
        .font("Helvetica")
        .text(`Guest Count:`, { continued: true })
        .font("Helvetica-Bold")
        .text(` ${invoiceData.guestCount}`);

      doc.moveDown(1);

      // Total Amount (highlighted box)
      doc
        .rect(doc.x, doc.y, 300, 30)
        .fill("#f1f1f1")
        .stroke()
        .fillColor("#000")
        .fontSize(14)
        .font("Helvetica-Bold")
        .text(
          `Total Amount: $${invoiceData.totalAmount.toFixed(2)}`,
          doc.x + 10,
          doc.y + 7
        );

      doc.moveDown(3);

      // Footer Thank You
      doc
        .fontSize(12)
        .fillColor("#888")
        .font("Helvetica-Oblique")
        .text("Thank you for booking with us!", { align: "center" });

      doc
        .fontSize(10)
        .fillColor("#aaa")
        .text("For any queries, contact support@example.com", {
          align: "center",
        });
      doc.end();
    });
  } catch (error: any) {
    console.log(error);
    throw new AppError(401, `pdf Generate error:  ${error.message}`);
  }
};
