export type DoubtPost = {
  doubt_uuid: string;
  doubt_text: string;
  user_id: string;
  subject_id: string;
  doubt_image?: string;
}

export type Doubt = {
  doubt_id: string,
  image_url: string,
  status: string,
  subject_id: string,
  text: string,
  user_id: string,
}
