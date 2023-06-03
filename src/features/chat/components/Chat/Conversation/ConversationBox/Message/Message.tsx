import React, { forwardRef } from 'react';

import { format, formatDistanceToNow, isSameDay } from 'date-fns';
import { ru } from 'date-fns/locale';

import s from './Message.module.scss';

import { useAppSelector } from 'app/hooks';
import { MessageSenderType } from 'features/chat/chatAPI';

type PropsType = {
  content: string;
  sender: MessageSenderType;
  createdDate: string;
  updatedDate: string;
};

export const Message = forwardRef<HTMLElement, PropsType>(
  ({ content, sender, createdDate, updatedDate }, ref) => {
    const authUserId = useAppSelector(state => state.auth.user?._id);

    const date = createdDate === updatedDate ? createdDate : updatedDate;
    const today = new Date(Date.now());
    const sentDay = new Date(date);

    const stringDate = isSameDay(today, sentDay)
      ? formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: ru,
        })
      : format(new Date(date), 'dd MMMM, HH:mm', { locale: ru });

    return ref ? (
      <article
        ref={ref}
        className={`${s.messageContainer} ${
          authUserId === sender._id ? s.sentContainer : s.receivedContainer
        }`}
      >
        <div
          className={`${s.message} ${authUserId === sender._id ? s.sent : s.received}`}
        >
          {content}
          <span className={s.metadata}>
            <span className={s.time} />
            <span className={s.time}>{stringDate}</span>
            {authUserId === sender._id && (
              <span className={s.tick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  id="msg-dblcheck-ack"
                  x="2063"
                  y="2076"
                >
                  <path
                    d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                    fill="#4fc3f7"
                  />
                </svg>
              </span>
            )}
          </span>
        </div>
      </article>
    ) : (
      <article
        className={`${s.messageContainer} ${
          authUserId === sender._id ? s.sentContainer : s.receivedContainer
        }`}
      >
        <div
          className={`${s.message} ${authUserId === sender._id ? s.sent : s.received}`}
        >
          {content}
          <span className={s.metadata}>
            <span className={s.time} />
            <span className={s.time}>{stringDate}</span>
            {authUserId === sender._id && (
              <span className={s.tick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="15"
                  id="msg-dblcheck-ack"
                  x="2063"
                  y="2076"
                >
                  <path
                    d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                    fill="#4fc3f7"
                  />
                </svg>
              </span>
            )}
          </span>
        </div>
      </article>
    );
  },
);
