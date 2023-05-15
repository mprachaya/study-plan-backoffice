import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '40%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: 750,
  },
  searchButton: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: 4,
    fontSize: 16,
    margin: '16px',
    padding: '16px',
  },
}));

export default function TbPagination(props) {
  const {
    classes
  } = useStyles();
  const { colums, rows, openFormUpdate } = props;
  const { openAlertDialog } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [columSelected, setColumSeleted] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [sort, setSort] = React.useState('desc');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTogle = (columName) => {
    if (columSelected === columName) {
      if (sort === 'asc') {
        setSort('desc');
      } else {
        setSort('asc');
      }
    } else {
      setSort('asc');
    }
    setColumSeleted(columName);
    setToggle(() => !toggle);
  };

  useEffect(() => {
    console.log(columSelected + ' sort :' + sort);
  }, [columSelected, sort]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Box sx={{
        display: 'flex', p: 1, m: 1
      }}>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="filled"
        />
        <Button
          variant="contained"
          color="warning"
          disableRipple
          className={classes.searchButton}
        >
          <SearchIcon />Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableRipple
          className={classes.searchButton}
        >
          Create Curriculum
        </Button>

      </Box>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <TableRow >
              <TableCell align="left">EDIT</TableCell>
              <TableCell align="left">DELETE</TableCell>
              {colums.map((columName, index) => (
                index === 0 ? <TableCell onClick={() => handleTogle(columName.name)} key={columName.name} id={index} component="th" scope="row">{columName.name}{columSelected === columName.name && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
                  : <TableCell onClick={() => handleTogle(columName.name)} key={columName.name} id={index} align="left">{columName.name}{columSelected === columName.name && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
              )
              )}
            </TableRow>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell align="left"><Button variant="contained" onClick={() => openFormUpdate(row.id, row.name, row.calories, row.fat, row.carbs, row.protein)}>edit</Button></TableCell>
                      <TableCell align="left" ><Button variant="outlined" onClick={() => openAlertDialog(row.id)}>delete</Button></TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">{row.fat}</TableCell>
                      <TableCell align="left">{row.carbs}</TableCell>
                      <TableCell align="left">{row.protein}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
TbPagination.propTypes = {
  colums: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  openFormUpdate: PropTypes.func.isRequired,
  openAlertDialog: PropTypes.func.isRequired,
};
