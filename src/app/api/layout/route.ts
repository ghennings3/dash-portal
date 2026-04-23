import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { userConfigs } from "@/db/schema";
import { layoutSchema } from "@/lib/validations/layout";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const config = await db.query.userConfigs.findFirst({
      where: eq(userConfigs.userId, userId),
    });

    return NextResponse.json({ layout: config?.layout || [] });
  } catch (error) {
    console.error("GET /api/layout error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const layout = body.layout;
    
    // Validate with Zod
    const parsedLayout = layoutSchema.parse(layout);

    const existingConfig = await db.query.userConfigs.findFirst({
        where: eq(userConfigs.userId, userId),
    });

    if (existingConfig) {
        await db.update(userConfigs)
            .set({ layout: parsedLayout, updatedAt: new Date() })
            .where(eq(userConfigs.userId, userId));
    } else {
        await db.insert(userConfigs)
            .values({
                userId,
                layout: parsedLayout,
            });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH /api/layout error:", error);
    return NextResponse.json({ error: "Invalid data or internal error" }, { status: 400 });
  }
}
