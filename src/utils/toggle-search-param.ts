import * as H from "history";

export const toggleSearchParam = (
  key: string,
  value: string | null,
  history: H.History<any>
) => {
  const searchParams = new URLSearchParams(history.location.search);
  if (searchParams.has("spoken_language") && !value) {
    searchParams.delete("spoken_language");
  } else if (searchParams.has("spoken_language") && value) {
    searchParams.set("spoken_language", value);
  } else {
    searchParams.append("spoken_language", value!);
  }

  history.push({ search: searchParams.toString() });
};
