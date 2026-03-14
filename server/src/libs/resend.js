import  { Resend } from 'resend'

export const resendClient = new Resend(process.env.resend_api_key);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: "chill chat",
};