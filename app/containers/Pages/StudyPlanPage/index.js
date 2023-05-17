import React, { useEffect, useState } from 'react';
import { PapperBlock } from 'dan-components';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TbPagination from './components/TbPagination';
import useFetch from '../../../hooks/useFetch';
import url from '../../../api/url/partSetup';
import CreateFormDialog from './components/CreateFormDialog';

function StudyPlanPage() {
  const [open, setOpen] = useState({
    createDialog: false,
    updateDialog: false,
    deleteDialog: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

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
    { name: 'PLAN VER.', column: 'study_plan_ver', type: 'int' },
  ];
  const { resData: StudyPlans } = useFetch(`${url.apiPart + 'studyplans'}`, {
    study_plan_id: '',
  });

  const { resData: Curriculum } = useFetch(`${url.apiPart + 'curriculum'}`, {
    curriculum_id: '',
  });

  const handleOpen = (state) => {
    if (state === 'create') {
      setOpen({
        ...open,
        createDialog: true
      });
    } else if (state === 'update') {
      setOpen({
        ...open,
        updateDialog: true
      });
    } else if (state === 'delete') {
      setOpen({
        ...open,
        deleteDialog: true
      });
    }
  };

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
          handleOpen={handleOpen}
        />
        <CreateFormDialog
          open={open.createDialog}
          handleClose={() => setOpen({ ...open, createDialog: false })}
          curriculum={Curriculum.data}
          data={StudyPlans.data}
          handleSnackbar={handleSnackbar}
        />
        <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarText}
          </Alert>
        </Snackbar>
        {/* <TbPagination colums={columsName} rows={Categories} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} /> */}
      </PapperBlock>
    </div>
  );
}

export default StudyPlanPage;
