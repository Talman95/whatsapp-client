import { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import logo from 'common/assets/logo.png';
import s from 'features/auth/Auth.module.scss';
import { LoginDataType } from 'features/auth/authAPI';
import { login } from 'features/auth/authThunks';

export const Login: FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginDataType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginDataType> = data => {
    dispatch(login(data));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <img src={logo} alt="Whatsapp logo" />
      </div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={s.label}>
          Email
          <input
            className={s.input}
            type="email"
            id="email"
            {...register('email', {
              required: 'Укажите почту',
            })}
          />
          {errors?.email && (
            <span className={s.error}>{errors.email.message || 'Ошибка'}</span>
          )}
        </label>

        <label htmlFor="password" className={s.label}>
          Password
          <input
            className={s.input}
            type="password"
            id="password"
            {...register('password', {
              required: 'Укажите пароль',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов',
              },
            })}
          />
          {errors?.password && (
            <span className={s.error}>{errors.password.message || 'Ошибка'}</span>
          )}
        </label>

        <input type="submit" disabled={!isValid} />
      </form>
    </div>
  );
};
