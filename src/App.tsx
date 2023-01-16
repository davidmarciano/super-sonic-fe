import React from 'react';
import styled from 'styled-components';
import { ConfigProvider } from 'antd';
import { RecommendedApps } from './components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const theme = {
  token: {
    colorPrimary: '#FF542D',
    colorTextBase: '#00214D',
  }
};

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <Wrapper>
        <RecommendedApps />
      </Wrapper>
    </ConfigProvider>
  );
}

export default App;
