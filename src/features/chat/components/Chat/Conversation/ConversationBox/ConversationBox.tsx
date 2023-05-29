import React, { FC, useEffect, useRef, useState } from 'react';

import s from './ConversationBox.module.scss';
import { Message } from './Message/Message';

import { useAppSelector } from 'app/hooks';

export const ConversationBox: FC = () => {
  const messages = useAppSelector(state => state.chat.messages);

  const messagesAnchorRef = useRef<HTMLDivElement>(null);

  const [autoScroll, setAutoScroll] = useState(true);

  const onChatListScroll = (e: React.UIEvent): void => {
    const element = e.currentTarget;
    const scrollError = 300;

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

  useEffect(() => {
    if (autoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [autoScroll, messages]);

  return (
    <div className={s.messageContent} onScroll={onChatListScroll}>
      {messages.length === 0 ? (
        <div>No messages</div>
      ) : (
        messages.map(({ _id, content, sender, createdAt, updatedAt }) => (
          <Message
            key={_id}
            content={content}
            sender={sender}
            createdDate={createdAt}
            updatedDate={updatedAt}
          />
        ))
      )}
      <div ref={messagesAnchorRef} />
    </div>
  );
};
