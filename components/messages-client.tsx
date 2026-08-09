'use client';

import Link from 'next/link';
import axios from 'axios';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Loader2, Send, MessageCircle, ArrowLeft } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Partner { id: string; name: string; imageUrl: string | null; username: string; }
interface ConvItem {
  conversationId: string;
  partner: Partner;
  lastMessage: { content: string; createdAt: string; senderId: string; fromMe: boolean } | null;
  updatedAt: string;
}
interface ThreadMessage { id: string; content: string; senderId: string; createdAt: string; fromMe: boolean; }
interface Thread { conversationId: string | null; partner: Partner; messages: ThreadMessage[]; }

const timeAgo = (d: string) => {
  try { return formatDistanceToNowStrict(new Date(d), { addSuffix: true }); } catch { return ''; }
};

export default function MessagesClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialUser = searchParams.get('user');

  const [conversations, setConversations] = useState<ConvItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(initialUser);
  const [thread, setThread] = useState<Thread | null>(null);
  const [loadingThread, setLoadingThread] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchList = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/messages');
      if (data?.success) setConversations(data.conversations);
    } catch { /* ignore */ } finally { setLoadingList(false); }
  }, []);

  const fetchThread = useCallback(async (partnerId: string, showSpinner = false) => {
    if (showSpinner) setLoadingThread(true);
    try {
      const { data } = await axios.get(`/api/messages/${partnerId}`);
      if (data?.success) setThread({ conversationId: data.conversationId, partner: data.partner, messages: data.messages });
    } catch { /* ignore */ } finally { setLoadingThread(false); }
  }, []);

  // initial list
  useEffect(() => { fetchList(); }, [fetchList]);

  // load + poll active thread
  useEffect(() => {
    if (!activeId) { setThread(null); return; }
    fetchThread(activeId, true);
    const id = setInterval(() => fetchThread(activeId), 5000);
    return () => clearInterval(id);
  }, [activeId, fetchThread]);

  // poll list periodically
  useEffect(() => {
    const id = setInterval(fetchList, 12000);
    return () => clearInterval(id);
  }, [fetchList]);

  // autoscroll to latest
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread?.messages.length, activeId]);

  const openConversation = (partnerId: string) => {
    setActiveId(partnerId);
    router.replace(`/messages?user=${partnerId}`, { scroll: false });
  };

  const handleSend = async () => {
    const body = text.trim();
    if (!body || !activeId || sending) return;
    setSending(true);
    // optimistic
    const optimistic: ThreadMessage = { id: `tmp-${Date.now()}`, content: body, senderId: 'me', createdAt: new Date().toISOString(), fromMe: true };
    setThread((t) => (t ? { ...t, messages: [...t.messages, optimistic] } : t));
    setText('');
    try {
      await axios.post(`/api/messages/${activeId}`, { message: body });
      await Promise.all([fetchThread(activeId), fetchList()]);
    } catch {
      // rollback optimistic on failure
      setThread((t) => (t ? { ...t, messages: t.messages.filter((m) => m.id !== optimistic.id) } : t));
      setText(body);
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const initials = (p: Partner) => (p.name?.trim()?.charAt(0) || p.username?.charAt(0) || '?').toUpperCase();

  return (
    <div className='w-full h-[calc(100dvh-72px)] flex border-t border-lux-border'>

      {/* ── Conversation list ─────────────────────────────────── */}
      <aside className={cn(
        'w-full md:w-[340px] flex-shrink-0 border-r border-lux-border bg-white flex flex-col',
        activeId ? 'hidden md:flex' : 'flex'
      )}>
        <div className='px-6 py-5 border-b border-lux-border'>
          <h1 className='font-display text-xl font-bold text-lux-black'>Messages</h1>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {loadingList ? (
            <div className='flex items-center justify-center py-16 text-lux-muted'>
              <Loader2 size={18} className='animate-spin' />
            </div>
          ) : conversations.length === 0 ? (
            <div className='flex flex-col items-center justify-center text-center px-6 py-16 gap-3'>
              <MessageCircle size={24} className='text-lux-subtle' />
              <p className='text-sm text-lux-mid'>No conversations yet.</p>
              <Link href='/find-talent' className='text-luxury-label tracking-luxury text-[#c9a96e] hover:text-[#b8963d]'>
                Find designers
              </Link>
            </div>
          ) : (
            conversations.map((c) => (
              <button
                key={c.conversationId}
                type='button'
                onClick={() => openConversation(c.partner.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-5 py-4 text-left border-b border-lux-border/60 hover:bg-[#f7f5f0] transition-colors',
                  activeId === c.partner.id && 'bg-[#f7f5f0]'
                )}
              >
                <Avatar className='h-11 w-11 ring-1 ring-lux-border flex-shrink-0'>
                  {c.partner.imageUrl && <AvatarImage src={c.partner.imageUrl} alt={c.partner.name} />}
                  <AvatarFallback className='bg-[#f0ece5] text-lux-black font-semibold text-sm'>
                    {initials(c.partner)}
                  </AvatarFallback>
                </Avatar>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center justify-between gap-2'>
                    <p className='font-display font-bold text-lux-black text-sm truncate'>{c.partner.name}</p>
                    {c.lastMessage && (
                      <span className='text-[10px] text-lux-subtle flex-shrink-0'>{timeAgo(c.lastMessage.createdAt)}</span>
                    )}
                  </div>
                  <p className='text-xs text-lux-mid truncate mt-0.5'>
                    {c.lastMessage ? (c.lastMessage.fromMe ? 'You: ' : '') + c.lastMessage.content : 'No messages yet'}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* ── Thread ────────────────────────────────────────────── */}
      <section className={cn('flex-1 flex flex-col bg-[#faf8f4]', activeId ? 'flex' : 'hidden md:flex')}>
        {!activeId ? (
          <div className='flex-1 flex flex-col items-center justify-center text-center gap-3 px-6'>
            <MessageCircle size={28} className='text-lux-subtle' />
            <p className='text-lux-mid'>Select a conversation to start messaging.</p>
          </div>
        ) : (
          <>
            {/* header */}
            <div className='flex items-center gap-3 px-5 py-4 border-b border-lux-border bg-white'>
              <button type='button' onClick={() => { setActiveId(null); router.replace('/messages', { scroll: false }); }} className='md:hidden text-lux-mid hover:text-lux-black'>
                <ArrowLeft size={18} />
              </button>
              {thread && (
                <>
                  <Avatar className='h-9 w-9 ring-1 ring-lux-border'>
                    {thread.partner.imageUrl && <AvatarImage src={thread.partner.imageUrl} alt={thread.partner.name} />}
                    <AvatarFallback className='bg-[#f0ece5] text-lux-black font-semibold text-xs'>
                      {initials(thread.partner)}
                    </AvatarFallback>
                  </Avatar>
                  <div className='min-w-0'>
                    {thread.partner.username ? (
                      <Link href={`/${thread.partner.username}`} className='font-display font-bold text-lux-black text-sm hover:text-[#c9a96e] transition-colors'>
                        {thread.partner.name}
                      </Link>
                    ) : (
                      <p className='font-display font-bold text-lux-black text-sm'>{thread.partner.name}</p>
                    )}
                    {thread.partner.username && <p className='text-[10px] tracking-luxury uppercase text-[#c9a96e]'>@{thread.partner.username}</p>}
                  </div>
                </>
              )}
            </div>

            {/* messages */}
            <div ref={scrollRef} className='flex-1 overflow-y-auto px-5 py-6 space-y-3'>
              {loadingThread && (!thread || thread.messages.length === 0) ? (
                <div className='flex items-center justify-center py-16 text-lux-muted'>
                  <Loader2 size={18} className='animate-spin' />
                </div>
              ) : thread && thread.messages.length === 0 ? (
                <div className='flex flex-col items-center justify-center text-center py-16 gap-2'>
                  <p className='text-sm text-lux-mid'>No messages yet.</p>
                  <p className='text-xs text-lux-subtle'>Say hello to start the conversation.</p>
                </div>
              ) : (
                thread?.messages.map((m) => (
                  <div key={m.id} className={cn('flex', m.fromMe ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      'max-w-[75%] px-4 py-2.5 text-sm leading-relaxed',
                      m.fromMe ? 'bg-lux-black text-white' : 'bg-white border border-lux-border text-lux-black'
                    )}>
                      <p className='whitespace-pre-wrap break-words'>{m.content}</p>
                      <p className={cn('text-[10px] mt-1', m.fromMe ? 'text-white/50' : 'text-lux-subtle')}>{timeAgo(m.createdAt)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* composer */}
            <div className='border-t border-lux-border bg-white px-4 py-3'>
              <div className='flex items-end gap-2'>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder='Write a message…'
                  className='flex-1 resize-none max-h-32 px-4 py-2.5 border border-lux-border bg-white text-sm text-lux-black placeholder:text-lux-subtle focus:outline-none focus:border-lux-black/30 transition-colors'
                />
                <button
                  type='button'
                  onClick={handleSend}
                  disabled={sending || !text.trim()}
                  className='inline-flex items-center gap-2 bg-lux-black hover:bg-lux-dark text-white px-5 py-2.5 text-luxury-label tracking-luxury font-semibold transition-colors disabled:opacity-50'
                >
                  {sending ? <Loader2 size={13} className='animate-spin' /> : <Send size={13} />}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
