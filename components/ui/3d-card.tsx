"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
    children,
    className,
    containerClassName,
    disable3d = false,
  }: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    disable3d?: boolean;
  }) => {
  
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
      
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
      
        const rotateX = -(y - centerY) / 20; // Smaller divisor = more subtle movement
        const rotateY = (x - centerX) / 20;
      
        containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };
      
  
    const handleMouseEnter = () => setIsMouseEntered(true);
    const handleMouseLeave = () => {
      setIsMouseEntered(false);
      if (containerRef.current)
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };
  
    return (
      <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
        <div
          className={cn("w-full h-full", containerClassName)}
          style={{ perspective: "1000px" }}
        >
          <div
            ref={containerRef}
            onMouseEnter={disable3d ? undefined : handleMouseEnter}
            onMouseMove={disable3d ? undefined : handleMouseMove}
            onMouseLeave={disable3d ? undefined : handleMouseLeave}
            className={cn(
                "flex items-center justify-center relative transition-all duration-200 ease-linear",
                className
            )}
            style={{
                transformStyle: "preserve-3d",
            }}
            >

            {children}
          </div>
        </div>
      </MouseEnterContext.Provider>
    );
  };
  
export const CardBody = ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
      <div
        className={cn(
          "w-full h-full [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  };  

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
