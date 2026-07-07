import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// Secret key for AES token encryption (must be 32 bytes/characters long)
const SECRET_KEY = process.env.JWT_SECRET || 'gUrUkUlAm-AgRa-SeCuRe-1234567890!'; 
const IV_LENGTH = 16;

/**
 * Hash a password using PBKDF2
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

/**
 * Verify a password using PBKDF2
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
}

/**
 * Generate a secure, encrypted token containing the payload
 */
export function generateToken(payload: any): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.alloc(32, SECRET_KEY), iv);
  let encrypted = cipher.update(JSON.stringify(payload), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Return token as iv_hex.encrypted_hex
  return iv.toString('hex') + '.' + encrypted;
}

import jwt from 'jsonwebtoken';

/**
 * Decrypt and verify a token, returning the payload or null
 * Supports both legacy AES encrypted tokens and new JWT tokens.
 */
export function verifyToken(token: string): any | null {
  try {
    // Check if it's a JWT (usually 3 parts separated by dots)
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-change-in-production') as any;
        // JWT decoded payload
        return { id: decoded.id, email: decoded.email || 'admin@gurukulam.org', role: decoded.role };
      } catch (jwtErr) {
        console.error('JWT Verify Error:', jwtErr);
        return null;
      }
    }

    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.alloc(32, SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (err) {
    console.error('Verify Token Error:', err);
    return null;
  }
}

/**
 * Express middleware to enforce admin authentication
 */
export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Auth denied: No token provided');
    return res.status(401).json({ success: false, error: 'Authorization denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Verifying token:', token.substring(0, 20) + '...');
  const payload = verifyToken(token);
  console.log('Payload from verifyToken:', payload);

  if (!payload || !payload.email) {
    console.log('Auth denied: Invalid payload', payload);
    return res.status(401).json({ success: false, error: 'Authorization denied: Invalid token' });
  }

  // Inject admin details in request for use down the line
  (req as any).admin = payload;
  next();
};
