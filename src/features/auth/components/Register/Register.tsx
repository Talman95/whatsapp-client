import { FC } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import logo from 'common/assets/logo.png';
import s from 'features/auth/Auth.module.scss';
import { RegisterDataType } from 'features/auth/authAPI';
import { register as registerThunk } from 'features/auth/authThunks';

export const Register: FC = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterDataType>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterDataType> = data => {
    dispatch(registerThunk(data));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className={s.container}>
      <div className={s.logo}>
        <img src={logo} alt="Whatsapp logo" />
      </div>
      <h1>Sign Up</h1>

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

        <label htmlFor="fullName" className={s.label}>
          Password
          <input
            className={s.input}
            type="text"
            id="fullName"
            {...register('fullName', {
              required: 'Укажите ваше имя',
              minLength: {
                value: 3,
                message: 'Минимум 3 символа',
              },
            })}
          />
          {errors?.fullName && (
            <span className={s.error}>{errors.fullName.message || 'Ошибка'}</span>
          )}
        </label>

        <input type="submit" disabled={!isValid} />
      </form>

      <div className={s.link}>
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};
