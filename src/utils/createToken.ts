import jwt from 'jsonwebtoken';
import { SECRET } from '../config/constants';

const createToken = (_id:number) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
}

export default createToken;
