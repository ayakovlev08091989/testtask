import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteLead, deleteThumb, giveThumb, resetLeads } from "./api"

export const useDeleteLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLead(id),
    onSettled: async (data, error) => {
      if (error)  {
        console.log(error);
      } else {
        await queryClient.resetQueries();
        await queryClient.resetQueries();
      }
    }
  })
};

export const useGiveThumb = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data : { lead_id: string, sentiment: number}) => giveThumb(data.lead_id, data.sentiment),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        queryClient.clear()
      }
    }
  })
}

export const useDeleteThumb = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lead_id: string) => deleteThumb(lead_id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.resetQueries({ queryKey: ["leads"]});
        await queryClient.resetQueries({ queryKey: ["leadsThumbs"]});
      }
    }
  })
}

export const useResetLeads = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => resetLeads(),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.resetQueries({ queryKey: ["leads"]});
        await queryClient.resetQueries({ queryKey: ["leadsThumbs"]});
      }
    }
  })
}