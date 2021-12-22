export type MessageSent = {
  action: string;
  type: string;
  user_id: string;
  doubt_id: string;
  uuid: string;
  file_type: string;
  file_url: string;
  thumb_url: string;
  message: string;
}

export type Message ={
  already_viewed: string | boolean;
  date: string;
  doubt_id: string;
  file_type: string;
  file_url: string;
  message: string;
  sender_id: string;
  thumb_url: string;
  timestamp: number;
  uuid: string;
}

export type ChatMsgDTO = {
  messages: Message[];
  timestamp: number;
}
