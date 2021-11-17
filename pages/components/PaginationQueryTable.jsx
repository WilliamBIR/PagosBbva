/* eslint-disable react/jsx-key */
import React from 'react';
import { useTable, usePagination, useFilters } from 'react-table';
import ColumnFilter from "./ColumnFilter";

export default function Table ({columns, data,perPage }) {
    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: ColumnFilter,
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
      defaultColumn,
      initialState: { pageSize: perPage },
    },
    useFilters,
    usePagination
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  {column.render("Header")}
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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
  );
}
