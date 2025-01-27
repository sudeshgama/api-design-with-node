import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.JWT_SECRET
  )
  return token;
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send({ message: 'Not Authorized' });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.send({ message: 'Not a valid token' });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.user = payload;
    next();
    return;
  } catch (e) {
    res.status(401);
    res.send({ message: 'Not a valid token' });
    return;
  }
}

export const comparePasswords = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 5);
}