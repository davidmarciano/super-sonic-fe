import React from 'react';
import styled from 'styled-components';
import { theme } from 'antd';
import { RecommendedApp } from '../../types';

const Field = styled.div`
  padding-bottom: 20px;
`;

const Label = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: bold;
  width: 200px;
  padding-bottom: 5px;
`;

const Value = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

const Textarea = styled.textarea<{ color: string }>`
  color: ${({ color }) => color};
  border-color: #e2e2e2;
  width: 100%;
  height: 400px;
  resize: none;
  padding: 10px;
`;

interface Props {
  data: RecommendedApp;
  appId: number;
}

interface FieldType {
  key: keyof RecommendedApp;
  label: string | number;
}

const fields: FieldType[] = [
  { key: 'publisher', label: 'Publisher', },
  { key: 'category', label: 'Category', },
  { key: 'external_id', label: 'External ID', },
  { key: 'rating', label: 'Rating', },
  { key: 'install_count', label: 'Install Count', },
  { key: 'min_age', label: 'Min Age', },
  { key: 'description', label: 'Description', },
];

const { useToken } = theme;

const Content = ({ data, appId }: Props) => {
    const { token: { colorPrimary, colorTextBase } } = useToken();

    return (
      <div>
        {fields.map(({ key, label }) => (
          <Field key={`${appId}_${key}`}>
            <Label color={colorPrimary}>{label}</Label>
            {key === 'description' ? (
              <Textarea color={colorTextBase} defaultValue={data[key]} />
            ) : (
              <Value color={colorTextBase}>{data[key]}</Value>
            )}              
          </Field>
        ))}
      </div>
    )
}

export default Content;