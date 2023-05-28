import { jwt_secret } from './config.js';
import jwt from 'jsonwebtoken';


export function getUserIdFromBearerToken(bearerToken) {
  const token = bearerToken.split(' ')[1];
  const decoded = jwt.verify(token, jwt_secret);
  return decoded.id;
}

export function getUsernameFromBearerToken(bearerToken) {
  const token = bearerToken.split(' ')[1];
  const decoded = jwt.verify(token, jwt_secret);
  return decoded.name;
}

export function verifyUser(bearerToken) {
  try {
    const token = bearerToken.split(' ')[1];
    const decoded = jwt.verify(token, jwt_secret);
    console.log(decoded)
    return true;
  } catch (error) {
    return false;
  }
}

