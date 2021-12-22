export const getStudentPhase = (): {key: string; value: string}[] => [
  { key: 'ensinoFundamental', value: 'Ensino Fundamental' },
  { key: 'ensinoMedio', value: 'Ensino Médio' },
];

export const getStudentPhaseLevels = (phase: string): {key: string; value: string}[] => {
  switch (phase) {
    case 'ensinoFundamental':
      return [
        { key: '6ano', value: '6 Ano' },
        { key: '7ano', value: '7 Ano' },
        { key: '8ano', value: '8 Ano' },
        { key: '9ano', value: '9 Ano' },
      ];
    case 'ensinoMedio':
      return [
        { key: '1em', value: '1 EM' },
        { key: '2em', value: '2 EM' },
        { key: '3em', value: '3 EM' },
        { key: 'curso', value: 'Curso' },

      ];
    default:
      return [
        { key: '', value: '' },
      ];
  }
};

export const messagesMock = [
  {
    mine: true,
    read: true,
    message: 'message mock 1',
    timeStamp: '19:50',
  },
  {
    mine: true,
    read: false,
    message: 'message mock 2',
    timeStamp: '19:52',
  },
  {
    mine: false,
    read: false,
    message: 'message mock 3',
    timeStamp: '19:55',
  },
  {
    mine: false,
    read: false,
    message: 'message mock 4',
    timeStamp: '20:00',
  },
  {
    mine: true,
    read: false,
    message: 'message mock 5',
    timeStamp: '20:10',
  },
];
