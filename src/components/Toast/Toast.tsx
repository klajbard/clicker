import { useCallback, useEffect, useRef, useState } from "react";

import * as Styled from "./styled";

type ToastType = "achievement" | "info" | "boost";

interface IToast {
  id: number;
  type: ToastType;
  title: string;
  message: string;
  icon: string;
  exiting?: boolean;
}

const MAX_TOASTS = 5;
const TOAST_DURATION = 4000;
const EXIT_ANIMATION_DURATION = 350;

let nextId = 0;

const Toast = () => {
  const [toasts, setToasts] = useState<IToast[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  const removeToast = useCallback((id: number) => {
    // Start exit animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );

    // Remove after animation completes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_ANIMATION_DURATION);
  }, []);

  const addToast = useCallback(
    (toast: Omit<IToast, "id" | "exiting">) => {
      const id = nextId++;

      setToasts((prev) => {
        const updated = [...prev, { ...toast, id }];
        // Remove oldest if exceeding max
        if (updated.length > MAX_TOASTS) {
          const removed = updated.shift();
          if (removed) {
            const timer = timersRef.current.get(removed.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(removed.id);
            }
          }
        }
        return updated;
      });

      // Auto-dismiss after TOAST_DURATION
      const timer = setTimeout(() => {
        removeToast(id);
        timersRef.current.delete(id);
      }, TOAST_DURATION);
      timersRef.current.set(id, timer);
    },
    [removeToast]
  );

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const { name, icon } = (e as CustomEvent).detail;
      addToast({
        type: "achievement",
        title: "Achievement Unlocked!",
        message: name,
        icon: icon || "\uD83C\uDFC6",
      });
    };

    const handleGoldenCookie = (e: Event) => {
      const { label } = (e as CustomEvent).detail;
      addToast({
        type: "boost",
        title: label,
        message: "Golden cookie bonus activated!",
        icon: "\uD83C\uDF6A",
      });
    };

    window.addEventListener("achievement-unlocked", handleAchievement);
    window.addEventListener("golden-cookie-clicked", handleGoldenCookie);

    return () => {
      window.removeEventListener("achievement-unlocked", handleAchievement);
      window.removeEventListener("golden-cookie-clicked", handleGoldenCookie);
      // Clean up all timers
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <Styled.ToastContainer>
      {toasts.map((toast) => (
        <Styled.ToastItem
          key={toast.id}
          $type={toast.type}
          $exiting={toast.exiting}
        >
          <Styled.ToastIcon>{toast.icon}</Styled.ToastIcon>
          <Styled.ToastContent>
            <Styled.ToastTitle>{toast.title}</Styled.ToastTitle>
            <Styled.ToastMessage>{toast.message}</Styled.ToastMessage>
          </Styled.ToastContent>
        </Styled.ToastItem>
      ))}
    </Styled.ToastContainer>
  );
};

export default Toast;
