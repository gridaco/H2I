import { useEffect, useState } from "react";

export function usePrefersDarkMode() {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.matches && setValue(true);
    const handleChange = () => setValue(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return value;
}
