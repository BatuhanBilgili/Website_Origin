import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const experiences = await prisma.experience.findMany({ orderBy: { id: 'desc' } });
  return new Response(JSON.stringify(experiences), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const exp = await prisma.experience.create({ data });
  return new Response(JSON.stringify(exp), { status: 201 });
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  const data = await req.json();
  const exp = await prisma.experience.update({ where: { id }, data });
  return new Response(JSON.stringify(exp), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  await prisma.experience.delete({ where: { id } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 