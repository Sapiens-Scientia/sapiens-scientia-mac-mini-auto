import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "sapiens-theme";
const LIGHT_CLASS = "light-theme";

// The `light-theme` class on <html> is the source of truth at runtime; the
// inline script in layout.tsx applies it before first paint, and localStorage
// persists the choice across sessions. This store reads that class and lets
// components subscribe so a toggle anywhere updates every consumer at once.

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Reflect changes made in other tabs.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains(LIGHT_CLASS)
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add(LIGHT_CLASS);
  } else {
    root.classList.remove(LIGHT_CLASS);
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures (private mode, etc.); the class still applies.
  }
  emit();
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const updateTheme = () => setThemeState(getSnapshot());

    updateTheme();
    return subscribe(updateTheme);
  }, []);

  // Read the live snapshot at call time so rapid toggles before a re-render
  // don't act on a stale closured value.
  const toggleTheme = useCallback(() => {
    applyTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);
  const setTheme = useCallback((next: Theme) => applyTheme(next), []);

  return { theme, toggleTheme, setTheme };
}
