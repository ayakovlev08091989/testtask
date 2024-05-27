import axios from "axios";
import { Leads } from "../types/Leads";

const BASE_URL = "https://api.cashmereai.com/test";
//TODO move it to .env file.
const API_TOKEN = "c123345";

const config = {
  headers: { Authorization: `Bearer ${API_TOKEN}` },
};

const postConfig = {
  headers: { 'Content-Type': 'application/json' },
};

const axiosInstance = axios.create({ baseURL: BASE_URL });
axiosInstance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export const getLeads = async (
  {
    page,
    limit,
    sort_col,
    sort_direction,
  }: { page: number; limit: number; sort_col: string; sort_direction: '1' | '-1' }
) => {
  const leadsConfig = {
    ...config,
    params: {
      page,
      limit,
      sort_col,
      sort_direction,
    },
  };
  return (await axiosInstance.get<Leads>("leads", leadsConfig)).data;
};

export const deleteLead = async (id: string) => {
  return (await axiosInstance.delete(`leads/${id}`, config)).data;
};

export const getThumbs = async () => {
  return (await axiosInstance.get<{lead_id: string, sentiment: number}[]>("leads/feedback", config)).data.map(t => ({
    lead_id: t.lead_id,
    sentiment: t.sentiment
  }));
};

export const giveThumb = async (lead_id: string, sentiment: number) => {
  const giveThumbConfig = {
    ...config,
    params: {
      "lead_id": lead_id,
      "sentiment": sentiment,
    },
  };
  return (
    await axiosInstance.put("leads/feedback", null, giveThumbConfig)
  ).data;
};

export const deleteThumb = async (lead_id: string) => {
  return (await axiosInstance.delete(`leads/feedback/${lead_id}`, config)).data;
};

export const resetLeads = async () => {
  return (await axiosInstance.post(`leads/reset`, null, config)).data;
};
