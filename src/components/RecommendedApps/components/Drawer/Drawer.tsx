import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Drawer as AntDrawer, Spin } from 'antd';
import Content from './Content';
import { useFetchApp } from '../../hooks';

const Error = styled.span`
  color: red;
`;

interface Props {
  open: boolean;
  onClose: () => void;
  appId: number;
}

interface GetTitleArgs {
  title?: string;
  isLoading: boolean;
  error: string;
}

const getTitle = ({ title, isLoading, error }: GetTitleArgs) => {
  if(error && !isLoading) {
    return 'Error';
  }
  if(isLoading) {
    return 'Loading...';
  }

  return title;
};

const Drawer = ({ appId, open, onClose }: Props) => {
  const { data, isLoading, error } = useFetchApp(appId);

  const title = useMemo(() => getTitle({
    title: data?.name,
    isLoading,
    error,
  }), [data, isLoading, error]);

  return (
    <AntDrawer open={open} onClose={onClose} title={title}>
      {error && !isLoading && <Error>{error}</Error>}

      {isLoading && !data && <Spin />}

      {data && <Content data={data} appId={appId} />}
    </AntDrawer>
  );
}

export default memo(Drawer);