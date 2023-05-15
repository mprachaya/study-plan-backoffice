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

function GroupTypePage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'GROUP TYPE', column: 'group_type_name', type: 'string' }, { name: 'SUBJECT TYPE', column: 'subject_type_name', type: 'string' }];
  const columns = ['group_type_name', 'subject_type_name'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: GroupType, refetch: reGroupType } = useFetch(`${url.apiPart + 'grouptype2'}`, { group_type_id: '', subject_type_id: '' });
  const { resData: SubjectType } = useFetch(`${url.apiPart + 'subjecttypes'}`, { subject_type_id: '', subject_category_id: '' });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    groupTypeId: '',
    groupTypeName: '',
  });

  function handleOpenFormUpdate(groupTypeId, groupTypeName, subjectTypeName) {
    setState((pre) => ({
      ...pre, groupTypeId, groupTypeName, subjectTypeName
    }));
    setSeletedId(groupTypeId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reGroupType(`${url.apiPart + 'grouptype2'}`, { group_type_id: '', subject_type_id: '' });
    }
    // refetch after
    if (mode === 'search') {
      setTextSearch(text);
      setSearchState(true);
      if (countColumn >= columns.length) {
        setCountColumn(0);
      }
    }
    setOpenFormUpdate(false);
  }

  useEffect(() => {
    if (searchState === true) {
      reGroupType(`${url.apiPart + 'grouptype_search'}`, { search_text: textSearch, column: columns[countColumn] });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(GroupType).length === 1 && countColumn <= columns.length) {
      Object.keys(GroupType).map((row) => (
        row.data ? console.log(row.data)
          : setSearchState(true)
      ));
      if (countColumn >= columns.length) {
        setSearchState(false);
        setTextSearch('');
        setCountColumn(0);
      }
    } else {
      setSearchState(false);
      setCountColumn(0);
    }
  }, [GroupType]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'grouptype_edit'}`,
      {
        group_type_id: stateUpdate.groupTypeId,
        group_type_name: stateUpdate.groupTypeName,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, groupTypeName) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, groupTypeName }));
    setOpenAlertDialog(true);
  }

  function handleDelete(groupTypeId) {
    axios.post(`${url.apiPart + 'grouptype_delete'}`,
      {
        group_type_id: groupTypeId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'grouptype_create'}`,
      {
        group_type_name: stateCreate.groupTypeName,
        subject_type_id: stateCreate.subjectTypeId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create group type successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated group type successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted group type already!');
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
      <PapperBlock title="Subject Group Type" desc="Some text description">
        <TbPagination colums={columsName} rows={GroupType} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.groupTypeName} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog SubjectTypeSelection={SubjectType.data} handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default GroupTypePage;
