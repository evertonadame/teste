import { MutableRefObject } from 'react';

/** Retorna se está no server ou não */
export const isServer = typeof window === 'undefined';

/** Retorna as cores das materias */
export const getSubjectsColors = (subjectName: string): string[] => {
  switch (subjectName) {
    case 'Matemática':
      return ['#08E8F8', '#FFF507'];
    case 'Biologia':
      return ['#08E8F8', '#F1B719'];
    case 'Física':
      return ['#08E8F8', '#D319F1'];
    case 'Espanhol':
      return ['#08E8F8', '#F7878B'];
    case 'Português':
      return ['#08E8F8', '#D319F1'];
    case 'Geografia':
      return ['#08E8F8', '#8B8FEC'];
    case 'História':
      return ['#08E8F8', '#ACF119'];
    case 'Inglês':
      return ['#08E8F8', '#F11919'];
    case 'Química':
      return ['#08E8F8', '#F1B719'];
    case 'Redação':
      return ['#08E8F8', '#F7878B'];
    default:
      return ['#08E8F8', '#FFF507'];
  }
};

export const translateLevelId = (levelId: string): string => {
  switch (levelId) {
    case '1ano':
      return '1° Ano';
    case '2ano':
      return '2° Ano';
    case '3ano':
      return '3° Ano';
    case '4ano':
      return '4° Ano';
    case '5ano':
      return '5° Ano';
    case '6ano':
      return '6° Ano';
    case '7ano':
      return '7° Ano';
    case '8ano':
      return '8° Ano';
    case '9ano':
      return '9° Ano';
    default:
      return '??';
  }
};

export const translatePhaseId = (phaseId: string): string => {
  switch (phaseId) {
    case 'ensinoFundamental':
      return 'Ensino Fundamental';
    case 'ensinoMedio':
      return 'Ensino Médio';
    default:
      return '??';
  }
};

export const convertTimeStampToTimeLog = (
  timestamp: number,
  options?:{
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean
  },
): string => {
  const date = new Date(timestamp);

  const formatedHours = String(date.getHours()).padStart(2, '0');
  const formatedMinutes = String(date.getMinutes()).padStart(2, '0');
  const formatedSeconds = String(date.getSeconds()).padStart(2, '0');

  if (options) {
    if (options.hours && options.minutes && options.seconds) {
      const formatedTimeLog = `${formatedHours}h ${formatedMinutes}m ${formatedSeconds}s`;
      return formatedTimeLog;
    }
    if (options.hours && options.minutes) {
      const formatedTimeLog = `${formatedHours}h ${formatedMinutes}m`;
      return formatedTimeLog;
    }
    if (options.hours) {
      const formatedTimeLog = `${formatedHours}h`;
      return formatedTimeLog;
    }
  }

  const formatedTimeLog = `${formatedHours}:${formatedMinutes}`;

  return formatedTimeLog;
};

export const debounce = (
  timeoutRef: MutableRefObject<NodeJS.Timeout | undefined>,
  func: any,
  wait: number,
): void => {
  timeoutRef.current && clearTimeout(timeoutRef.current);

  // eslint-disable-next-line no-param-reassign
  timeoutRef.current = setTimeout(func, wait);
};

let intervalRef: any = null;
let timeoutRef: any = null;
let play = true;
export const cooldownFunction = (
  func:any,
  cooldown: number,
  stopFunction?: any,
): void => {
  clearInterval(intervalRef);
  if (stopFunction) {
    clearTimeout(timeoutRef);
  }

  if (play) {
    func();
    play = false;
  }

  intervalRef = setInterval(() => {
    play = true;
  }, cooldown);

  if (stopFunction) {
    timeoutRef = setTimeout(() => {
      stopFunction();
    }, cooldown * 2);
  }
};

export const convertNumberToBRL = (number: number): string => {
  const f = number.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  return f;
};

export const convertSecondsToHourMinuteSecond = (
  seconds:number,
  options?:{
    onlyHoursNMinutes?: boolean;
    onlyHours?: boolean
  },
):string => {
  const cdHours = Math.floor((Math.floor(seconds / 60)) / 60);
  const cdStringHours = String(cdHours).padStart(2, '0');

  const cdMinutes = Math.floor((seconds / 60) - (cdHours * 60));
  const cdStringMinutes = String(cdMinutes).padStart(2, '0');

  const cdSeconds = seconds % 60;
  const cdStringSeconds = String(cdSeconds).padStart(2, '0');

  if (options) {
    if (options.onlyHoursNMinutes) {
      if (cdStringHours !== '00') {
        return `${cdStringHours}h ${cdStringMinutes}m`;
      }
      if (cdStringHours === '00' && cdStringMinutes !== '00') {
        return `${cdStringMinutes}m`;
      }
      if (cdStringHours === '00' && cdStringMinutes === '00' && cdStringSeconds !== '00') {
        return `${cdStringSeconds}s`;
      }
      if (cdStringHours === '00' && cdStringMinutes === '00' && cdStringMinutes === '00') {
        return 'xx';
      }
    }
    if (options.onlyHours) {
      return `${cdStringHours}`;
    }
  }

  const finalTime = `${cdStringHours}:${cdStringMinutes}:${cdStringSeconds}`;

  return finalTime;
};
