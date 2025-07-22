import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function GET() {
  const admins = await prisma.admin.findMany({ select: { id: true, username: true, createdAt: true } });
  return new Response(JSON.stringify(admins), { status: 200 });
}

export async function POST(req) {
  const { username, password } = await req.json();
  if (!username || !password) return new Response(JSON.stringify({ error: 'Eksik bilgi' }), { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({ data: { username, password: hashedPassword } });
  return new Response(JSON.stringify({ id: admin.id, username: admin.username }), { status: 201 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return new Response(JSON.stringify({ error: 'Eksik id' }), { status: 400 });
  await prisma.admin.delete({ where: { id } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 