"use client";
import { FunctionComponent, useState } from "react";
import { ILoginProps } from "./Login.d";
import styles from "./Login.module.scss";
import { TextField } from "@/components/TextField";
import Logo from "@/components/Logo";
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import authAPI from "@/api/endpoints/auth";
import { useCookie } from "@/hooks/useCookie";
import { useRouter } from "next/navigation";
import { TLoginButton, TLoginButtonSize } from "react-telegram-auth";
import { ITelegramAuthResponse } from "@/api/models/Auth";
import { AxiosError } from "axios";

type LoginFields = {
  username: string;
  password: string;
};

export const Login: FunctionComponent<ILoginProps> = ({
  botName,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();
  const [error, setError] = useState<string | null>(null);
  const [, setAccessToken] = useCookie("access_token");
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginFields> = (data) => {
    authAPI.login(data).then((res) => {
      setAccessToken(res.access_token);
      router.replace("/");
    });
  };

  const onTGError = (e: AxiosError) => {
    setError("Ошибка авторизации");
  };

  const onTGSuccess = (resp: ITelegramAuthResponse) => {
    setAccessToken(resp.access_token);
    router.push("/");
  };

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Logo />
          Ядро
        </div>
        <form
          className={styles.mainContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className={styles.headerText}>Вход в систему</h2>
          <TextField {...register("username")} placeholder="Логин" required />
          <TextField
            {...register("password")}
            placeholder="Пароль"
            type="password"
          />

          <Button type="submit">Войти</Button>
          <TLoginButton
            botName={botName}
            buttonSize={TLoginButtonSize.Large}
            usePic={false}
            cornerRadius={999}
            lang="ru"
            onAuthCallback={(user) => {
              authAPI.telegramAuth(user).then(onTGSuccess).catch(onTGError);
            }}
            requestAccess={"write"}
          />
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
};
