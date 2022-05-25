import { CheckIcon, TriangleDownIcon, XIcon } from "@primer/octicons-react";
import clsx from "clsx";
import React, { ChangeEvent, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import { useOnClickOutside } from "../../hooks/use-on-click-outside";
import "./search-dropdown.styles.scss";

type DropdownValue = {
  option: string;
  value: string;
};

type SearchDropdownProps = {
  title: string;
  selectedValue: DropdownValue | null;
  callToActionText: string;
  listData: DropdownValue[];
  setValue: (value: DropdownValue | null) => void;
  cleanValueText?: string;
  searchPlaceholder?: string;
  isSearchable?: boolean;
};

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  title,
  selectedValue,
  callToActionText,
  searchPlaceholder,
  listData,
  setValue,
  cleanValueText,
  isSearchable,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownClasses = clsx(
    "list-group",
    "search-dropdown",
    "position-absolute",
    "end-0",
    "rounded-bottom",
    {
      invisible: !isOpened,
      "d-none": !isOpened,
    }
  );
  const selectorClasses = clsx("fs-8", "search-dropdown__selector", {
    "search-dropdown__selector--active": isOpened,
  });

  const [dropdownData, setDropdownData] = useState(listData);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDropdownData((prevData) =>
      prevData.filter((d) =>
        d.value.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const cleanState = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    setDropdownData(listData);
  };
  const toggleDropdown = () => {
    if (!isOpened) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      });
    }
    setIsOpened((v) => !v);
    cleanState();
  };
  const onItemClick = (value: DropdownValue | null) => {
    setValue(value);
    toggleDropdown();
  };
  const closeDropdown = () => {
    if (isOpened) {
      setIsOpened(false);
      cleanState();
    }
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(wrapperRef, closeDropdown);

  return (
    <div
      className="search-dropdown__wrapper position-relative"
      ref={wrapperRef}
    >
      <span onClick={toggleDropdown} role="button" className={selectorClasses}>
        {title}: <strong>{selectedValue ? selectedValue.value : "Any"}</strong>{" "}
        <TriangleDownIcon size={14} />
      </span>
      <div className={dropdownClasses}>
        <div className="list-group-item fw-bold fs-7">{callToActionText}</div>
        {isSearchable && (
          <div className="list-group-item">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder={searchPlaceholder}
              ref={searchInputRef}
              onChange={onSearchChange}
            />
          </div>
        )}
        {selectedValue && cleanValueText && (
          <button
            className="list-group-item list-group-item-action fs-7 text-start border-start-0 border-end-0"
            onClick={() => onItemClick(null)}
          >
            <XIcon size={16} className="me-1" />
            {cleanValueText}
          </button>
        )}
        <div className="search-dropdown__list-wrapper">
          <FixedSizeList
            height={400}
            itemData={dropdownData}
            itemCount={dropdownData.length}
            itemSize={35}
            width={300}
            className="rounded-bottom"
          >
            {({ index, style, data }) => (
              <button
                className="list-group-item list-group-item-action fs-7 text-start border-start-0 border-end-0"
                key={`language-${data[index].option}`}
                style={style}
                onClick={() => onItemClick(data[index])}
              >
                <CheckIcon
                  className={clsx("me-1", {
                    invisible: data[index].option !== selectedValue?.option,
                  })}
                  size={16}
                />
                {data[index].value}
              </button>
            )}
          </FixedSizeList>
        </div>
      </div>
    </div>
  );
};

SearchDropdown.defaultProps = {
  isSearchable: true,
};
