import { auth, clerkClient } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /api/messages — list the current user's conversations
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const conversations = await db.conversation.findMany({
      where: { participants: { has: userId } },
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: { orderBy: { createdAt: 'desc' }, take: 1 }
      }
    });

    const items = await Promise.all(
      conversations.map(async (conv) => {
        const partnerId = conv.participants.find((p) => p !== userId) ?? '';
        let partner = {
          id: partnerId,
          name: 'Unknown user',
          imageUrl: '' as string | null,
          username: ''
        };

        if (partnerId) {
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
            // partner may have been deleted — keep fallback
          }
        }

        const last = conv.messages[0];

        return {
          conversationId: conv.id,
          partner,
          lastMessage: last
            ? { content: last.content, createdAt: last.createdAt, senderId: last.senderId, fromMe: last.senderId === userId }
            : null,
          updatedAt: conv.updatedAt
        };
      })
    );

    return NextResponse.json({ success: true, conversations: items });
  } catch (error) {
    console.error('Error listing conversations:', error);
    return NextResponse.json({ success: false, message: 'Failed to load conversations' }, { status: 500 });
  }
}
