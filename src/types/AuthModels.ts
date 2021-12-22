/* eslint-disable import/no-cycle */
import { DoubtListItem, Subject } from './dtos/subjectDTOS';
import { Doubt } from './SubjectModels';

export type Wallet = {
  balance: number;
}

/* eslint-disable camelcase */
export type User = {
  name: string;
  fullName: string;
  email: string;
  imageUrl: string;
  userId: string;
  profileId: string;
  token: string;
  refreshToken: string;
  phaseId?: string;
  levelId?: string;
  offeredSubjects?: string;
  defaultImg: string;
  wallet: Wallet;
}

export type UserInfo = {
  doubts: Doubt[];
  availability: 'online' | 'busy' | 'offline' | 'away';
  image_url: string;
  nick_name: string;
  status: string;
  user_id: string;
  level_id?: string;
  phase_id?: string;
  subjects?: Subject[];
  offered_subjects?: string;
  accepted: DoubtListItem[];
  notAnswered: DoubtListItem[];
  active: DoubtListItem[];
}

export type UserAws = {
  email: string;
  facebook_account_id: string;
  full_name: string;
  google_account_id: string;
  is_facebook_account_connected: string;
  is_google_account_connected: string;
  phone: string;
  profile_id: string;
  status: string;
  user_id: string;
  wallet: Wallet;
}

export type Profile = {
  profile_id: string;
  user_profile: UserInfo;
}
