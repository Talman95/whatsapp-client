import React, { FC, useEffect, useRef, useState } from 'react';

import s from './ConversationBox.module.scss';
import { Message } from './Message/Message';

export const ConversationBox: FC = () => {
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
  }, [autoScroll]);

  return (
    <div className={s.messageContent} onScroll={onChatListScroll}>
      <Message ownerMessageId="1" />

      <div ref={messagesAnchorRef} />
    </div>
  );
};
