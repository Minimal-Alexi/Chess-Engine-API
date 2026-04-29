export const SECRET = process.env.SECRET || require('crypto').randomBytes(64).toString('hex');
export const PORT = process.env.PORT || 8000;
