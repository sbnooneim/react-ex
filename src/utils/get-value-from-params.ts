import * as H from "history";

type GetValuesListItem = {
  option: string;
  value: string;
};

export const getValueFromParams = (
  history: H.History<any>,
  key: string,
  list: GetValuesListItem[]
): GetValuesListItem | null => {
  const params = new URLSearchParams(history.location.search);
  const language = params.get(key);
  const value = list.find((v) => v.option === language);

  return value || null;
};
