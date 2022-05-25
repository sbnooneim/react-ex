import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { apiClient } from "../infra/api-client";

const DEVELOPERS_DATA = "DEVELOPERS_DATA";

export type DeveloperPopularRepository = {
  repositoryName: string | null;
  description: string | null;
  url: string | null;
};

export type Developer = {
  rank: number;
  username: string;
  name: string;
  url: string;
  avatar: string;
  since: string;
  popularRepository: DeveloperPopularRepository;
};

type FilterUseHttpDevelopers = {
  programmingLanguage: string | null;
  dateRange: string | null;
};

export const useHttpDevelopers = (
  filter: FilterUseHttpDevelopers
): UseQueryResult<Developer[], AxiosError> => {
  const query = useQuery<Developer[], AxiosError, Developer[]>(
    [DEVELOPERS_DATA, filter],
    async () => {
      const { data } = await apiClient.get<Developer[]>(
        `/developers${
          filter.programmingLanguage ? `/${filter.programmingLanguage}` : ""
        }`,
        {
          params: {
            since: filter.dateRange,
          },
        }
      );

      return data;
    }
  );

  return query;
};
