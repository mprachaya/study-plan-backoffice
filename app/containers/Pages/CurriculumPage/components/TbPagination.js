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
  const { openAlertDialog, openFormCreate, searchData } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columSelected, setColumSeleted] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [sort, setSort] = React.useState('desc');
  const [data, setData] = React.useState([]);
  const [dataLength, setDataLenght] = React.useState(0);
  const [textSearch, setTextSearch] = React.useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearch = (event) => {
    setTextSearch(event.target.value);
  };

  const handleClickSearch = () => {
    searchData('search', textSearch);
    console.log(textSearch);
  };

  const handleSort = (header) => {
    setColumSeleted(header.column);
    setToggle(() => !toggle);
    if (sort === 'asc') {
      if (header.type === 'int') {
        setData(data.sort((a, b) => (a[header.column] - b[header.column])));
        setSort('desc');
        // console.log('sort int asc :', header.column);
      } else if (header.type === 'string') {
        setData(data.sort((a, b) => (a[header.column] > b[header.column] ? 1 : -1)));
        setSort('desc');
        // console.log('sort string asc :', header.column);
      }
    } else if (sort === 'desc') {
      if (header.type === 'int') {
        setData(data.sort((a, b) => (b[header.column] - a[header.column])));
        setSort('asc');
        // console.log('sort int desc :', header.column);
      } else if (header.type === 'string') {
        setData(data.sort((a, b) => (a[header.column] > b[header.column] ? -1 : 1)));
        setSort('asc');
        // console.log('sort string desc :', header.column);
      }
    }
  };

  useEffect(() => {
    if (rows) {
      console.log(rows.data);
      setData(rows.data);
    }
  }, [rows]);

  useEffect(() => {
    if (data) {
      setDataLenght(Object.values(data).length);
    }
  }, [data, dataLength]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataLength - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Box sx={{
        display: 'flex', p: 1, m: 1
      }}>
        <TextField
          value={textSearch}
          id="filled-search"
          label="Search field"
          type="search"
          className={classes.textField}
          margin="normal"
          variant="filled"
          onChange={(e) => handleChangeSearch(e)}
        />
        <Button
          variant="contained"
          color="warning"
          disableRipple
          onClick={handleClickSearch}
          className={classes.searchButton}
        >
          <SearchIcon />Search
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableRipple
          className={classes.searchButton}
          onClick={openFormCreate}
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
                index === 0 ? <TableCell onClick={() => handleSort(columName)} key={columName.column} id={index} component="th" scope="row">{columName.name}{columSelected === columName.column && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
                  : <TableCell onClick={() => handleSort(columName)} key={columName.column} id={index} align="left">{columName.name}{columSelected === columName.column && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
              )
              )}
            </TableRow>
            <TableBody>
              {dataLength !== 0 && Object.values(data)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.curriculum_id}
                    >
                      <TableCell align="left"><Button variant="contained" onClick={() => openFormUpdate(row.curriculum_id, row.faculty_id, row.student_cur_group_id, row.curriculum_name_th, row.curriculum_name_en, row.curriculum_year)}>edit</Button></TableCell>
                      <TableCell align="left" ><Button variant="outlined" onClick={() => openAlertDialog(row.curriculum_id, row.curriculum_name_th, row.curriculum_year)}>delete</Button></TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.curriculum_name_th}
                      </TableCell>
                      <TableCell align="left">{row.curriculum_name_en}</TableCell>
                      <TableCell align="left">{row.faculty_name_th}</TableCell>
                      <TableCell align="left">{row.group_short_name_th}</TableCell>
                      <TableCell align="left">{row.curriculum_year}</TableCell>
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={dataLength}
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
  openFormCreate: PropTypes.func.isRequired,
  searchData: PropTypes.func.isRequired,
};
