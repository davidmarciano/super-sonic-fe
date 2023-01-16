import React from "react";
import styled from 'styled-components';
import type { ColumnsType } from 'antd/es/table';
import type { NormalizedApp } from '../../types';

const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const LinkButton = styled.button`
  padding: 0px;
  border: 0px;
  background: #ffffff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const onLinkClick = (e: React.MouseEvent<HTMLElement>, url: string) => {
  e.stopPropagation();
  window.open(url, '_target');  
}

const columns: ColumnsType<NormalizedApp> = [
  {
    title: 'Icon',
    dataIndex: 'icon',
    width: 100,
    render: (src) => <Icon src={src} referrerPolicy="no-referrer" />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name, { url }) => {
      return <LinkButton onClick={(e) => onLinkClick(e, url)}>{name}</LinkButton>
    }
  },
  {
    title: 'Category',
    width: 250,
    dataIndex: 'category',
  },
  {
    title: 'Rating',
    width: 100,
    dataIndex: 'rating',
  },
  {
    title: 'Min Age',
    width: 100,
    dataIndex: 'min_age',
  },
];

export default columns;