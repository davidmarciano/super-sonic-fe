import React, { memo, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Table as AntTable } from 'antd';
import columns from './columns';
import { useFetchApps } from '../../hooks';
import type { Filters, NormalizedApp } from '../../types';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Error = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  color: red;
`;

interface Props {
  filters: Filters;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  onRowClick: Dispatch<SetStateAction<number>>;
}

const PAGE_SIZE = 20;

const Table = ({ filters, page, setPage, onRowClick }: Props) => {
  const { data, isLoading, error } = useFetchApps(
    { filters, offset: page - 1, count: PAGE_SIZE }
  );
  const { apps, totalCount } = data;

  const pagination = { 
    current: page,
    pageSize: PAGE_SIZE,
    hideOnSinglePage: true,
    total: totalCount,
    showSizeChanger: false,
    onChange: setPage,
  };

  const scroll = { y: apps.length > PAGE_SIZE / 2 ? 621 : undefined };

  const onRow = ({ id }: NormalizedApp) => ({
    onClick: () => onRowClick(id),
  });

  if(error) {
    return <Error>{error}</Error>
  }

  return (
    <Wrapper>
      <AntTable 
        columns={columns} 
        dataSource={apps}
        rowKey={'id'}
        loading={isLoading}
        pagination={pagination}
        scroll={scroll}
        onRow={onRow}
      />
    </Wrapper>
  )
}

export default memo(Table);