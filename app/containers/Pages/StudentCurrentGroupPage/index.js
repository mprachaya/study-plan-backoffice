import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TbPagination from './components/TbPagination';
import EditFormDialog from './components/EditFormDialog';
import ComfirmDelete from './components/ComfirmDelete';
import CreateFormDialog from './components/CreateFormDialog';
import { useFetch } from '../../../hooks/useFetch';
import url from '../../../api/url/partSetup';

function StudentCurrentGroupPage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'NAME TH', column: 'group_name_th', type: 'string' }, { name: 'NAME EN', column: 'group_name_en', type: 'string' }, { name: 'SHORT NAME TH', column: 'group_short_name_th', type: 'string' }, { name: 'SHORT NAME EN', column: 'group_short_name_en', type: 'string' }];
  const columns = ['group_name_th', 'group_name_en', 'group_short_name_th', 'group_short_name_en'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: StudentGroup, refetch: reStudentGroup } = useFetch(`${url.apiPart + 'studentgroups'}`, { student_cur_group_id: '' });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    studentGroupId: '',
    groupNameTh: '',
    groupNameEn: '',
    groupShortNameTh: '',
    groupShortNameEn: '',
  });

  function handleOpenFormUpdate(studentGroupId, groupNameTh, groupNameEn, groupShortNameTh, groupShortNameEn) {
    setState((pre) => ({
      ...pre, studentGroupId, groupNameTh, groupNameEn, groupShortNameTh, groupShortNameEn
    }));
    setSeletedId(studentGroupId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reStudentGroup(`${url.apiPart + 'studentgroups'}`, { student_cur_group_id: '' });
    }
    // refetch after
    if (mode === 'search') {
      setTextSearch(text);
      setSearchState(true);
    }
    setOpenFormUpdate(false);
  }

  useEffect(() => {
    if (searchState === true) {
      reStudentGroup(`${url.apiPart + 'studentgroup_search'}`, { search_text: textSearch, column: columns[countColumn] });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(StudentGroup).length === 1 && countColumn <= columns.length) {
      Object.keys(StudentGroup).map((row) => (
        row.data ? console.log(row.data)
          : setSearchState(true)
      ));
      if (countColumn === columns.length) {
        setSearchState(false);
        setTextSearch('');
        setCountColumn(0);
      }
    } else {
      setSearchState(false);
      setCountColumn(0);
    }
  }, [StudentGroup]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'studentgroup_edit'}`,
      {
        student_cur_group_id: stateUpdate.studentGroupId,
        group_name_th: stateUpdate.groupNameTh,
        group_name_en: stateUpdate.groupNameEn,
        group_short_name_th: stateUpdate.groupShortNameTh,
        group_short_name_en: stateUpdate.groupShortNameEn,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, groupNameTh) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, groupNameTh }));
    setOpenAlertDialog(true);
  }

  function handleDelete(studentGroupId) {
    axios.post(`${url.apiPart + 'studentgroup_delete'}`,
      {
        student_cur_group_id: studentGroupId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'studentgroup_create'}`,
      {
        group_name_th: stateCreate.group_name_th,
        group_name_en: stateCreate.group_name_en,
        group_short_name_th: stateCreate.group_short_name_th,
        group_short_name_en: stateCreate.group_short_name_en,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create student group successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated student group successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted student group already!');
    }
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Student Group (กลุ่มนักศึกษา)" desc="Some text description">
        <TbPagination colums={columsName} rows={StudentGroup} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog StudentGroupelection={StudentGroup.data} StudentGroupSelection={StudentGroup.data} handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.groupNameTh} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StudentCurrentGroupPage;
