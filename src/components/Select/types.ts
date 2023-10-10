export type SelectOption = {
  label: string;
  value: number;
};

export type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export type OptionButtonProps = {
  option: SelectOption;
  selectOption: (option: SelectOption) => void;
};

export type OptionItemProps = {
  // option: SelectOption;
  option: SelectOption;
  index: number;
  hightLightIndex: number;
  isOptionSelected: (option: SelectOption) => boolean;
  selectOption: (option: SelectOption) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHightLightIndex: React.Dispatch<React.SetStateAction<number>>;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};
