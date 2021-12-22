import {
  useCallback,
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
} from 'react';

import { useAuth } from './auth';

interface CountdownContextData {
  countDownTime: number | undefined;
  isLoading: boolean;
  stopWatchTime: number | undefined;
  formatedCountdownTime:string;
  formatedStopwatchTime:string;
  handleSetCountdownValue(timeInSeconds: number): void;
  handleSetStopwatchValue(timeInSeconds: number): void;
  toggleCountdown(state?: boolean): void;
}

type CountdownProvider = {
  children: React.ReactNode;
}

const CountdownContext = createContext<CountdownContextData>({} as CountdownContextData);

export const CountdownProvider = ({ children }: CountdownProvider): JSX.Element => {
  const [countDownTime, setCountDownTime] = useState<number>();
  const [stopWatchTime, setStopWatchTime] = useState<number>();
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timeOutCd = useRef<NodeJS.Timeout>();
  const timeOutSw = useRef<NodeJS.Timeout>();

  const { user } = useAuth();

  const formatedCountdownTime = useMemo(() => {
    if (countDownTime) {
      const cdHours = Math.floor((Math.floor(countDownTime / 60)) / 60);
      const cdStringHours = String(cdHours).padStart(2, '0');
      const cdMinutes = Math.floor((countDownTime / 60) - (cdHours * 60));
      const cdStringMinutes = String(cdMinutes).padStart(2, '0');
      const cdSeconds = countDownTime % 60;
      const cdStringSeconds = String(cdSeconds).padStart(2, '0');

      return `${cdStringHours}:${cdStringMinutes}:${cdStringSeconds}`;
    }
    return '';
  }, [countDownTime]);

  const formatedStopwatchTime = useMemo(() => {
    if (stopWatchTime) {
      const swHours = Math.floor((Math.floor(stopWatchTime / 60)) / 60);
      const swStringHours = String(swHours).padStart(2, '0');
      const swMinutes = Math.floor((stopWatchTime / 60) - (swHours * 60));
      const swStringMinutes = String(swMinutes).padStart(2, '0');
      const swSeconds = stopWatchTime % 60;
      const swStringSeconds = String(swSeconds).padStart(2, '0');

      return `${swStringHours}:${swStringMinutes}:${swStringSeconds}`;
    }
    return '';
  }, [stopWatchTime]);

  const handleSetCountdownValue = useCallback((timeInSeconds: number):void => {
    setCountDownTime(timeInSeconds);
  }, []);

  const handleSetStopwatchValue = useCallback((timeInSeconds: number):void => {
    setStopWatchTime(timeInSeconds);
  }, []);

  const toggleCountdown = (status?: boolean): void => {
    if (status === false || isCountdownActive) {
      timeOutCd.current && clearTimeout(timeOutCd.current);
      timeOutSw.current && clearTimeout(timeOutSw.current);
    }

    if (status) {
      setIsCountdownActive(status);
    } else {
      setIsCountdownActive((state) => !state);
    }
  };

  useEffect(() => {
    if (countDownTime) {
      if (isCountdownActive && countDownTime > 0) {
        timeOutCd.current = setTimeout(() => {
          setCountDownTime(countDownTime - 60);
        }, 1000 * 60);
      }
    }
  }, [stopWatchTime, isCountdownActive, countDownTime]);

  useEffect(() => {
    if (stopWatchTime && countDownTime) {
      if (isCountdownActive && countDownTime > 0 && user.profileId !== 'Teacher') {
        timeOutSw.current = setTimeout(() => {
          setStopWatchTime(stopWatchTime + 1);
        }, 1000);
        if (isCountdownActive && stopWatchTime > countDownTime) {
          timeOutCd.current && clearTimeout(timeOutCd.current);
          timeOutSw.current && clearTimeout(timeOutSw.current);
          setHasFinished(true);
          setIsCountdownActive(false);
        }
      }
    }
  }, [
    isCountdownActive,
    countDownTime,
    stopWatchTime,
    setHasFinished,
    setIsCountdownActive,
    timeOutCd,
    setCountDownTime,
    user.profileId,
  ]);

  useEffect(() => {
    if (stopWatchTime) {
      if (user.profileId === 'Teacher' && isCountdownActive) {
        timeOutSw.current = setTimeout(() => {
          setStopWatchTime(stopWatchTime + 1);
        }, 1000);

        if (countDownTime) {
          if (isCountdownActive && (stopWatchTime > countDownTime)) {
            timeOutCd.current && clearTimeout(timeOutCd.current);
            timeOutSw.current && clearTimeout(timeOutSw.current);
            setHasFinished(true);
            setIsCountdownActive(false);
          }
        }
      }
    }
  }, [user.profileId, stopWatchTime, countDownTime, isCountdownActive]);

  return (
    <CountdownContext.Provider
      value={{
        countDownTime,
        isLoading,
        stopWatchTime,
        formatedCountdownTime,
        formatedStopwatchTime,
        handleSetCountdownValue,
        handleSetStopwatchValue,
        toggleCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};

export function useCountdown(): CountdownContextData {
  const context = useContext(CountdownContext);

  return context;
}
