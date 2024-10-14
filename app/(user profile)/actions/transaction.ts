"use server";

import prisma from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";

export const savePaypalTransaction = async (details: any, orderId:string) => {  
  const session = await getServerSession(authOptions);
	const dbitems = await prisma.buyerPaymentGatewayTransactions.create({
		data: {
      userEmail:session?.user?.email,
      userOrdersId:orderId,
      paymentId:details.id,
      paymentStatus:details.status,
      paymentCurrency:details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.currency_code,
      paymentAmount:Number(details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.gross_amount.value),
      payerName:details.payer.name.given_name + " " + details.payer.name.surname,
      payerEmail:details.payer.email_address,
      payerId:details.payer.payer_id,
      gatwayFee:Number(details.purchase_units[0].payments.captures[0].seller_receivable_breakdown.paypal_fee.value),
      paymentDetails:details,      
    },
	});

	
  

	return dbitems;
};
