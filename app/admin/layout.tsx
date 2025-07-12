import { ReactNode } from "react";

import AdminHeader from "@/components/Admin/AdminHeader/AdminHeader";
import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layoutContainer}>
      <AdminHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
