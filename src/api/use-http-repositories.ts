import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { apiClient } from "../infra/api-client";

const REPOSITORIES_DATA = "repositoriesData";

export type RepositoryBuiltBy = {
  username: string;
  url: string;
  avatar: string;
};

export type Repository = {
  rank: number;
  username: string;
  repositoryName: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  totalStars: number;
  forks: number;
  starsSince: number;
  since: string;
  builtBy: RepositoryBuiltBy[];
};

type FilterUseHttpRepositories = {
  spokenLanguage: string | null;
  programmingLanguage: string | null;
  dateRange: string | null;
};

export const useHttpRepositories = (
  filter: FilterUseHttpRepositories
): UseQueryResult<Repository[], AxiosError> => {
  const query = useQuery<Repository[], AxiosError, Repository[]>(
    [REPOSITORIES_DATA, filter],
    async () => {
      const { data } = await apiClient.get<Repository[]>(
        `/repositories${
          filter.programmingLanguage ? `/${filter.programmingLanguage}` : ""
        }`,
        {
          params: {
            spoken_lang: filter.spokenLanguage,
            since: filter.dateRange,
          },
        }
      );

      return data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return query;
};
