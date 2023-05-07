import { FC } from 'react';

import { AddMessageForm } from './AddMessageForm/AddMessageForm';
import s from './Conversation.module.scss';
import { ConversationBox } from './ConversationBox/ConversationBox';
import { ConversationHeader } from './ConversationHeader/ConversationHeader';

export const Conversation: FC = () => {
  return (
    <div className={s.messageContainer}>
      <ConversationHeader />

      <ConversationBox />

      <AddMessageForm />
    </div>
  );
};
