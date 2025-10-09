import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Helper to compare password with optional hash
const comparePassword = async (plain: string, hashOrPlainFromEnv: string) => {
  // If it looks like a bcrypt hash, use bcrypt compare
  if (hashOrPlainFromEnv.startsWith('$2a$') || hashOrPlainFromEnv.startsWith('$2b$') || hashOrPlainFromEnv.startsWith('$2y$')) {
    return bcrypt.compare(plain, hashOrPlainFromEnv);
  }
  // Otherwise compare as plain text
  return plain === hashOrPlainFromEnv;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return res.status(500).json({ message: 'Missing JWT_SECRET' });

  // Admin credentials from env
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@unicreds.com';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'UniCreds@2024!';
  const ADMIN_NAME = process.env.ADMIN_NAME || 'Super Admin';
  const ADMIN_ROLE = process.env.ADMIN_ROLE || 'super_admin';

  const isValidEmail = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const isValidPassword = await comparePassword(password, ADMIN_PASSWORD);

  if (!isValidEmail || !isValidPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const user = {
    id: 'admin-1',
    email: ADMIN_EMAIL,
    name: ADMIN_NAME,
    role: ADMIN_ROLE,
  };

  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: '30m',
  });

  return res.status(200).json({ token, user });
}
