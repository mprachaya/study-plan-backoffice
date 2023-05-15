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

function SubjectPage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'CODE', column: 'subject_code', type: 'string' }, { name: 'NAME TH', column: 'subject_name_th', type: 'string' }, { name: 'NAME EN', column: 'subject_name_en', type: 'string' }, { name: 'CREDIT', column: 'credit_qty', type: 'int' }, { name: 'DESCRIPTION', column: 'subject_description', type: 'string' }];
  const columns = ['subject_name_th', 'subject_name_en', 'credit_qty', 'subject_description'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: Subjects, refetch: reSubjects } = useFetch(`${url.apiPart + 'subjects'}`, { curriculum_id: 3, subject_id: '' });
  const { resData: Curriculums } = useFetch(`${url.apiPart + 'curriculum'}`, { curriculum_id: '' });
  const { resData: SubjectGroup, refetch: reGroup } = useFetch(`${url.apiPart + 'grouptype'}`, { curriculum_id: 3 });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    curriculumId: 0,
    groupTypeId: 0,
    subjectId: 0,
    subjectCode: '',
    subjectNameTh: '',
    subjectNameEn: '',
    creditQty: 0,
    subjectDescription: '',
  });

  useEffect(() => {
    if (Curriculums.data) {
      reSubjects(`${url.apiPart + 'subjects'}`, { curriculum_id: Math.max(...Curriculums.data.map(curri => curri.curriculum_id), 0), subject_id: '' });
    }
  }, [Curriculums]);

  function curriculumSelected(curriculumId) {
    setState((pre) => ({ ...pre, curriculumId }));
  }

  function handleOpenFormUpdate(groupTypeId, subjectId, subjectCode, subjectNameTh, subjectNameEn, creditQty, subjectDescription) {
    setState((pre) => ({
      ...pre, groupTypeId, subjectId, subjectCode, subjectNameTh, subjectNameEn, creditQty, subjectDescription
    }));
    setSeletedId(subjectId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reSubjects(`${url.apiPart + 'subjects'}`, { curriculum_id: state.curriculumId, subject_id: '' });
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
      reSubjects(`${url.apiPart + 'subject_search'}`, { search_text: textSearch, column: columns[countColumn], curriculum_id: state.curriculumId });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(Subjects).length === 1 && countColumn <= columns.length) {
      Object.keys(Subjects).map((row) => (
        row.data ? console.log(row.data)
          : setSearchState(true)
      ));
      if (countColumn === columns.length - 2) {
        setSearchState(false);
        setTextSearch('');
        setCountColumn(0);
      }
    } else {
      setSearchState(false);
      setCountColumn(0);
    }
  }, [Subjects]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'subject_edit'}`,
      {
        subject_id: stateUpdate.subject_id,
        group_type_id: stateUpdate.group_type_id,
        subject_code: stateUpdate.subject_code,
        subject_name_th: stateUpdate.subject_name_th,
        subject_name_en: stateUpdate.subject_name_en,
        credit_qty: stateUpdate.credit_qty,
        subject_description: stateUpdate.subject_description,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, subjectCode, subjectNameTh) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, subjectCode, subjectNameTh }));
    setOpenAlertDialog(true);
  }

  function handleDelete(subjectId) {
    axios.post(`${url.apiPart + 'subject_delete'}`,
      {
        subject_id: subjectId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'subject_create'}`,
      {
        curriculum_id: stateCreate.curriculum_id,
        group_type_id: stateCreate.group_type_id,
        subject_code: stateCreate.subject_code,
        subject_name_th: stateCreate.subject_name_th,
        subject_name_en: stateCreate.subject_name_en,
        credit_qty: stateCreate.credit_qty,
        subject_description: stateCreate.subject_description,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create subject successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated subject successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted subject already!');
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
      <PapperBlock title="Subjects (รายวิชา)" desc="Some text description">
        <TbPagination callBackCurriculum={curriculumSelected} refetchGroup={reGroup} groupSelection={SubjectGroup.data} curriculumSelection={Curriculums.data} colums={columsName} rows={Subjects} reSubjects={reSubjects} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog groupSelection={SubjectGroup.data} handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.subjectNameTh} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog groupSelection={SubjectGroup.data} refCurriculum={state.curriculumId} handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SubjectPage;
