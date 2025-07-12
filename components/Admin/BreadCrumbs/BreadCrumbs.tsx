"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BreadCrumbs.module.css";

const formatSegment = (segment: string) => {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const trail = segments.slice(1);

  if (trail.length === 0) return null;

  return (
    <nav aria-label="Ruta de navegación" className={styles.breadcrumb}>
      <ol className={styles.breadcrumbList}>
        {trail.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 2).join("/");
          const isLast = index === trail.length - 1;

          return (
            <li key={href} className={styles.breadcrumbItem}>
              {!isLast ? (
                <>
                  <Link href={href} className={styles.link}>
                    {formatSegment(segment)}
                  </Link>
                  <span className={styles.separator} aria-hidden="true">
                    /
                  </span>
                </>
              ) : (
                <span className={styles.current}>{formatSegment(segment)}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
