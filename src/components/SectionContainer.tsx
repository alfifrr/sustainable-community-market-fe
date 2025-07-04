"use client";
import { FC, HTMLAttributes } from "react";

interface SectionContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <>
      <div className={`w-full min-h-fit ${className}`} {...props}>
        {children}
      </div>
    </>
  );
};
