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

function SubjectTypePage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'TYPE NAME', column: 'subject_type_name', type: 'string' }, { name: 'CATEGORY NAME', column: 'subject_category_name', type: 'string' }];
  const columns = ['subject_type_name', 'subject_category_name'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: SubjectType, refetch: reSubjectType } = useFetch(`${url.apiPart + 'subjecttypes'}`, { subject_type_id: '', subject_category_id: '' });
  const { resData: SubjectCategories } = useFetch(`${url.apiPart + 'categories'}`, { subject_category_id: '' });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    subjectTypeId: '',
    subjectTypeName: '',
  });

  function handleOpenFormUpdate(subjectTypeId, subjectTypeName, subjectCategoryName) {
    setState((pre) => ({
      ...pre, subjectTypeId, subjectTypeName, subjectCategoryName
    }));
    setSeletedId(subjectTypeId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reSubjectType(`${url.apiPart + 'subjecttypes'}`, { subject_type_id: '', subject_category_id: '' });
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
      reSubjectType(`${url.apiPart + 'subjecttype_search'}`, { search_text: textSearch, column: columns[countColumn] });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(SubjectType).length === 1 && countColumn <= columns.length) {
      Object.keys(SubjectType).map((row) => (
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
  }, [SubjectType]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'subjecttype_edit'}`,
      {
        subject_type_id: stateUpdate.subjectTypeId,
        subject_type_name: stateUpdate.subjectTypeName,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, subjectTypeName) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, subjectTypeName }));
    setOpenAlertDialog(true);
  }

  function handleDelete(subjectTypeId) {
    axios.post(`${url.apiPart + 'subjecttype_delete'}`,
      {
        subject_type_id: subjectTypeId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'subjecttype_create'}`,
      {
        subject_type_name: stateCreate.subjectTypeName,
        subject_category_id: stateCreate.subjectCategoryId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create type successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated type successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted type already!');
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
      <PapperBlock title="Subject Type" desc="Some text description">
        <TbPagination colums={columsName} rows={SubjectType} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.subjectTypeName} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog CategorySelection={SubjectCategories.data} handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubjectTypePage;
