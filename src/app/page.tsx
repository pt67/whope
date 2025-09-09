"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  return (
    <div className={styles.page}>
      <main className={`${styles.main} ${styles.gameMain}`}>
        {!isLoading ? (
          <>
            <h1 className={styles.title}>Battleground</h1>
            <button 
              className={styles.startButton}
              onClick={() => setIsLoading(true)}
            >
              Get Started
            </button>
          </>
        ) : (
          <div className={styles.loader}>
            <div className={styles.loaderBar}>
              <div 
                className={styles.loaderProgress} 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className={styles.loaderText}>{loadingProgress}%</div>
            {loadingProgress === 100 && (
              <Link href="/playground" className={styles.enterButton}>
                Enter Battlefield
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
