import { OAuth2Client } from "google-auth-library";

export class VerifyGoogleTokenError extends Error {
  constructor() {
    super("Error al verificar el token de google");
    this.name = "Error al verificar el token de google";
  }
}

const client = new OAuth2Client();

export async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new VerifyGoogleTokenError();
  }
  const { email, name, picture } = payload;
  return {
    email,
    name,
    picture,
  };
}
