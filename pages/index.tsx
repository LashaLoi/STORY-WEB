import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { TextInput, PasswordInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

import styles from "../styles/Home.module.css";

interface User {
  name: string;
  password: string;
}

interface HomePageProps {
  user: User;
}

const Home: NextPage<HomePageProps> = ({ user }) => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      password: ""
    }
  });

  const handleSubmit = (values: User) => {
    if (values.name === user.name && values.password === user.password) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/story");
    }
  };

  return (
    <>
      <Head>
        <title>STORY</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main} style={{ maxWidth: 400, margin: 20 }}>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ width: "100%" }}
          >
            <TextInput
              required
              label="Имя пользователя"
              placeholder="@your-username"
              {...form.getInputProps("name")}
            />
            <PasswordInput
              placeholder="Пароль"
              label="Пароль"
              required
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md">
              <Button type="submit">Войти</Button>
            </Group>
          </form>
        </main>
      </div>

      <footer className={styles.footer}>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Created by @SideswipeLoi
        </a>
      </footer>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await fetch("https://622c5c48087e0e041e094b66.mockapi.io/login");
  const [user] = await data.json();

  return {
    props: {
      user
    }
  };
}
