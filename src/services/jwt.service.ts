import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateJWT(payload: any): string {
  return jwt.sign(payload , secretKey as string);
}

export function verifyJWT(token: string): unknown {
  try {
    const decodedToken = jwt.verify(token, secretKey as string);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
