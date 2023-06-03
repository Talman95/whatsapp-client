import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { fetchMessages } from 'features/chat/chatThunks';

type UseMessagesReturnType = {
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  error: { message: string } | null;
};

export const useMessages = (chatId: string): UseMessagesReturnType => {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(state => state.chat.currentPage);
  const hasNextPage = useAppSelector(state => state.chat.hasNextPage);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;

    dispatch(fetchMessages(chatId))
      .then(() => {
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setIsLoading(false);

        if (signal.aborted) return;
        setIsError(true);
        setError({ message: err.message });
      });

    return () => controller.abort();
  }, [currentPage]);

  return { isLoading, isError, error, hasNextPage };
};
