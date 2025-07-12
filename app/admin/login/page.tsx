import { signInAction } from "@/lib/actions/signInAction";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.user_metadata?.is_admin) {
    redirect("/admin/dashboard");
  }

  const { error } = await searchParams;
  const errorMessage =
    error === "credentials"
      ? "Incorrect email or password"
      : error === "unauthorized"
        ? "You are not authorized to access the admin panel"
        : null;

  return (
    <main className={styles.main}>
      <form className={styles.form} action={signInAction}>
        <h1 className={styles.title}>Login</h1>

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="email@address.com"
          required
          className={styles.input}
          autoComplete="email"
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          placeholder="********"
          required
          autoComplete="current-password"
        />

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <button className={styles.button}>Login</button>
      </form>
    </main>
  );
}
