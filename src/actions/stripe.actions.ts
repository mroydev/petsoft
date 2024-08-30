'use server';

import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables and TypeScript support enabled
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function createCheckoutSession() {
  // Check if the user is authenticated
  const session = await auth();
  if (!session?.user) {
    redirect('/sign-in');
  }

  // Create a checkout session with Stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    // Set the customer's email from the authenticated session
    customer_email: session.user.email!,
    // Specify the payment method types allowed (in this case, only card payments)
    payment_method_types: ['card'],
    // Set the mode of the session to payment (one-time payment)
    mode: 'payment',

    // Define the shipping address collection
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'IN'],
    },

    // Define the items to be purchased in the checkout session
    line_items: [
      {
        // Use a predefined price ID for the item
        price: 'price_1PaAnUSHsKeTJQL4bY0SJV8e',
        // Set the quantity of the item to be purchased
        quantity: 1,
      },
    ],

    // Define the URL to redirect to upon successful payment
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    // Define the URL to redirect to if the payment is cancelled
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`,
  });

  // Redirect the user to the Stripe checkout session URL
  redirect(checkoutSession.url!);
}
