export interface Lead {
  _id: string;
  name: string;
  current_title: string;
  ownership_bucket: string;
  city: string;
  date_joined: string;
  profile_url: string;
  isContacted: boolean;
  thumb?: number
}