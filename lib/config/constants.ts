import logoLight from "@/public/images/logo/logo-light.svg";
import logoDark from "@/public/images/logo/logo-dark.svg";

/**
 * The name of the application used for branding, titles, and metadata.
 */
export const APPLICATION_NAME = "France Cuba Wedding App";

/**
 * The logo displayed in light mode.
 */
export const LIGHT_LOGO = logoLight;

/**
 * The logo displayed in dark mode.
 */
export const DARK_LOGO = logoDark;

/**
 * The base URL of the application, typically set from environment variables.
 */
export const BASE_URL = process.env.BASE_URL;

/**
 * PayPal Client ID used to initialize the PayPal JS SDK.
 */
export const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

/**
 * Stripe publishable key used to initialize Stripe.js on the client side.
 */
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
