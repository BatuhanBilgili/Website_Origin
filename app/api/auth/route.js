import { PrismaClient } from '../../generated/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'gizliAnahtar';

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    
    console.log('Login attempt:', { username, password: password ? '***' : 'undefined' });
    
    if (!username || !password) {
      console.log('Missing username or password');
      return new Response(JSON.stringify({ error: 'Kullanıcı adı ve şifre gerekli.' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    console.log('Admin found:', admin ? 'Yes' : 'No');
    
    if (!admin) {
      console.log('Admin not found');
      return new Response(JSON.stringify({ error: 'Kullanıcı adı veya şifre yanlış.' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Checking password...');
    const isValid = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
      console.log('Invalid password');
      return new Response(JSON.stringify({ error: 'Kullanıcı adı veya şifre yanlış.' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Creating JWT token...');
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    console.log('JWT token created:', token.substring(0, 20) + '...');
    
    console.log('Login successful, setting cookie...');
    const cookieValue = `admin_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
    console.log('Cookie value:', cookieValue);
    
    return new Response(JSON.stringify({ success: true, message: 'Giriş başarılı!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieValue
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    return new Response(JSON.stringify({ error: 'Sunucu hatası.' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 