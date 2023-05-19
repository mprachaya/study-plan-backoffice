import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PapperBlock } from 'dan-components';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TbPagination from './components/TbPagination';
import useFetch from '../../../hooks/useFetch';
import url from '../../../api/url/partSetup';
import CreateFormDialog from './components/CreateFormDialog';
import ComfirmDelete from './components/ComfirmDelete';
import EditFormDialog from './components/EditFormDialog';

function StudyPlanPage() {
  const [open, setOpen] = useState({
    createDialog: false,
    updateDialog: false,
    deleteDialog: false,
  });

  const [state, setState] = useState({
    planId: 0,
    planName: 0,
    curriculumId: 0,
    curriculumName: '',
    version: 0,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  // const [searchState, setSearchState] = useState(false);
  // const [textSearch, setTextSearch] = useState('');

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleSnackbar(status) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create study plan successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated study plan successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted study plan already!');
    }
  }

  const columsName = [
    { name: 'CURRICULUM', column: 'curriculum_name', type: 'string' },
    { name: 'PLAN NAME', column: 'study_plan_name', type: 'string' },
    { name: 'VERSION', column: 'study_plan_ver', type: 'string' },
  ];
  const { resData: StudyPlans, refetch: reStudyPlans } = useFetch(`${url.apiPart + 'studyplans'}`, {
    study_plan_id: '',
  });

  const { resData: Curriculum } = useFetch(`${url.apiPart + 'curriculum'}`, {
    curriculum_id: '',
  });

  const handleOpen = (openState, stateUpdate) => {
    if (openState === 'create') {
      setOpen({
        ...open,
        createDialog: true,
      });
    } else if (openState === 'update') {
      setState(stateUpdate);
      setOpen({
        ...open,
        updateDialog: true,
      });
    } else if (openState === 'delete') {
      setOpen({
        ...open,
        deleteDialog: true,
      });
    }
  };
  function reFetchData(mode, text) {
    // refetch after data have update
    if (mode === 'update') {
      reStudyPlans(`${url.apiPart + 'studyplans'}`, {
        study_plan_id: '',
      });
    }
    // refetch after
    if (mode === 'search') {
      // setTextSearch(text);
      // setSearchState(true);
      console.log(text);
    }
    setOpen({
      ...open,
      updateDialog: false,
    });
  }

  function handleCreate(stateCreate) {
    axios
      .post(`${url.apiPart + 'studyplan_create'}`, {
        curriculum_id: stateCreate.curriculumId,
        study_plan_name: stateCreate.planName,
        study_plan_version: stateCreate.version,
        total_credit: 0,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reFetchData('update');
        setOpen({
          ...open,
          createDialog: true,
        });
      });
  }
  function handleOpenAlertDialog(id, name, curriculum) {
    setState({
      ...state,
      planId: id,
      planName: name,
      curriculumName: curriculum,
    });
    setOpen({
      ...open,
      deleteDialog: true,
    });
  }

  function handleDelete(id) {
    axios
      .post(`${url.apiPart + 'studyplan_delete'}`, {
        study_plan_id: id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reFetchData('update');
        setOpen({
          ...open,
          deleteDialog: false,
        });
      });
  }
  function handleOpenFormUpdate(planId, planName, curriculumId, curriculumName, version) {
    setState(() => ({
      ...state,
      planId,
      planName,
      curriculumId,
      curriculumName,
      version,
    }));
    setOpen({
      ...open,
      updateDialog: true,
    });
  }
  function handleUpdate(stateUpdate) {
    axios
      .post(`${url.apiPart + 'studyplan_edit'}`, {
        study_plan_id: stateUpdate.planId,
        study_plan_name: stateUpdate.planName,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        reFetchData('update');
      });
  }

  useEffect(() => {
    console.log(Curriculum.data);
  }, [Curriculum]);

  return (
    <div>
      <PapperBlock
        title='Study Plans (มคอ 2)'
        desc='Some text description'>
        <TbPagination
          colums={columsName}
          rows={StudyPlans.data}
          curriculumData={Curriculum.data}
          openCreateDialog={handleOpen}
          openUpdateDialog={handleOpenFormUpdate}
          openAlertDialog={handleOpenAlertDialog}
        />
        <CreateFormDialog
          open={open.createDialog}
          handleClose={() => setOpen({ ...open, createDialog: false })}
          curriculum={Curriculum.data}
          data={StudyPlans.data}
          handleSnackbar={handleSnackbar}
          handleCreate={handleCreate}
        />
        <ComfirmDelete
          open={open.deleteDialog}
          handleSnackbar={handleSnackbar}
          handleClose={() => setOpen({ ...open, deleteDialog: false })}
          header={'Confirm Dialog'}
          nameTh={state.planName + ' ' + state.curriculumName}
          handleDelete={() => handleDelete(state.planId)}
        />
        <EditFormDialog
          curriculumSelection={Curriculum.data}
          handleSnackbar={handleSnackbar}
          handleUpdate={handleUpdate}
          fieldValue={state}
          formName={'Form Edit'}
          open={open.updateDialog}
          handleClose={() => setOpen({
            ...open,
            updateDialog: false,
          })
          }
        />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={20000}
          onClose={() => setOpenSnackbar(false)}>
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity='success'
            sx={{ width: '100%' }}>
            {snackbarText}
          </Alert>
        </Snackbar>
        {/* <TbPagination colums={columsName} rows={Categories} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} /> */}
      </PapperBlock>
    </div>
  );
}

export default StudyPlanPage;
