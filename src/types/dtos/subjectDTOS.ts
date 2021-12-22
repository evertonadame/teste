/* eslint-disable import/no-cycle */
import {
  Profile, UserAws, UserInfo,
} from 'types/AuthModels';
import { Message } from 'types/dtos/chatDTO';

export type Subject = {
  description: string;
  image_url: string;
  level_id_reference: string;
  name: string;
  priority: number;
  status: string;
  subject_id: string;
}

export type DashboardDTO = {
  profiles: Profile[];
  user: UserAws;
}

export type TeacherInfo = {
  image_url: string;
  nick_name: string;
  status: string;
  subjects: string;
  user_id: string;
  availability: 'online' | 'busy' | 'offline' | 'away';
}

export type TeacherSubject = {
  calls: number;
  is_favorite: boolean | string;
  price: number;
  stars: number;
  status: string;
  subject_id: string;
  user_id: string;
}

export type DoubtTeacherItemDTO = {
  doubt_id: string;
  status: string;
  teacher_id: string;
  teacher_info: TeacherInfo;
  teacher_subject: TeacherSubject;
}

export type DoubtListItem = {
  doubt_id: string;
  image_url: string;
  student_info: UserInfo;
  subject_id: string;
  text: string;
  user_id: string;
  status: string;
  badge_not_already_viewed?: number;
  last_doubt_message?: Message;
}

export type DoubtList = DoubtListItem[];

export type DoubtInfoDTO = {
  badge_not_already_viewed: number;
  current_date: string
  doubt_id: string;
  image_url: string;
  status: string;
  student_estimated_timer: number;
  student_info: UserInfo;
  subject_id: string;
  start_date: string;
  teacher_id: string;
  teacher_info: UserInfo;
  teacher_subject: TeacherSubject;
  text: string;
  user_id: string;

  current_timestamp: number;
  end_timestamp: number;
  start_timestamp: number;

  call_final_price: number;
  teacher_price: number;
}
