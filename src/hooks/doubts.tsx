import {
  createContext,
  useState,
  useContext,
  useCallback,
} from 'react';
import { toast } from 'react-toastify';

import { api } from 'services/apiClient';
import {
  DashboardDTO, DoubtTeacherItemDTO, DoubtList, DoubtInfoDTO,
} from 'types/dtos/subjectDTOS';
import { DoubtPost } from 'types/SubjectModels';
import { useAuth } from './auth';
import { useWs } from './ws';

interface DoubtContextData {
  isLoading: boolean;
  buttonIsLoading: boolean;
  submitDoubt(doubt: DoubtPost): Promise<void>;
  getDashboard(): Promise<DashboardDTO | void>;
  listSubjectsByDoubtId(doubtId: string): Promise<DoubtTeacherItemDTO[] | undefined>;
  listDoubtsToTeacher(): Promise<DoubtList | undefined>;
  changeDoubtStatus(
    doubtId: string,
    status: string,
    from: string,
    teacherId?: string,
  ): Promise<void>;
  endDoubt(doubtId: string, status: string): Promise<void>;
  getDoubtInfoByDoubtUuid(doubtId: string): Promise<DoubtInfoDTO | undefined>;
  rateDoubt(
    doubtId: string,
    note: string,
    stars: number,
    wasAnswered: boolean,
  ): Promise<void>;
  toggleFavTeacher(teacherId: string, isFav: boolean): Promise<void>;
}

type DoubtProvider = {
  children: React.ReactNode;
}

const DoubtContext = createContext<DoubtContextData>({} as DoubtContextData);

export const DoubtProvider = ({ children }: DoubtProvider): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  const { user, handleSignOut, updateUser } = useAuth();
  const { closeConnection } = useWs();

  const getDashboard = useCallback(async (): Promise<DashboardDTO | undefined> => {
    setIsLoading(true);
    if (!user.token) {
      setIsLoading(false);
      closeConnection();
      handleSignOut();
      return {} as DashboardDTO;
    }
    try {
      const response = await api.get<DashboardDTO>(`/dashboard?user_id=${user.userId}`);
      setIsLoading(false);
      updateUser('wallet', response?.data?.user?.wallet ?? { balance: 0 });
      // if (!user.wallet.balance) {
      // }
      return response.data;
    } catch (err: any) {
      toast(err.message);
      setIsLoading(false);
      return {} as DashboardDTO;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, handleSignOut]);

  const submitDoubt = async (doubt: DoubtPost): Promise<void> => {
    setIsLoading(true);
    try {
      await api.post('/doubt/student', doubt);
      toast.info('Sua pergunta foi enviada com sucesso 😌!', { draggable: true });
      setIsLoading(false);
      const result = doubt;
    } catch (err: any) {
      toast(err.message);
    }
    setIsLoading(false);
  };


  const listSubjectsByDoubtId = async (doubtId: string)
    : Promise<DoubtTeacherItemDTO[] | undefined> => {
    setIsLoading(true);
    try {
      const response = await api.get<DoubtTeacherItemDTO[]>(`/doubt/student/status?user_id=${user.userId}&doubt_id=${doubtId}`);

      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      toast(err.message);
    }
    setIsLoading(false);
    return undefined;
  };

  const listDoubtsToTeacher = async (): Promise<DoubtList | undefined> => {
    setIsLoading(true);
    try {
      const response = await api.get<DoubtList>(`/doubt/teacher/subject?user_id=${user.userId}`);

      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      toast(err.message);
    }
    setIsLoading(false);
    return undefined;
  };

  const getDoubtInfoByDoubtUuid = async (doubtUuid: string): Promise<DoubtInfoDTO | undefined> => {
    setIsLoading(true);
    try {
      const response = await api.get<DoubtInfoDTO>(`/doubt/info?user_id=${user.userId}&doubt_id=${doubtUuid}`);

      setIsLoading(false);
      return response.data;
    } catch (err: any) {
      toast(err.message);
    }
    setIsLoading(false);
    return undefined;
  };

  const changeDoubtStatus = async (
    doubtId: string,
    status: string,
    from: string,
    teacherId?: string,
  ): Promise<void> => {
    const body = {
      doubt_id: doubtId,
      user_id: user.userId,
      status,
    };
    let url = '';

    if (from === 'teacher') {
      url = '/doubt/teacher';
    } else if (from === 'student') {
      url = '/doubt/student/status';
      if (teacherId) {
        Object.assign(body, {
          teacher_id: teacherId ?? 'couldnt get teacher id',
        });
      }
    }

    try {
      from === 'student' && setIsLoading(true);
      from === 'teacher' && setButtonIsLoading(true);
      await api.post(url, body);
      from === 'student' && setIsLoading(false);
      from === 'teacher' && setButtonIsLoading(false);

      switch (status) {
        case 'StudentAccepted':
          toast.info('O professor foi aceito com sucesso 😎!', { draggable: true });
          break;
        case 'TeacherAccepted':
          toast.info('A pergunta foi aceita com sucesso 😌!', { draggable: true });
          break;
        case 'Canceled':
          toast.info('A pergunta foi Cancelada 🥺!', { draggable: true });
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      toast.error('Algo deu errado! 😰', { draggable: true });
    }
  };

  const endDoubt = async (doubtId: string, status: string): Promise<void> => {
    setButtonIsLoading(true);
    const body = {
      doubt_id: doubtId,
      user_id: user.userId,
      status,
    };
    try {
      await api.post('/doubt/status', body);

      toast.warning('A pergunta foi encerrada com sucesso 😅!', { draggable: true });
      setButtonIsLoading(false);
    } catch (err: any) {
      toast(err.message);
    }
    setButtonIsLoading(false);
  };

  const rateDoubt = async (
    doubtId: string,
    note: string,
    stars: number,
    wasAnswered: boolean,
  ): Promise<void> => {
    const body = {
      doubt_id: doubtId,
      note,
      user_id: user.userId,
      stars,
      was_answered: wasAnswered,
    };
    try {
      setButtonIsLoading(true);
      const response = await api.post('/doubt/rating', body);
      console.log(response);
      setButtonIsLoading(false);

      toast.success('Sua avaliação foi enviada com sucesso 🥰!', { draggable: true });
    } catch (err: any) {
      toast(err.message);
    }
    setButtonIsLoading(false);
  };

  const toggleFavTeacher = async (teacherId: string, isFav: boolean): Promise<void> => {
    const body = {
      teacher_id: teacherId,
      user_id: user.userId,
      is_favorite: isFav,
    };
    try {
      setButtonIsLoading(true);
      const response = await api.post('/doubt/student/favoriteteacher', body);
      console.log(response);
      setButtonIsLoading(false);

      if (isFav) {
        toast.success(
          'Esse professor foi favoritado 🤗!',
          { draggable: true },
        );
      } else {
        toast.warn(
          'Esse professor foi desfavoritado 🥺!',
          { draggable: true },
        );
      }
    } catch (err: any) {
      toast(err.message);
    }
    setButtonIsLoading(false);
  };

  return (
    <DoubtContext.Provider
      value={{
        isLoading,
        buttonIsLoading,
        getDashboard,
        submitDoubt,
        listSubjectsByDoubtId,
        listDoubtsToTeacher,
        changeDoubtStatus,
        endDoubt,
        getDoubtInfoByDoubtUuid,
        rateDoubt,
        toggleFavTeacher,
      }}
    >
      {children}
    </DoubtContext.Provider>
  );
};

export function useDoubt(): DoubtContextData {
  const context = useContext(DoubtContext);

  return context;
}
