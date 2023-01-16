import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { FilterBar, Table, Drawer } from './components';
import type { Filters } from './types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const TableWithFilters = styled.div`
  width: 1000px;
  height: fit-content;
  border: 1px solid #e1e1e1;
  padding: 20px;
`;

const INITIAL_FILTERS_STATE: Filters = {
  name: '',
  category: '',
  rating: 0,
  min_age: 0,
};

const FIRST_PAGE = 1;
const DEFAULT_SELECTED_APP_ID = -1;

const RecommendedApps = () => {
  const [page, setPage] = useState(FIRST_PAGE);
  const [filters, setFilters] = useState(INITIAL_FILTERS_STATE);
  const [selectedAppId, setSelectedAppId] = useState(DEFAULT_SELECTED_APP_ID);

  const onFilterChange = useCallback(() => setPage(FIRST_PAGE), [setPage]);

  const onDrawerClose = useCallback(
    () => setSelectedAppId(DEFAULT_SELECTED_APP_ID),
    [setSelectedAppId]
  );

  const showDrawer = useMemo(
    () => selectedAppId > DEFAULT_SELECTED_APP_ID,
    [selectedAppId]
  );

  return (
    <Wrapper>
      <TableWithFilters>
        <FilterBar setFilters={setFilters} onFilterChange={onFilterChange} />
        <Table filters={filters} page={page} setPage={setPage} onRowClick={setSelectedAppId}/>
      </TableWithFilters>
      <Drawer 
        appId={selectedAppId} 
        onClose={onDrawerClose}
        open={showDrawer} 
      />
    </Wrapper>
  )
};

export default RecommendedApps;