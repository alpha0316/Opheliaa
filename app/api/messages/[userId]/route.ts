import { auth, clerkClient } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/messages/[userId] — thread between the current user and [userId]
export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const partnerId = params.userId;

    // Resolve partner (Clerk name/avatar + profile username)
    let partner = { id: partnerId, name: 'Unknown user', imageUrl: '' as string | null, username: '' };
    try {
      const user = await clerkClient.users.getUser(partnerId);
      const profile = await db.profile.findFirst({ where: { userId: partnerId } });
      const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
      partner = {
        id: partnerId,
        name: name || profile?.username || 'Unknown user',
        imageUrl: user.imageUrl ?? profile?.profilePicture ?? '',
        username: profile?.username || ''
      };
    } catch {
      // partner may not exist — keep fallback
    }

    const conversation = await db.conversation.findFirst({
      where: {
        AND: [
          { participants: { has: userId } },
          { participants: { has: partnerId } }
        ]
      }
    });

    const messages = conversation
      ? await db.message.findMany({
          where: { conversationId: conversation.id },
          orderBy: { createdAt: 'asc' }
        })
      : [];

    return NextResponse.json({
      success: true,
      conversationId: conversation?.id ?? null,
      partner,
      messages: messages.map((m) => ({
        id: m.id,
        content: m.content,
        senderId: m.senderId,
        createdAt: m.createdAt,
        fromMe: m.senderId === userId
      }))
    });
  } catch (error) {
    console.error('Error loading thread:', error);
    return NextResponse.json({ success: false, message: 'Failed to load thread' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const recipientId = params.userId;

    if (userId === recipientId) {
      return NextResponse.json(
        { success: false, message: "You can't message yourself" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Find existing conversation between these users
    let conversation = await db.conversation.findFirst({
      where: {
        AND: [
          { participants: { has: userId } },
          { participants: { has: recipientId } }
        ]
      }
    });

    // Create conversation if it doesn't exist
    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          participants: [userId, recipientId]
        }
      });
    }

    // Create message
    const newMessage = await db.message.create({
      data: {
        conversationId: conversation.id,
        senderId: userId,
        content: message.trim()
      }
    });

    // Update conversation timestamp
    await db.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({
      success: true,
      message: newMessage,
      conversationId: conversation.id
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}