"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

// ==========================================
// Avatar
// ==========================================
interface AvatarProps
  extends React.ComponentProps<typeof AvatarPrimitive.Root> {}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  children,
  ...props
}) => (
  <AvatarPrimitive.Root
    className={`group relative inline-flex items-center justify-center rounded-full w-12 h-12 ${className}`}
    {...props}
  >
    {children}
  </AvatarPrimitive.Root>
);

// ==========================================
// AvatarImage
// ==========================================
interface AvatarImageProps
  extends React.ComponentProps<typeof AvatarPrimitive.Image> {}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Image
    className={`w-full h-full object-cover rounded-full ${className}`}
    {...props}
  />
);

// ==========================================
// AvatarFallback
// ==========================================
interface AvatarFallbackProps
  extends React.ComponentProps<typeof AvatarPrimitive.Fallback> {}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  className,
  ...props
}) => (
  <AvatarPrimitive.Fallback
    className={`flex items-center justify-center w-full h-full bg-gray-400 text-white rounded-full ${className}`}
    {...props}
  />
);

// ==========================================
// Tooltip
// ==========================================
interface AvatarGroupTooltipProps {
  children: React.ReactNode;
}

export const AvatarGroupTooltip: React.FC<AvatarGroupTooltipProps> = ({
  children,
}) => {
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
      {children}
    </div>
  );
};
