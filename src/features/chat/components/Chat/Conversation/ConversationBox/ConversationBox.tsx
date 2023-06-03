import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import s from './ConversationBox.module.scss';
import { Message } from './Message/Message';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useMessages } from 'common/hooks/useMessages';
import { chatActions } from 'features/chat/chatSlice';

type PropsType = {
  id: string;
};

export const ConversationBox: FC<PropsType> = ({ id }) => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, error, hasNextPage } = useMessages(id);

  const [autoScroll, setAutoScroll] = useState(true);

  const messages = useAppSelector(state => state.chat.messages);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const intObserver = useRef<IntersectionObserver | null>(null);
  const wasFirstScroll = useRef(false);

  const lastPostRef = useCallback(
    (message: HTMLElement) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(message => {
        if (message[0].isIntersecting && hasNextPage) {
          if (!wasFirstScroll.current) {
            wasFirstScroll.current = true;

            return;
          }
          dispatch(chatActions.setNextPage());
        }
      });

      if (message) intObserver.current.observe(message);
    },
    [isLoading, hasNextPage],
  );

  const content = messages.map(({ _id, content, sender, createdAt, updatedAt }, i) => {
    if (i === 1) {
      return (
        <Message
          ref={lastPostRef}
          key={_id}
          content={content}
          sender={sender}
          createdDate={createdAt}
          updatedDate={updatedAt}
        />
      );
    }

    if (isError) return <div>{error?.message}</div>;

    return (
      <Message
        key={_id}
        content={content}
        sender={sender}
        createdDate={createdAt}
        updatedDate={updatedAt}
      />
    );
  });

  useEffect(() => {
    if (autoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autoScroll, messages]);

  const onChatListScroll = (e: React.UIEvent): void => {
    const element = e.currentTarget;
    const scrollError = 200;

    if (
      Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <
      scrollError
    ) {
      if (!autoScroll) {
        setAutoScroll(true);
      }
    } else if (autoScroll) {
      setAutoScroll(false);
    }
  };

  return (
    // @ts-ignore
    <div className={s.messageContent} onScroll={onChatListScroll}>
      {messages.length === 0 ? <div>No messages</div> : content}
      <div ref={messagesAnchorRef} />
    </div>
  );
};
