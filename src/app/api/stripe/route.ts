import prisma from '@/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(Request: Request) {
  const apiData = await Request.text();

  const signature = Request.headers.get('Stripe-Signature');

  // verify webhook came from stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      apiData,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log('Webhook verification failed', error);
    return Response.json(null, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case 'checkout.session.completed':
      await prisma.petsoftUser.update({
        where: {
          email: event.data.object.customer_email!,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // return 200 OK
  return Response.json(null, { status: 200 });
}
