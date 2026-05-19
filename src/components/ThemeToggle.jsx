"use client";
import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";

const ThemeToggle = () => {
  const handleToggle = () => {
    console.log("clicked");
    const html = document.documentElement;
    html.setAttribute(
      "data-theme",
      html.getAttribute("data-theme") === "light" ? "dark" : "light",
    );
  };
  return (
    <Switch onClick={handleToggle}>
      {({ isSelected }) => (
        <Switch.Control>
          <Switch.Thumb>
            <Switch.Icon>
              {isSelected ? (
                <Sun className={` size-3 text-inherit opacity-100`} />
              ) : (
                <Moon className={`size-3 text-inherit opacity-70`} />
              )}
            </Switch.Icon>
          </Switch.Thumb>
        </Switch.Control>
      )}
    </Switch>
  );
};

export default ThemeToggle;
