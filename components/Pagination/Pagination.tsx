'use client'

import { Pagination } from '@mantine/core';
import { useState } from 'react';

function BlogPagination() {
  const [activePage, setPage] = useState(1);
  return (
  <Pagination page={activePage} onChange={setPage} total={10} />
  )
}

export default BlogPagination