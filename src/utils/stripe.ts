import { loadStripe } from '@stripe/stripe-js';
export const stripePromise = loadStripe('your-stripe-key');