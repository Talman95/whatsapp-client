import { UserType } from 'features/auth/authAPI';

export const getSenderUser = (
  authUserId: string | undefined,
  users: UserType[],
): UserType => {
  const id = authUserId === users[0]._id ? users[1] : users[0];

  return id;
};
