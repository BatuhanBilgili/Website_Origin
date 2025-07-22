import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  const about = await prisma.about.findFirst();
  return new Response(JSON.stringify({ content: about ? about.content : '' }), { status: 200 });
}

export async function POST(req) {
  const { content } = await req.json();
  let about = await prisma.about.findFirst();
  if (about) {
    about = await prisma.about.update({ where: { id: about.id }, data: { content } });
  } else {
    about = await prisma.about.create({ data: { content } });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200 });
} 