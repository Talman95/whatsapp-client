import { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { AddMessageForm } from './AddMessageForm/AddMessageForm';
import s from './Conversation.module.scss';
import { ConversationBox } from './ConversationBox/ConversationBox';
import { ConversationHeader } from './ConversationHeader/ConversationHeader';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getSenderUser } from 'common/utils/getSenderUser';
import { chatActions } from 'features/chat/chatSlice';
import {
  accessChat,
  createConnection,
  destroyConnection,
  joinChat,
} from 'features/chat/chatThunks';

export const Conversation: FC = () => {
  const dispatch = useAppDispatch();

  const activeChat = useAppSelector(state => state.chat.activeChat);
  const authUserId = useAppSelector(state => state.auth.user?._id);

  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) {
      dispatch(accessChat(chatId));

      dispatch(createConnection());
      dispatch(joinChat(chatId));
    }

    return () => {
      dispatch(chatActions.cleanActiveChat());
      dispatch(destroyConnection());
    };
  }, [chatId]);

  if (!activeChat) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.messageContainer}>
      <ConversationHeader
        chatName={
          activeChat.isGroupChat
            ? activeChat.chatName
            : getSenderUser(authUserId, activeChat?.users).fullName
        }
      />

      <ConversationBox />

      <AddMessageForm chatId={activeChat._id} />
    </div>
  );
};
