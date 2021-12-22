import { UserAws, Profile } from '../AuthModels';

/* eslint-disable camelcase */
export type LoginDTO = {
  auth: {
    refresh_token: string;
    token: string;
  }
  profiles: Profile[];
  user: UserAws;
}
