import { useEffect, useState } from "react";

import { useGroups } from "../../../contexts/groupsContext";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import {
  convertTo12HourFormat,
  getMonthName,
  parseDateFromYYYYMMDD,
} from "../../../utils/helpers";

function GroupTasksTable() {
  const { currentGroupTasks } = useGroups();

  const CustomPagination = styled(TablePagination)(() => ({
    "& .MuiTablePagination-displayedRows": {
      fontSize: "14px", // Change font size
      fontWeight: "semibold", // Change font weight
      fontFamily: "Raleway ,sans-serif",
    },
  }));

  const tableColumns = [
    { id: "id", label: "Id", minWidth: 100 },
    { id: "title", label: "Title", minWidth: 150 },
    { id: "description", label: "Description", minWidth: 200 },
    {
      id: "dueDate",
      label: "Due Date",
      minWidth: 170,
      align: "center",
    },
    {
      id: "time",
      label: "Time",
      minWidth: 170,
      align: "center",
    },
    {
      id: "repeat",
      label: "Repeat",
      minWidth: 170,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "createdBy",
      label: "Created by",
      minWidth: 170,
      align: "center",
    },
  ];

  function createData(
    id,
    title,
    description,
    dueDate,
    time,
    repeat,
    status,
    createdBy
  ) {
    return { id, title, description, dueDate, time, repeat, status, createdBy };
  }

  const [tableRows, setTableRows] = useState([]);

  //Enter necessary data into the table rows on mount
  useEffect(() => {
    setTableRows((prevRows) => {
      // Filter out tasks that are already in the table
      const newRows = currentGroupTasks.filter((task) => {
        return !prevRows.some((row) => row.id === task?._id); // Use a unique identifier like 'title' or 'id'
      });

      // Map only the new rows (tasks not already in prevRows)
      const rowsToAdd = newRows.map((task) => {
        const taskDueDate = parseDateFromYYYYMMDD(
          task?.dueDate.substring(0, 10)
        );
        const dueDateMonth = getMonthName(taskDueDate.getMonth());
        const dueDateDay = taskDueDate.getDate();
        const dueDateYear = taskDueDate.getFullYear();
        const taskDueDateText = `${dueDateMonth} ${dueDateDay}, ${dueDateYear}`;

        const taskTimeText = convertTo12HourFormat(task?.time);

        const repeatTaskText =
          task?.repeatTask === "weekly"
            ? "Weekly"
            : task?.repeatTask === "daily"
            ? "Daily"
            : "Don't repeat";

        return createData(
          task?._id,
          task?.title,
          task?.description,
          taskDueDateText,
          taskTimeText,
          repeatTaskText,
          task?.completed,
          task?.createdBy?.username
        );
      });

      return [...prevRows, ...rowsToAdd]; // Add only non-duplicate rows
    });
  }, [currentGroupTasks]); // Adding 'currentGroupTasks' as a dependency

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    display: column.id === "id" && "none",
                    backgroundColor: "rgba(23, 36, 72, 1)",
                    color: "#fff",
                    fontSize: "15px",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {tableColumns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            display: column.id === "id" && "none",
                            backgroundColor: "rgba(29, 46, 97, 1)",
                            color: "#fff",
                            fontSize: "14px",
                            fontFamily: "Raleway, sans-serif",
                            borderBottom:
                              "0.8px solid rgba(213, 226, 255, 0.5)",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        rowsPerPageOptions={[]}
        component="div"
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={null}
        labelRowsPerPage={null}
        style={{
          backgroundColor: "rgba(23, 36, 72, 1)",
          color: "#fff",
          fontSize: "15px",
          fontFamily: "Raleway, sans-serif",
        }}
      />
    </Paper>
  );
}

export default GroupTasksTable;
