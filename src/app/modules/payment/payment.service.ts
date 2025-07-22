/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import AppError from "../../../erroralpers/appError";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { sslServices } from "../sslCommerz/sslCommerz.service";

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

    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,

      {
        status: BOOKING_STATUS.COMPLETE,
      },

      { runValidators: true, session }
    );

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
