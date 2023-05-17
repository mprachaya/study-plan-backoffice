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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

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
  const { classes } = useStyles();
  const { colums, rows, openFormUpdate } = props;
  const { openAlertDialog, openFormCreate, searchData } = props;
  // const { SelectionMenu } = props;
  // const { curriculumSelectionMenus, curriculumSelectionValues } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [columSelected, setColumSeleted] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [sort, setSort] = React.useState('desc');
  const [data, setData] = React.useState([]);
  const [dataLength, setDataLenght] = React.useState(0);
  const [textSearch, setTextSearch] = React.useState('');
  // const [uniqueSelection, setUniqueSelectiom] = React.useState([]);
  const [state, setState] = React.useState({
    curriculum_id: 1,
    group_type_id: 0,
    subject_code: '',
    subject_name_th: '',
    subject_name_en: '',
    credit_qty: 3,
    subject_description: '',
  });

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

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleSort = (header) => {
    setColumSeleted(header.column);
    setToggle(() => !toggle);
    if (sort === 'asc') {
      if (header.type === 'int') {
        setData(data.sort((a, b) => a[header.column] - b[header.column]));
        setSort('desc');
        // console.log('sort int asc :', header.column);
      } else if (header.type === 'string') {
        setData(
          data.sort((a, b) => (a[header.column] > b[header.column] ? 1 : -1))
        );
        setSort('desc');
        // console.log('sort string asc :', header.column);
      }
    } else if (sort === 'desc') {
      if (header.type === 'int') {
        setData(data.sort((a, b) => b[header.column] - a[header.column]));
        setSort('asc');
        // console.log('sort int desc :', header.column);
      } else if (header.type === 'string') {
        setData(
          data.sort((a, b) => (a[header.column] > b[header.column] ? -1 : 1))
        );
        setSort('asc');
        // console.log('sort string desc :', header.column);
      }
    }
  };

  useEffect(() => {
    if (rows) {
      console.log(rows);
      setData(rows);
      // console.log(rows);
      // setData(rows);
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
      <Box
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
        }}>
        <TextField
          value={textSearch}
          id='filled-search'
          label='Search field'
          type='search'
          className={classes.textField}
          margin='normal'
          variant='filled'
          onChange={(e) => handleChangeSearch(e)}
        />
        <Button
          variant='contained'
          color='warning'
          disableRipple
          onClick={handleClickSearch}
          className={classes.searchButton}>
          <SearchIcon />
          Search
        </Button>
        <Button
          variant='contained'
          color='primary'
          disableRipple
          className={classes.searchButton}
          onClick={openFormCreate}>
          Create Plan
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          p: 1,
          m: 1,
        }}>
        <FormControl
          variant='standard'
          margin='dense'
          sx={{ marginRight: 1 }}>
          <InputLabel htmlFor='curriculum_id'>Curriculum</InputLabel>
          <Select
            variant='standard'
            value={state.curriculum_id}
            onChange={(e) => handleChange(e)}
            name={'curriculum_id'}
            id={'curriculum_id'}
            defaultValue={''}
            className={classes.selectEmpty}>
            <MenuItem key={3} value={3}>หลักสูตร วศ.บ 2565</MenuItem>
            <MenuItem key={2} value={2}>หลักสูตร วศ.บ 2560</MenuItem>
            <MenuItem key={1} value={1}>หลักสูตร วศ.บ 2555</MenuItem>
            {/* {curriculumSelectionMenus?.map((value) => (
              <MenuItem key={value}>{value}</MenuItem>
            ))};
            {curriculumSelectionValues?.map((value) => (
              <MenuItem key={value}>{value}</MenuItem>
            ))}; */}
            {/* {curriculumSelection !== undefined ? Object.values(curriculumSelection).map((crMenu) => (
              <MenuItem key={crMenu.curriculum_id} value={crMenu.curriculum_id}>{crMenu.curriculum_name_th}({crMenu.curriculum_year})</MenuItem>
            )) : null} */}
          </Select>
        </FormControl>
      </Box>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'>
            <TableBody>
              <TableRow>
                <TableCell align='left'>EDIT</TableCell>
                <TableCell align='left'>DELETE</TableCell>
                {colums.map((columName, index) => (
                  index === 0 ? (
                    <TableCell
                      onClick={() => handleSort(columName)}
                      key={columName.column}
                      id={index}
                      component='th'
                      scope='row'>
                      {columName.name}
                      {columSelected === columName.column && toggle === false ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell
                      onClick={() => handleSort(columName)}
                      key={columName.column}
                      id={index}
                      align='left'>
                      {columName.name}
                      {columSelected === columName.column && toggle === false ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </TableCell>
                  ))
                )}
              </TableRow>
              {dataLength !== 0 && (
                Object.values(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.study_plan_id}>
                      <TableCell align='left'>
                        <Button
                          variant='contained'
                          onClick={() => (
                            openFormUpdate(
                              row.subject_category_id,
                              row.subject_category_name
                            ))
                          }>
                          edit
                        </Button>
                      </TableCell>
                      <TableCell align='left'>
                        <Button
                          variant='outlined'
                          onClick={() => (
                            openAlertDialog(
                              row.subject_category_id,
                              row.subject_category_name
                            ))
                          }>
                          delete
                        </Button>
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'>
                        {row.curriculum_name_th}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'>
                        {row.study_plan_name}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'>
                        {row.study_plan_version}
                      </TableCell>
                    </TableRow>)
                  ))}
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
          component='div'
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
  // colums: PropTypes.array.isRequired,
  // rows: PropTypes.object.isRequired,
  // openFormUpdate: PropTypes.func.isRequired,
  // openAlertDialog: PropTypes.func.isRequired,
  // openFormCreate: PropTypes.func.isRequired,
  // searchData: PropTypes.func.isRequired,
  colums: PropTypes.array,
  rows: PropTypes.array,
  openFormUpdate: PropTypes.func,
  openAlertDialog: PropTypes.func,
  openFormCreate: PropTypes.func,
  searchData: PropTypes.func,
  // SelectionMenu: PropTypes.any,
  // curriculumSelectionMenus: PropTypes.any,
  // curriculumSelectionValues: PropTypes.any,
};
