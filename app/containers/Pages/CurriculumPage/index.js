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

function CurriculumPage() {
  const title = '';
  const description = brand.desc;
  const columsName = [{ name: 'NAME TH', column: 'curriculum_name_th', type: 'string' }, { name: 'NAME EN', column: 'curriculum_name_en', type: 'string' }, { name: 'FACULTY', column: 'faculty_name_th', type: 'string' }, { name: 'GROUP', column: 'group_short_name_th', type: 'string' }, { name: 'YEAR', column: 'curriculum_year', type: 'int' }];
  const columns = ['curriculum_name_th', 'curriculum_name_en', 'curriculum_year', 'faculty_name_th', 'group_short_name_th', 'curriculum_year'];
  const [openFormUpdate, setOpenFormUpdate] = useState();
  const [openAlertDialog, setOpenAlertDialog] = useState();
  const [openFormCreate, setOpenFormCreate] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [seletedId, setSeletedId] = useState();
  const [searchState, setSearchState] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [countColumn, setCountColumn] = useState(0);

  const { resData: Curriculums, refetch: reCurriculums } = useFetch(`${url.apiPart + 'curriculum'}`, { curriculum_id: '' });
  const { resData: Faculty } = useFetch(`${url.apiPart + 'faculty'}`, { faculty_id: '' });
  const { resData: StudentGroup } = useFetch(`${url.apiPart + 'studentgroups'}`, { student_cur_group_id: '' });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [state, setState] = useState({
    curiculumId: '',
    facultyId: '',
    studentCurGroupId: '',
    curriculumNameTh: '',
    curriculumNameEn: '',
    facultyName: '',
    groupName: '',
    year: '',
  });

  function handleOpenFormUpdate(curiculumId, facultyId, studentCurGroupId, curriculumNameTh, curriculumNameEn, year) {
    setState((pre) => ({
      ...pre, curiculumId, facultyId, studentCurGroupId, curriculumNameTh, curriculumNameEn, year
    }));
    setSeletedId(curiculumId);
    setOpenFormUpdate(true);
  }

  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reCurriculums(`${url.apiPart + 'curriculum'}`, { curriculum_id: '' });
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
      reCurriculums(`${url.apiPart + 'curriculum_search'}`, { search_text: textSearch, column: columns[countColumn] });
      setCountColumn((pre) => pre + 1);
      setSearchState(false);
    }
  }, [searchState]);

  useEffect(() => {
    if (Object.keys(Curriculums).length === 1 && countColumn <= columns.length) {
      Object.keys(Curriculums).map((row) => (
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
  }, [Curriculums]);

  function handleUpdate(stateUpdate) {
    axios.post(`${url.apiPart + 'curriculum_edit'}`,
      {
        curriculum_id: stateUpdate.curiculumId,
        student_cur_group_id: stateUpdate.studentCurGroupId,
        faculty_id: stateUpdate.facultyId,
        curriculum_name_th: stateUpdate.curriculumNameTh,
        curriculum_name_en: stateUpdate.curriculumNameEn,
        curriculum_year: stateUpdate.year,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
  }

  function handleOpenAlertDialog(id, curriculumNameTh, year) {
    setSeletedId(id);
    setState((pre) => ({ ...pre, curriculumNameTh, year }));
    setOpenAlertDialog(true);
  }

  function handleDelete(curiculumId) {
    axios.post(`${url.apiPart + 'curriculum_delete'}`,
      {
        curriculum_id: curiculumId,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenAlertDialog(false);
  }

  function handleOpenCreateDialog() {
    setOpenFormCreate(true);
  }

  function handleCreate(stateCreate) {
    axios.post(`${url.apiPart + 'curriculum_create'}`,
      {
        curriculum_name_th: stateCreate.curriculum_name_th,
        curriculum_name_en: stateCreate.curriculum_name_en,
        faculty_id: stateCreate.faculty_id,
        student_cur_group_id: stateCreate.student_cur_group_id,
        curriculum_year: stateCreate.curriculum_year,
        ref_curriculum_id: stateCreate.ref_curriculum_id,
      }).then(res => { console.log(res.data); }).catch((err) => { console.log(err); }).finally(() => { reFetchData('update'); });
    setOpenFormCreate(false);
  }

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create curriculum successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated curriculum successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted curriculum already!');
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
      <PapperBlock title="Curriculums (หลักสูตร)" desc="Some text description">
        <TbPagination colums={columsName} rows={Curriculums} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} />
      </PapperBlock>
      {openFormUpdate ? <EditFormDialog curriculumSelection={Curriculums.data} GroupSelection={StudentGroup.data} facultySelection={Faculty.data} handleSnackbar={handleSnackbar} handleUpdate={handleUpdate} fieldValue={state} formName={'Form Edit'} open={openFormUpdate} handleClose={() => setOpenFormUpdate(false)} mode={'edit'} /> : null}
      {openAlertDialog ? <ComfirmDelete open={openAlertDialog} handleSnackbar={handleSnackbar} handleClose={() => setOpenAlertDialog(false)} header={'Confirm Dialog'} nameTh={state.curriculumNameTh} year={state.year} handleDelete={() => handleDelete(seletedId)} /> : null}
      {openFormCreate ? <CreateFormDialog curriculumSelection={Curriculums.data} GroupSelection={StudentGroup.data} facultySelection={Faculty.data} handleSnackbar={handleSnackbar} open={openFormCreate} handleClose={() => setOpenFormCreate(false)} handleCreate={handleCreate} /> : null}
      <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CurriculumPage;
