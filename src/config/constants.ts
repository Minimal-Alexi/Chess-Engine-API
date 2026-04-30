export const SECRET = process.env.SECRET || require('crypto').randomBytes(64).toString('hex');
export const NR_OF_SALTING_ROUNDS = parseInt(process.env.NR_OF_SALTING_ROUNDS || '10', 10);
export const PORT = process.env.PORT || 8000;
