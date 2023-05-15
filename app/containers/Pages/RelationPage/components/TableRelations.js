import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { Typography } from '@mui/material';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import url from '../../../../api/url/partSetup';
import ConfirmDelete from './ComfirmDelete';
import FullScreenDialog from './FullScreenDialog';

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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

export default function TableRelations(props) {
  const {
    classes
  } = useStyles();

  const { colums, rootSelection, level } = props;
  const { reSubjects, curriculumId, Relations } = props;
  const { reRelations, Selectedcurriculum, handleSnackbar } = props;
  const { reLevel, setSnackColor } = props;
  const [openDialog, setOpenDialog] = React.useState({
    rootDialog: false,
    deleteDialog: false,
    editDialog: false
  });
  const [columSelected, setColumSeleted] = React.useState();
  const [toggle, setToggle] = React.useState(true);
  const [sort, setSort] = React.useState('desc');
  const [rootSelected, setRootSeleted] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [stateSubject, setStateSubject] = React.useState({
    subject_id: 0,
    subject_code: '',
    subject_name_th: '',
  });
  const [stateRoot, setStateRoot] = React.useState({
    subject_id: 0,
  });

  useEffect(() => {
    if (rootSelection !== undefined) {
      setRootSeleted(rootSelection.data);
    }
  }, [rootSelection]);

  useEffect(() => {
    if (Relations) {
      setRows(Relations.data);
    }
  }, [Relations]);

  useEffect(() => {
    console.log(stateSubject.subject_id);
  }, [stateSubject.subject_id]);

  useEffect(() => {
    reSubjects(`${url.apiPart + 'subjectlist'}`, { curriculum_id: curriculumId });
  }, [curriculumId]);

  const deepDelete = () => {
    axios.post(`${url.apiPart + 'deepdelete'}`
    ).then(res => { console.log(res.data); }).catch((err) => { console.log(err); });
  };

  const handleDeleteParent = () => {
    axios.post(`${url.apiPart + 'delete_parent'}`,
      {
        parent_id: stateSubject.subject_id
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); })
      .finally(() => {
        deepDelete();
        reRelations(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
        setOpenDialog((pre) => ({ ...pre, deleteDialog: false }));
        reLevel(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });
        setSnackColor('success');
        handleSnackbar('delete');
      });
  };

  const handleDeleteParentNoChile = (subjectId, stateReload) => {
    if (stateReload === true) {
      axios.post(`${url.apiPart + 'delete_parent'}`,
        {
          parent_id: subjectId
        }).then(res => { console.log(res.rootSelected); }).catch((err) => { console.log(err); })
        .finally(() => {
          deepDelete();
          reRelations(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
          setOpenDialog((pre) => ({ ...pre, deleteDialog: false }));
          reLevel(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });
          setSnackColor('success');
          handleSnackbar('delete');
        });
    } else {
      axios.post(`${url.apiPart + 'delete_parent'}`,
        {
          parent_id: subjectId
        }).then(res => { console.log(res.rootSelected); }).catch((err) => { console.log(err); });
    }
  };

  const handleOpenDialog = (type, subjectId, subjectCode, subjectNameTh) => {
    if (type === 'delete') {
      axios.post(`${url.apiPart + 'check_chile'}`,
        {
          parent_id: subjectId
        })
        .then((res) => {
          if (res.data.returnCode !== 2) {
            setOpenDialog((pre) => ({ ...pre, deleteDialog: true }));
            setStateSubject((pre) => ({
              ...pre,
              subject_id: subjectId,
              subject_code: subjectCode,
              subject_name_th: subjectNameTh
            }));
          } else {
            setStateSubject((pre) => ({
              ...pre,
              subject_id: subjectId,
              subject_code: subjectCode,
              subject_name_th: subjectNameTh
            }));
            handleDeleteParentNoChile(subjectId, true);
          }
        });
    } else if (type === 'edit') {
      setOpenDialog((pre) => ({ ...pre, editDialog: true }));
      setStateSubject((pre) => ({
        ...pre,
        subject_id: subjectId,
        subject_code: subjectCode,
        subject_name_th: subjectNameTh
      }));
    }
  };

  const handleReload = () => {
    reRelations(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
    reLevel(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });
  };

  const handleAddRoot = () => {
    if (stateRoot.subject_id !== 0) {
      axios.post(`${url.apiPart + 'root_create'}`,
        {
          subject_id: stateRoot.subject_id
        }).then(res => { console.log(res.rootSelected); }).catch((err) => { console.log(err); })
        .finally(() => {
          reRelations(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
          reLevel(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });
        });
    }
  };
  const handleChange2 = (event) => {
    setStateRoot({
      ...stateRoot,
      [event.target.name]: event.target.value
    });
  };

  const handleSort = (header) => {
    setColumSeleted(header.column);
    setToggle(() => !toggle);
    if (sort === 'asc') {
      if (header.type === 'int') {
        setRows(rows.sort((a, b) => (a[header.column] - b[header.column])));
        setSort('desc');
        // console.log('sort int asc :', header.column);
      } else if (header.type === 'string') {
        setRows(rows.sort((a, b) => (a[header.column] > b[header.column] ? 1 : -1)));
        setSort('desc');
        // console.log('sort string asc :', header.column);
      }
    } else if (sort === 'desc') {
      if (header.type === 'int') {
        setRows(rows.sort((a, b) => (b[header.column] - a[header.column])));
        setSort('asc');
        // console.log('sort int desc :', header.column);
      } else if (header.type === 'string') {
        setRows(rows.sort((a, b) => (a[header.column] > b[header.column] ? -1 : 1)));
        setSort('asc');
        // console.log('sort string desc :', header.column);
      }
    }
  };

  return (

    <div className={classes.root}>
      <Box sx={{
        display: 'flex', p: 1, m: 1
      }}>
        {level === 1
          ? <div>
            <FormControl variant="standard" margin="dense" sx={{ marginRight: 1, marginBottom: 4 }}>
              <InputLabel htmlFor="subject_id">Subject</InputLabel>
              <Select
                variant="standard"
                value={stateRoot.subject_id}
                onChange={(e) => handleChange2(e)}
                name={'subject_id'}
                id={'subject_id'}
                defaultValue={''}
                className={classes.selectEmpty}>
                <MenuItem value={0}>เลือกรายวิชา</MenuItem>
                {rootSelected !== undefined ? Object.values(rootSelected).map((subjectMenu) => (
                  <MenuItem key={subjectMenu.subject_id} value={subjectMenu.subject_id}>{subjectMenu.subject_code} ({subjectMenu.subject_name_th})</MenuItem>
                )) : null}
              </Select>
            </FormControl>
            {level === 1
              && <Button onClick={handleAddRoot} sx={{ marginY: 4, marginLeft: 2 }}> ADD ROOT SUBJECT </Button>}

          </div>
          : level > 1
            ? null
            : <Typography>ไม่มีรายวิชาในหลักสูตร</Typography>}
      </Box>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table">
            <TableRow sx={{ margin: 2 }}>
              <TableCell align="left">CHILES</TableCell>
              <TableCell align="left">DELETE</TableCell>
              {colums.map((columName, index) => (
                index === 0 && index !== colums.length ? <TableCell onClick={() => handleSort(columName)} key={columName.column} id={index} component="th" scope="row">{columName.name}{columSelected === columName.column && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
                  : index !== colums.length - 1 ? <TableCell onClick={() => handleSort(columName)} key={columName.column} id={index} align="left">{columName.name}{columSelected === columName.column && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell>
                    : index === colums.length - 1 ? <TableCell onClick={() => handleSort(columName)} key={columName.column} id={index} align="left">{columName.name}{columSelected === columName.column && toggle === false ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</TableCell> : null
              )
              )}
            </TableRow>
            <TableBody>
              {rows !== undefined
                ? Object.values(rows).filter(su => su.level === level).map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Button variant="contained"
                        onClick={() => handleOpenDialog('edit', subject.subject_id, subject.subject_code, subject.subject_name_th)}
                      >EDIT</Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenDialog('delete', subject.subject_id, subject.subject_code, subject.subject_name_th)}>DELETE</Button>
                    </TableCell>
                    <TableCell>{subject.subject_code}</TableCell>
                    <TableCell>{subject.subject_name_th}</TableCell>
                    <TableCell>{subject.subject_name_en}</TableCell>
                    <TableCell>{subject.credit_qty}</TableCell>
                  </TableRow>
                ))
                : <TableCell colSpan={100} align='center'>ไม่มีรายการ</TableCell>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmDelete
          setSnackColor={setSnackColor}
          handleSnackbar={handleSnackbar}
          open={openDialog.deleteDialog}
          handleClose={() => setOpenDialog((pre) => ({ ...pre, deleteDialog: false }))}
          header={'Confirm Delete'}
          nameTh={stateSubject.subject_code + ' ' + stateSubject.subject_name_th}
          handleDelete={handleDeleteParent}
        />
      </Paper>
      {/* edit chiles dialog */}
      <FullScreenDialog
        setSnackColor={setSnackColor}
        handleSnackbar={handleSnackbar}
        open={openDialog.editDialog}
        handleClose={() => setOpenDialog((pre) => ({ ...pre, editDialog: false }))}
        chilesSelection={rootSelection.data}
        reSelection={() => reSubjects(`${url.apiPart + 'subjectlist'}`, { curriculum_id: curriculumId })}
        parentName={stateSubject.subject_code + ' ' + stateSubject.subject_name_th}
        parentId={stateSubject.subject_id}
        deleteChile={handleDeleteParentNoChile}
        handleReload={handleReload}
      />
    </div>
  );
}
TableRelations.propTypes = {
  colums: PropTypes.any,
  rootSelection: PropTypes.any,
  curriculumSelection: PropTypes.any,
  reSubjects: PropTypes.any,
  curriculumId: PropTypes.any,
  level: PropTypes.any,
  Relations: PropTypes.any,
  reRelations: PropTypes.any,
  Selectedcurriculum: PropTypes.any,
  handleSnackbar: PropTypes.any,
  reLevel: PropTypes.any,
  setTabValue: PropTypes.any,
  tabValue: PropTypes.any,
  chiles: PropTypes.any,
  reChiles: PropTypes.any,
  setSnackColor: PropTypes.func,
};
