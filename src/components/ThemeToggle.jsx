"use client";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, [isDark]);

  const handleToggle = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <Switch size="lg" isSelected={isDark} onClick={handleToggle}>
      {({ isSelected }) => (
        <Switch.Control
          className={`${isSelected ? "bg-[#00C853]" : "bg-[#065739]"}`}
        >
          <Switch.Thumb>
            <Switch.Icon>
              {isSelected ? (
                <Sun className="size-3 text-inherit opacity-100" />
              ) : (
                <Moon className="size-3 text-inherit opacity-70" />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      )}
    </Switch>
  );
};

export default ThemeToggle;
