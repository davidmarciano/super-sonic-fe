import React, { Dispatch, SetStateAction, useCallback, memo, useMemo } from 'react';
import styled from 'styled-components';
import { Input, Select } from 'antd';
import { createOptions, createNumberOptions } from './utils';
import useFetchCategories from '../../hooks/useFetchCategories';
import type { Filters } from '../../types';

const { Search } = Input;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: space-between;
`;

const StyledSearch = styled(Search)`
  width: 300px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
`;

interface Props {
  setFilters: Dispatch<SetStateAction<Filters>>;
  onFilterChange: () => void;
}

const FilterBar = ({ setFilters, onFilterChange }: Props) => {
  const {
    data: categories, 
    isLoading: isCategoriesLoading, 
    error: categoriesError
  } = useFetchCategories();

  const categoriesOptions = useMemo(
    () => categories.length > 0 ? createOptions(categories) : [],
    [categories]
  );

  const onAppSearch = useCallback((value: string) => {
    onFilterChange();
    setFilters((prevState) => ({ ...prevState, name: value }));
  }, [onFilterChange, setFilters]);

  const onSelectBoxChange = useCallback((inputKey: string, value: unknown) => {
    onFilterChange();
    setFilters((prevState) => ({ ...prevState, [inputKey]: value }));
  }, [onFilterChange, setFilters]);

  const selectInputsProps = [
    {
      key: 'category',
      placeholder: 'Choose category',
      options: categoriesOptions,
      onChange: (value: unknown) => onSelectBoxChange('category', value as string),
      showSearch: true,
      allowClear: true,
      loading: isCategoriesLoading,
      disabled: !!categoriesError
    },
    {
      key: 'min_age',
      placeholder: 'Choose minimum age',
      options: createNumberOptions(50),
      onChange: (value: unknown) => onSelectBoxChange('min_age', value as number),
      allowClear: true,
    },
    {
      key: 'rating',
      placeholder: 'Choose minimum rating',
      options: createNumberOptions(5),
      onChange: (value: unknown) => onSelectBoxChange('rating', value as number),
      allowClear: true,
    },
  ];


  return (
    <Wrapper>
      <StyledSearch placeholder={"Search an app"} onSearch={onAppSearch} />
      {selectInputsProps.map((selectInputProps) => <StyledSelect {...selectInputProps} />)}
    </Wrapper>
  )
}

export default memo(FilterBar);