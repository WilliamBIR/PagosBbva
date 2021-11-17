/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import ColumnFilter from "./ColumnFilter";

export default function Table ({ setPerPage, setPage, columns, data, currentpage, perPage }) {
    const defaultColumn = React.useMemo(
          () => ({
            // Let's set up our default Filter UI
            Filter: ColumnFilter
          }),
          []
        );
  
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,


    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      useControlledState: (state) => {
        return React.useMemo(
          () => ({
            ...state,
            pageIndex: currentpage,
          }),
          [state, currentpage]
        );
      },
      initialState: { pageIndex: currentpage }, // Pass our hoisted table state
      manualPagination: true
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.slice(0, 1).map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
              {headerGroup.headers.slice(1).map((column) => (
                <th
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

    </>
  );
}
