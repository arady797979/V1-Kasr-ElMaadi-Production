

/**
 * Application Configuration
 * All environment variables are prefixed with VITE_ for Vite compatibility.
 */

export const CONFIG = {
  // Fix: Use process.env instead of import.meta.env to resolve Property 'env' does not exist on type 'ImportMeta'
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000',
  // Fix: Use process.env instead of import.meta.env
  ENV: process.env.VITE_HOSPITAL_ENV || 'development',
  // Fix: Use NODE_ENV to determine production status when import.meta.env is unavailable
  IS_PROD: process.env.NODE_ENV === 'production',
};
