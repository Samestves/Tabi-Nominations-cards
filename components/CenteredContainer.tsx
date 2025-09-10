import React, { ReactNode } from "react";

interface CenteredContainerProps {
  children: ReactNode; // Define 'children' como un nodo React
  className?: string; // 'className' es opcional y es un string
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={`w-full flex flex-col items-center justify-start ${className}`}
  >
    {children}
  </div>
);

export default CenteredContainer;
