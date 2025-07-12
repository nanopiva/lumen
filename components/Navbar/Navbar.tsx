"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import { useCart } from "../CartContext";

export default function Navbar() {
  const { items, getTotalItems } = useCart();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileHover, setProfileHover] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openCartDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setCartDropdownOpen(true);
  };

  const scheduleCloseCartDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setCartDropdownOpen(false);
    }, 200);
  };

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const totalItems = getTotalItems();

  return (
    <header className={styles.headerContainer}>
      <button
        className={styles.mobileMenuButton}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <img
          src="/menuIcon.svg"
          width={24}
          height={24}
          alt="Menu"
          className={styles.icon}
        />
      </button>

      <div className={styles.logoWithName}>
        <Link href="/">
          <h1 className={styles.lumenName}>LUMEN</h1>
        </Link>
      </div>

      <div className={styles.mobileCart}>
        <Link href="/cart">
          <div className={styles.cartIconWrapper}>
            <img
              src="/cartLogo.svg"
              width={24}
              height={24}
              alt="Cart"
              className={styles.icon}
            />
            {mounted && totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </div>
        </Link>
      </div>

      <div className={styles.desktopContent}>
        <ul className={styles.navItemsContainer}>
          <li className={styles.navItem}>
            <Link href="/products" className={styles.navLink}>
              Products
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about-us" className={styles.navLink}>
              About&nbsp;us
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>

        <div className={styles.cartAndProfile}>
          <div
            className={styles.cartContainer}
            onMouseEnter={openCartDropdown}
            onMouseLeave={scheduleCloseCartDropdown}
          >
            <Link href="/cart" className={styles.cartLink}>
              <div className={styles.cartIconWrapper}>
                <img
                  src="/cartLogo.svg"
                  width={24}
                  height={24}
                  alt="Cart"
                  className={styles.icon}
                />
                {mounted && totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </div>
            </Link>

            {cartDropdownOpen && (
              <div
                className={styles.cartDropdown}
                onMouseEnter={openCartDropdown}
                onMouseLeave={scheduleCloseCartDropdown}
              >
                {items.length === 0 ? (
                  <p className={styles.emptyMessage}>
                    You haven&apos;t added any products to your cart yet.
                  </p>
                ) : (
                  <>
                    <ul className={styles.dropdownList}>
                      {items.map((item) => (
                        <li
                          key={item.productId}
                          className={styles.dropdownItem}
                        >
                          <img
                            src={item.image || "/placeholder.png"}
                            alt={item.title}
                            width={40}
                            height={40}
                            className={`${styles.itemImage} ${
                              !item.image ? styles.placeholderImage : ""
                            }`}
                          />
                          <div className={styles.itemInfo}>
                            <span className={styles.itemTitle}>
                              {item.title}
                            </span>
                            <span className={styles.itemQty}>
                              ×{item.quantity}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.dropdownFooter}>
                      <Link href="/cart" className={styles.viewCartLink}>
                        View cart ({totalItems})
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div
            className={styles.profileContainer}
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
          >
            <img
              src="/profileLogo.svg"
              width={24}
              height={24}
              alt="Profile"
              className={`${styles.icon} ${
                profileHover ? styles.disabledIcon : ""
              }`}
            />
            {profileHover && (
              <div className={styles.profileTooltip}>
                Account feature disabled in demo
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={styles.mobileMenuActive}>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileNavLink}
          >
            Products
          </Link>
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileNavLink}
          >
            About&nbsp;us
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={styles.mobileNavLink}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
