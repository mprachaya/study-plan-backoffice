import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { useFetch } from '../../../../hooks/useFetch';
import url from '../../../../api/url/partSetup';
import ConfirmDelete from './ComfirmDelete';

const useStyles = makeStyles()((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  list: {
    overflowY: 'auto',
    margin: 12,
    padding: 0,
    listStyle: 'none',
    height: '100%',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  hover: {
    textDecoration: 'none',
    '&:hover': {
      fontWeight: 'bold'
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  table: {
    minWidth: '50%',
  },
}));

// eslint-disable-next-line
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialog(props) {
  const {
    classes
  } = useStyles();

  const {
    open, handleClose, chilesSelection,
    parentName, deleteChile, handleSnackbar,
    parentId, handleReload, reSelection,
    setSnackColor,
  } = props;

  const [textSearch, setTextSearch] = React.useState('');
  const [forceReChile, setForce] = React.useState(1);
  const [checkState, setCheckState] = React.useState(1);
  const [addState, setAddState] = React.useState(1);
  const [stateSubject, setStateSubject] = React.useState({
    subject_id: 0,
    subject_code: '',
    subject_name_th: '',
  });
  const [openDialog, setOpenDialog] = React.useState(false);

  const { resData: Chiles, refetch: reChiles } = useFetch(`${url.apiPart + 'chiles'}`, { parent_id: parentId });

  const colums = [{ name: 'CODE', column: 'subject_code', type: 'string' }, { name: 'NAME TH', column: 'subject_name_th', type: 'string' }, { name: 'CREDIT', column: 'credit_qty', type: 'int' }];

  const closeBtn = () => {
    handleClose();
    handleReload();
  };

  const handleChangeSearch = (event) => {
    setTextSearch(event.target.value);
  };

  const getState = (chileId, subjectCode, subjectNameTh, caseState) => {
    if (caseState === 'delete') {
      setCheckState(0);
      setForce(1);
      setStateSubject((pre) => ({
        ...pre,
        subject_id: chileId,
        subject_code: subjectCode,
        subject_name_th: subjectNameTh
      }));
    } else if (caseState === 'add') {
      setAddState(0);
      setForce(1);
      setStateSubject((pre) => ({
        ...pre,
        subject_id: chileId,
        subject_code: subjectCode,
        subject_name_th: subjectNameTh
      }));
    }
  };

  useEffect(() => {
    reChiles(`${url.apiPart + 'chiles'}`, { parent_id: parentId });
    reSelection();
  }, [open, openDialog, forceReChile]);

  useEffect(() => {
    if (stateSubject.subject_id !== 0 && checkState === 0) {
      axios.post(`${url.apiPart + 'check_chile'}`,
        {
          parent_id: stateSubject.subject_id
        })
        .then((res) => {
          if (res.data.returnCode !== 2) {
            setOpenDialog((pre) => ({ ...pre, deleteDialog: true }));
            setCheckState(1);
          } else {
            deleteChile(stateSubject.subject_id, false);
            setForce(0);
            setCheckState(1);
          }
        });
    }
  }, [checkState]);

  useEffect(() => {
    if (stateSubject.subject_id !== 0 && addState === 0) {
      if (stateSubject.subject_id !== parentId) {
        axios.post(`${url.apiPart + 'addchile'}`,
          {
            subject_id: stateSubject.subject_id,
            parent_id: parentId
          })
          .then((res) => {
            if (res.data.statusCode === 302) {
              setForce(0);
              setAddState(1);
              setSnackColor('warning');
              handleSnackbar('already');
            } else {
              setForce(0);
              setAddState(1);
              setSnackColor('success');
              handleSnackbar('create');
            }
          });
      } else {
        setAddState(1);
        setSnackColor('warning');
        handleSnackbar('', 'This is parent subject!');
      }
    }
  }, [addState]);
  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography align='center' variant="h6" className={classes.title}>
              Edit Chiles of ({parentName})
            </Typography>
            <Button autoFocus color="inherit" onClick={closeBtn}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{
          display: 'flex',
          p: 1,
          m: 1,
          flexDirection: 'row',
        }}>
          <Box sx={{
            display: 'flex',
            p: 1,
            m: 1,
            flexDirection: 'column',
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
            <List className={classes.list}
              sx={{
                maxHeight: 800,
              }}>
              {chilesSelection !== undefined
                ? Object.values(chilesSelection).filter((menu) => (
                  menu.subject_code.toLowerCase().includes(textSearch.toLowerCase())
                  || menu.subject_name_th.toLowerCase().includes(textSearch.toLowerCase())
                )).map((menu) => (
                  <div key={menu.subject_id}>
                    <ListItem button >
                      <ListItemText primary={menu.subject_code} secondary={menu.subject_name_th} />
                      <Typography onClick={() => getState(menu.subject_id, menu.subject_code, menu.subject_name_th, 'add')} className={classes.hover} sx={{ paddingX: 4 }}>+</Typography>
                    </ListItem>
                    <Divider />
                  </div>
                ))
                : null
              }
            </List>
          </Box>
          <TableContainer >
            <Table
              className={classes.table}
              size="medium"
            >
              <TableRow>
                <TableCell align="left">DELETE</TableCell>
                {colums.map((columName, index) => (
                  index === 0 ? <TableCell key={index} id={index} component="th" scope="row">{columName.name}</TableCell>
                    : <TableCell key={index} id={index} align="left">{columName.name}</TableCell>
                )
                )}
              </TableRow>
              <TableBody>
                {Chiles.statusCode === 200
                  ? Object.values(Chiles.data).map((chile) => (
                    <TableRow key={chile.subject_code}>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => getState(chile.subject_id, chile.subject_code, chile.subject_name_th, 'delete')}>
                          DELETE
                        </Button>
                      </TableCell>
                      <TableCell>{chile.subject_code}</TableCell>
                      <TableCell>{chile.subject_name_th}</TableCell>
                      <TableCell>{chile.credit_qty}</TableCell>
                    </TableRow>
                  ))
                  : <TableCell colSpan={100} align='center'>ไม่มีวิชาตัวต่อ</TableCell>
                }

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ConfirmDelete
          handleSnackbar={handleSnackbar}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          header={'Confirm Delete'}
          nameTh={stateSubject.subject_code + ' ' + stateSubject.subject_name_th}
          handleDelete={() => deleteChile(stateSubject.subject_id, false)}
        />
      </Dialog>
    </div >
  );
} FullScreenDialog.propTypes = {
  open: PropTypes.any.isRequired,
  handleClose: PropTypes.any,
  chilesSelection: PropTypes.any,
  parentName: PropTypes.string,
  parentId: PropTypes.number,
  deleteChile: PropTypes.func,
  handleSnackbar: PropTypes.func,
  handleReload: PropTypes.func,
  reSelection: PropTypes.func,
  setSnackColor: PropTypes.func,
};
