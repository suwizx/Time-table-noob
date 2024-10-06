import { PrismaClient } from "@prisma/client";
import { NextResponse , NextRequest } from "next/server";

const db = new PrismaClient();
export async function GET() {
    const dates = await db.time.findMany({
        orderBy: {
            time: "asc"
        }
    });
    return NextResponse.json({ dates });
}

export async function POST(req: NextRequest) {
    const { title , time } =  await req.json()
    console.log(title , time);
    
    const newDate = await db.time.create({
        data: {
            title,
            time
        }
    });
    return NextResponse.json({ newDate });
}

export async function PUT(req: NextRequest) {
    const { id , title , time } =  await req.json()
    const updatedDate = await db.time.update({
        where: {
            id
        },
        data: {
            title,
            time
        }
    });
    return NextResponse.json({ updatedDate });
}