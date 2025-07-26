/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import AppError from "../../../erroralpers/appError";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { sslServices } from "../sslCommerz/sslCommerz.service";
import { generaPDF, IInvoiceData } from "../../utils/invoice";
import { ITour } from "../tour/tour.interface";
import { IUser } from "../user/user.interface";
import { sendEmail } from "../../utils/sendEmail";

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });

  if (!payment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Payment Not  Found you can not booked the tour"
    );
  }
  const booking = await Booking.findById(payment.booking);
  const userAddress = (booking?.user as any).address;
  const userEmail = (booking?.user as any).email;
  const userPoneNumber = (booking?.user as any).phone;
  const userName = (booking?.user as any).name;

  const sslPayload: ISSLCommerz = {
    address: userAddress,
    email: userEmail,
    phoneNumber: userPoneNumber,
    name: userName,
    amount: payment.amount,
    transactionId: payment.transactionId,
  };
  const sslPayment = await sslServices.sslPaymentInit(sslPayload);
  return {
    payment: (sslPayment as { GatewayPageURL: string }).GatewayPageURL,
  };
};
const successPayment = async (query: Record<string, string>) => {
  console.log(query, "success pattttt");
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },

      {
        status: PAYMENT_STATUS.PAID,
      },

      { session }
    );
    if (!updatedPayment) {
      throw new AppError(401, "Payment not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      updatedPayment?.booking,

      {
        status: BOOKING_STATUS.COMPLETE,
      },

      { new: true, runValidators: true, session }
    )
      .populate("tour", "title")
      .populate("user", "name email");

    if (!updatedBooking) {
      throw new AppError(401, "Booking not found");
    }
    const invoiceData: IInvoiceData = {
      bookingDate: updatedBooking.createdAt as Date,
      guestCount: updatedBooking.guestCount,
      totalAmount: updatedPayment.amount,
      tourTitle: (updatedBooking.tour as unknown as ITour).title,
      transactionId: updatedPayment.transactionId,
      userName: (updatedBooking.user as unknown as IUser).name,
    };

    const pdfBuffer = await generaPDF(invoiceData);

    await sendEmail({
      to: (updatedBooking.user as unknown as IUser).email,
      subject: "Your Booking Invoice",
      templateName: "invoice",
      templateData: invoiceData,
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    await session.commitTransaction(); //transaction
    session.endSession();
    return {
      success: true,
      message: "Payment Complete Successfully",
    };
  } catch (error) {
    await session.abortTransaction(); // rolBack
    session.endSession();
    throw error;
  }
};

const failPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },

      {
        status: PAYMENT_STATUS.FAILED,
      },

      { session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,

      {
        status: BOOKING_STATUS.FAILED,
      },

      { runValidators: true, session }
    );

    await session.commitTransaction(); //transaction
    session.endSession();
    return {
      success: false,
      message: "Payment failed",
    };
  } catch (error) {
    await session.abortTransaction(); // rolBack
    session.endSession();
    throw error;
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },

      {
        status: PAYMENT_STATUS.CANCELLED,
      },

      { session }
    );

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,

      {
        status: BOOKING_STATUS.CANCEL,
      },

      { runValidators: true, session }
    );
    await session.commitTransaction(); //transaction
    session.endSession();
    return {
      success: false,
      message: "Payment Canceled",
    };
  } catch (error) {
    await session.abortTransaction(); // rolBack
    session.endSession();
    throw error;
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
