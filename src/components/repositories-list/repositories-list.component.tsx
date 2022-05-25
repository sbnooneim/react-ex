import React, { useState } from "react";
import { useHistory } from "react-router";
import { useHttpRepositories } from "../../api/use-http-repositories";
import { DateRange, dateRanges } from "../../data/date-ranges";
import {
  ProgrammingLanguage,
  programmingLanguages,
} from "../../data/programming-languages";
import { SpokenLanguage, spokenLanguages } from "../../data/spoken-languages";
import { getValueFromParams } from "../../utils/get-value-from-params";
import { toggleSearchParam } from "../../utils/toggle-search-param";
import { Loader } from "../loader/loader.component";
import { RepoCard } from "../repo-card/repo-card.component";
import { SearchDropdown } from "../search-dropdown/search-dropdown.component";
import { TrendNavigation } from "../trend-navigation/trend-navigation.component";

export const RepositoriesList = () => {
  const history = useHistory();

  const [spokenLanguage, setSpokenLanguage] = useState<SpokenLanguage | null>(
    getValueFromParams(history, "spoken_language", spokenLanguages)
  );
  const assignSpokenLanguage = (lang: SpokenLanguage | null) => {
    setSpokenLanguage(lang);
    toggleSearchParam("spoken_language", lang?.option || null, history);
  };

  const [programmingLanguage, setProgrammingLanguage] =
    useState<ProgrammingLanguage | null>(
      getValueFromParams(history, "programming_language", programmingLanguages)
    );
  const assignProgrammingLanguage = (lang: ProgrammingLanguage | null) => {
    setProgrammingLanguage(lang);
    toggleSearchParam("programming_language", lang?.option || null, history);
  };

  const [dateRange, setDateRange] = useState<DateRange | null>(
    getValueFromParams(history, "date_range", dateRanges) || dateRanges[0]
  );
  const assignDateRange = (range: DateRange | null) => {
    setDateRange(range);
    toggleSearchParam("date_range", range?.option || null, history);
  };

  const { isLoading, error, data } = useHttpRepositories({
    spokenLanguage: spokenLanguage?.option || null,
    programmingLanguage: programmingLanguage?.option || null,
    dateRange: dateRange?.option || null,
  });

  return (
    <div className="card mb-5">
      <div className="card-header d-flex justify-content-between align-items-center flex-wrap py-3">
        <TrendNavigation />
        <div className="d-flex gap-3 flex-wrap">
          <SearchDropdown
            title="Spoken Language"
            selectedValue={spokenLanguage}
            callToActionText="Select a spoken language"
            searchPlaceholder="Filter spoken languages"
            listData={spokenLanguages}
            setValue={assignSpokenLanguage}
            cleanValueText="Clear spoken language"
          />
          <SearchDropdown
            title="Language"
            selectedValue={programmingLanguage}
            callToActionText="Select a language"
            searchPlaceholder="Filter languages"
            listData={programmingLanguages}
            setValue={assignProgrammingLanguage}
            cleanValueText="Clear language"
          />
          <SearchDropdown
            title="Date range"
            selectedValue={dateRange}
            callToActionText="Adjust time span"
            listData={dateRanges}
            setValue={assignDateRange}
            isSearchable={false}
          />
        </div>
      </div>
      <div className="card-body p-0">
        {isLoading && <Loader />}
        {error && (
          <div className="alert alert-danger text-primary m-5" role="alert">
            A simple danger alert—check it out!
          </div>
        )}
        {data?.length === 0 && (
          <h1>
            It looks like we don’t have any trending repositories for your
            choices.
          </h1>
        )}
        {data?.map((repo) => (
          <RepoCard repository={repo} key={`repo-rank-${repo.rank}`} />
        ))}
      </div>
    </div>
  );
};
