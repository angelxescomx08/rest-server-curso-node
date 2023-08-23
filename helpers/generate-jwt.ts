import jwt from "jsonwebtoken";

export const generateJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY as string,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Algo salió mal");
        } else {
          resolve(token);
        }
      }
    );
  });
};
