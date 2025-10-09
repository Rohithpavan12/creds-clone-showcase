import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) return res.status(500).json({ message: 'Missing JWT_SECRET' });

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // Return minimal user info from token claims; in real world, fetch from DB
    return res.status(200).json({
      user: {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      }
    });
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}
