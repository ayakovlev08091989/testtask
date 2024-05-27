import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLeads, getThumbs } from "./api";

export function useLeads(page = 1, limit = 9, sort_col = 'first_name', sort_direction: '1' | '-1' = '-1') {
  return useQuery({
    queryKey: [["leads", {page, limit, sort_col, sort_direction }]],
    queryFn: () => getLeads({page, limit, sort_col, sort_direction}),
    placeholderData: keepPreviousData,
  })  
}

export function useThumbs() {
  return useQuery({
    queryKey: [["leadsThumbs"]],
    queryFn: () => getThumbs(),
  })
}