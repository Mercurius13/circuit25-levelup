'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // Ensure this utility handles merging classNames
import { X } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { BackgroundGradient } from '@/components/ui/background-gradient'; // Import the BackgroundGradient

interface MetricCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  defaultValue?: string | number;
  expanded?: boolean;
  content?: React.ReactNode;
  onClick?: () => void;
  className?: string; // Add className prop to allow custom styling
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  icon,
  defaultValue,
  expanded = false,
  content,
  onClick,
  className, // Destructure the className prop
}) => {
  return (
    <BackgroundGradient animate={true} containerClassName="relative">
      <CardContainer className="inter-var" disable3d={expanded}>
        <CardBody
          onClick={onClick}
          className={cn(
            'bg-[var(--card-bg)] rounded-2xl shadow-md p-4 cursor-pointer transition-all relative',
            expanded ? 'w-full h-full max-w-lg max-h-[80vh] overflow-y-auto' : 'h-full',
            'dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]',
            className // Apply custom className here
          )}
          style={{ backgroundColor: '#ffe5b4' }} // Customize the background color
        >
          {expanded && (
            <div className="absolute top-4 right-4 z-10 text-black">
              <X className="w-6 h-6" />
            </div>
          )}

          <div className="flex flex-col items-center justify-between space-y-4 h-full">
            <CardItem translateZ="50" className="flex flex-col items-center">
              {icon}
              <h2 className="mt-2 text-lg font-semibold text-[var(--card-bg)]">{title}</h2>
            </CardItem>

            {!expanded && defaultValue && (
              <CardItem translateZ="40" className="text-2xl font-bold text-[var(--card-bg)]">
                {defaultValue}
              </CardItem>
            )}

            {expanded && content && (
              <CardItem
                translateZ="30"
                className="mt-4 text-sm text-[var(--card-bg)] text-center"
              >
                {content}
              </CardItem>
            )}
          </div>
        </CardBody>
      </CardContainer>
    </BackgroundGradient>
  );
};

export default MetricCard;
