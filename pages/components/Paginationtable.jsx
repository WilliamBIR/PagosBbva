/* eslint-disable react/jsx-key */
import React from "react";
import { useTable, usePagination, useFilters } from "react-table";
import ColumnFilter from "./ColumnFilter";

export default function PaginationTable({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: ColumnFilter,
    }),
    []
  );

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your tble has groupings
    page, // fetch the current page
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 5 },
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
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        Previous page{" "}
      </button>
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        Next page{" "}
      </button>
    </div>
  );
}
