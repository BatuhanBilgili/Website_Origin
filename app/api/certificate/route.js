import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const certificates = await prisma.certificate.findMany({ orderBy: { id: 'desc' } });
  return new Response(JSON.stringify(certificates), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  const cert = await prisma.certificate.create({ data });
  return new Response(JSON.stringify(cert), { status: 201 });
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  const data = await req.json();
  const cert = await prisma.certificate.update({ where: { id }, data });
  return new Response(JSON.stringify(cert), { status: 200 });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  await prisma.certificate.delete({ where: { id } });
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 