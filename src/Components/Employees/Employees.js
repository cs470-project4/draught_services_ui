import React, { useState, useEffect, Fragment } from "react";
import API from "../../API_Interface/API_Interface";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const employeesTableAttributes = [
  {
    title: "Employee Name",
    attributeDBName: "employeeName",
    align: "left",
  },
  {
    title: "Employee ID",
    attributeDBName: "employeeID",
    align: "left",
  },
  {
    title: "Route ID",
    attributeDBName: "routeID",
    align: "left",
  },
  {
    title: "Date Hired",
    attributeDBName: "dateHired",
    align: "left",
    },
    {
        title: "Date Terminated",
        attributeDBName: "dateTerminated",
        align: "left",
    },
    {
        title: "Status",
        attributeDBName: "status",
        align: "left",
    },
    {
        title: "Last Modified",
        attributeDBName: "lastModified",
        align: "left",
    },
    {
        title: "Date Created",
        attributeDBName: "dateCreated",
        align: "left",
    }
];

function Employees() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        const api = new API();
        async function getEmployees() {
            const employeesJSONString = await api.allEmployees();
            console.log(`employees from the DB ${JSON.stringify(employeesJSONString.data)}`);
            setEmployees(employeesJSONString.data);
        }
        getEmployees();
    }, []);

    const TRow = ({ employeeObject }) => {
      return (
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          {employeesTableAttributes.map((attr, idx) => (
            <TableCell key={idx} align={attr.align}>
              {employeeObject[attr.attributeDBName]}
            </TableCell>
          ))}
        </TableRow>
      );
    };

    return (
      <Fragment>
        {employees.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="route table">
              <TableHead>
                <TableRow>
                  {employeesTableAttributes.map((attr, idx) => (
                    <TableCell key={idx} align={attr.align}>
                      {attr.title}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((route, idx) => (
                  <TRow employeeObject={route} key={idx} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Fragment>
    );
}
export default Employees;
