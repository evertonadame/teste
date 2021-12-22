/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, Transition } from 'framer-motion';

import { RoundSpanContainer, DotWaveContainer, DotWave } from './styles';

const spinTransition: Transition = {
  repeatType: 'loop',
  duration: 0.8,
  repeat: Infinity,
  ease: 'easeInOut',
};

interface LoadingProps {
  customColors?: Array<string>;
  size?: number;
  type?: string;
  className?: string;
}

export const Loading = ({
  customColors = [],
  size = 0,
  type = 'round',
  className,
}: LoadingProps): any => {
  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const loadingCircleTransition: Transition = {
    duration: 0.4,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'mirror',
  };

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      {type === 'round' && (
        <RoundSpanContainer
          className={`round-span ${className || ''}`}
          customColors={customColors}
          size={size}
        >
          <motion.span animate={{ rotate: 360 }} transition={spinTransition} />
        </RoundSpanContainer>
      )}
      {type === 'ellipsis' && (
        <DotWaveContainer
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <DotWave
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <DotWave
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <DotWave
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        </DotWaveContainer>
      )}
    </>
  );
};
