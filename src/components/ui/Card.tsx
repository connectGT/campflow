import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: "primary" | "secondary" | "none";
}

export function Card({
  children,
  className = "",
  glow = "none",
}: CardProps) {
  const glowClass =
    glow === "primary"
      ? "glow-primary"
      : glow === "secondary"
        ? "glow-secondary"
        : "";

  return (
    <div
      className={`
        glass rounded-2xl p-6
        ${glowClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
