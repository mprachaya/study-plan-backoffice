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

function FacultyPage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'NAME TH', column: 'faculty_name_th', type: 'string' }, { name: 'NAME EN', column: 'faculty_name_en', type: 'string' }];
  const columns = ['faculty_name_th', 'faculty_name_en'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: Faculty, refetch: reFaculty } = useFetch(`${url.apiPart + 'faculty'}`, { faculty_id: '' });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    facultyId: '',
    facultyNameTh: '',
    facultyNameEn: '',
  });

  function handleOpenFormUpdate(facultyId, facultyNameTh, facultyNameEn) {
    setState((pre) => ({
      ...pre, facultyId, facultyNameTh, facultyNameEn
    }));
    setSeletedId(facultyId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reFaculty(`${url.apiPart + 'faculty'}`, { faculty_id: '' });
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
      reFaculty(`${url.apiPart + 'faculty_search'}`, { search_text: textSearch, column: columns[countColumn] });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(Faculty).length === 1 && countColumn <= columns.length) {
      Object.keys(Faculty).map((row) => (
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
  }, [Faculty]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'faculty_edit'}`,
      {
        faculty_id: stateUpdate.facultyId,
        faculty_name_th: stateUpdate.facultyNameTh,
        faculty_name_en: stateUpdate.facultyNameEn,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, facultyNameTh) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, facultyNameTh }));
    setOpenAlertDialog(true);
  }

  function handleDelete(facultyId) {
    axios.post(`${url.apiPart + 'faculty_delete'}`,
      {
        faculty_id: facultyId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'faculty_create'}`,
      {
        faculty_name_th: stateCreate.faculty_name_th,
        faculty_name_en: stateCreate.faculty_name_en,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create faculty successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated faculty successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted faculty already!');
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
      <PapperBlock title="Faculty (คณะ)" desc="Some text description">
        <TbPagination colums={columsName} rows={Faculty} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog Facultyelection={Faculty.data} facultySelection={Faculty.data} handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.facultyNameTh} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FacultyPage;
