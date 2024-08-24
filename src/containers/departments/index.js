import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/material";
import * as XLSX from "xlsx";
import "./styles.scss";

const Departments = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]); // New state for filtered leads
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const id = localStorage.getItem("id");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URI}/leads?id=${id}`,
        config
      );
      const result = await response.json();
      setLeads(result);
      setFilteredLeads(result); // Initialize filteredLeads with all leads
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    background: "#2a2185",
    color: "#e0e01c",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    background: "#2a2185",
    color: "#e0e01c",
  }));

  const handleSearch = () => {
    const filtered = leads.filter(
      (lead) =>
        lead.referBy?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        lead.referred_agent_id?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        lead.status?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        lead.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        lead.company_name[0]?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        lead.mob_no?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredLeads(filtered); // Update filteredLeads instead of leads
  };

  const handleViewAll = () => {
    setFilteredLeads(leads); // Reset to original leads list
    setSearchTerm(""); // Clear search input
  };

  const downloadExcel = (tableData, fileName) => {
    let ad = [];
    tableData?.forEach((element) => {
      let c = {
        ReferBy: element.referBy,
        AgentCode: element.referred_agent_id,
        Company: element.company_name[0],
        Name: element.name,
        Status: element.status,
        Date: formatDate(element.date),
        Contact: element.mob_no,
      };
      ad = [...ad, c];
    });

    const ws = XLSX.utils.json_to_sheet(ad);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, fileName);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="departments-page" style={{ backgroundColor: "transparent" }}>
      <Box gap={"10px"} mb={2} display="flex" alignItems="center">
        <TextField
          style={{ width: "100%" }}
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                style={{ backgroundColor: "#2a2185" }}
              >
                Search
              </Button>
            ),
          }}
        />
        <Button onClick={handleViewAll}>View All</Button>
        <StyledButton
          onClick={() => downloadExcel(filteredLeads, "lead_table.xlsx")}
          style={{ width: "50%", padding: "15px" }}
        >
          Export
        </StyledButton>
      </Box>
      <TableContainer style={{ borderRadius: 20 }} component={Paper}>
        <Table style={{ borderRadius: "20px" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>REFER_BY</StyledTableCell>
              <StyledTableCell>AGENT_CODE</StyledTableCell>
              <StyledTableCell>COMPANY_NAME</StyledTableCell>
              <StyledTableCell>NAME</StyledTableCell>
              <StyledTableCell>NUMBER</StyledTableCell>
              <StyledTableCell>STATUS</StyledTableCell>
              <StyledTableCell>DATE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>{lead.referBy}</TableCell>
                  <TableCell>{lead.referred_agent_id}</TableCell>
                  <TableCell>{lead.company_name.join(", ")}</TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.mob_no}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{formatDate(lead.date)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50]}
          component="div"
          count={filteredLeads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </div>
  );
};

export default Departments;
