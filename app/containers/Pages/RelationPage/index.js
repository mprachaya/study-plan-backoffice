import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Tab from '@mui/material/Tab';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Box, Portal } from '@mui/material';
import { useFetch } from '../../../hooks/useFetch';
import url from '../../../api/url/partSetup';
import TableRelations from './components/TableRelations';

function RelationPage() {
  // const title = brand.name + ' - Blank Page';
  const title = '';
  const description = brand.desc;
  const [tabValue, setTabValue] = React.useState(1);
  const [Selectedcurriculum, setSelectedCurriculum] = React.useState(3);
  const [snackbarText, setSnackbarText] = React.useState('');
  const [snackColor, setSnackColor] = React.useState('success');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [realLevel, setRealLevel] = React.useState([]);
  const columsName = [{ name: 'CODE', column: 'subject_code', type: 'string' }, { name: 'NAME TH', column: 'subject_name_th', type: 'string' }, { name: 'NAME EN', column: 'subject_name_en', type: 'string' }, { name: 'CREDIT', column: 'credit_qty', type: 'int' }];

  const { resData: Curriculums } = useFetch(`${url.apiPart + 'curriculum'}`, { curriculum_id: '' });
  const { resData: Subjects, refetch: reSubjects } = useFetch(`${url.apiPart + 'subjectlist'}`, { curriculum_id: Selectedcurriculum });
  const { resData: Relations, refetch: reRelations } = useFetch(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
  const { resData: TotalLevel, refetch: reTotalLevel } = useFetch(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });

  const Alert = React.forwardRef(function Alert(props, ref) { // eslint-disable-line
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    setSelectedCurriculum(event.target.value);
  };

  function handleSnackbar(status, text) {
    if (status === 'create') {
      setOpenSnackbar(true);
      setSnackbarText('create relation successfully!');
    } else if (status === 'update') {
      setOpenSnackbar(true);
      setSnackbarText('updated relation successfully!');
    } else if (status === 'delete') {
      setOpenSnackbar(true);
      setSnackbarText('deleted relation already!');
    } else if (status === 'already') {
      setOpenSnackbar(true);
      setSnackbarText('subject relation already added!');
    } else if (status === '') {
      setOpenSnackbar(true);
      setSnackbarText(text);
    }
  }

  useEffect(() => {
    reTotalLevel(`${url.apiPart + 'level'}`, { curriculum_id: Selectedcurriculum });
    reRelations(`${url.apiPart + 'relations'}`, { curriculum_id: Selectedcurriculum, distinct: 1 });
    reSubjects(`${url.apiPart + 'subjectlist'}`, { curriculum_id: Selectedcurriculum });
  }, [Selectedcurriculum]);

  useEffect(() => {
    console.log(Relations.data);
  }, [Relations]);

  useEffect(() => {
    if (TotalLevel !== undefined) {
      setRealLevel(TotalLevel.data);
      if (realLevel !== undefined) {
        const realLenght = Math.max(...realLevel.map(real => real.data));
        if (tabValue !== 1 && tabValue >= realLenght) {
          setTabValue(tabValue - 1);
        } else if (tabValue > realLenght) {
          setTabValue(1);
        }
      } else {
        setTabValue(1);
      }
    }
  }, [TotalLevel]);

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

      <PapperBlock title="Subject Relations" desc="Some text description">
        <Box sx={{
          width: '100%', display: 'flex', p: 1, m: 1
        }}>
          <FormControl variant="standard" margin="dense" sx={{ marginRight: 1 }}>
            <InputLabel htmlFor="curriculum_id">Curriculum</InputLabel>
            <Select
              variant="standard"
              value={Selectedcurriculum}
              onChange={(e) => handleChange(e)}
              name={'Selectedcurriculum'}
              id={'Selectedcurriculum'}
              defaultValue={''}>
              {Curriculums.data !== undefined ? Object.values(Curriculums.data).map((crMenu) => (
                <MenuItem key={crMenu.curriculum_id} value={crMenu.curriculum_id}>{crMenu.curriculum_name_th}({crMenu.curriculum_year})</MenuItem>
              )) : null}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue.toString()}>
            <Box sx={{
              display: 'flex', p: 1, m: 1, borderBottom: 1, borderColor: 'divider'
            }}>
              <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                {TotalLevel.statusCode === 200
                  ? Object.values(TotalLevel.data).map((lv) => (
                    lv.level === 1
                      ? <Tab key={(lv.level).toString()} label="ROOT LEVEL1" value={(lv.level).toString()} />
                      : <Tab key={(lv.level).toString()} label={`LEVEL${lv.level}`} value={(lv.level).toString()} />
                  ))
                  : <Tab key={'1'} label="ROOT LEVEL1" value={'1'} />
                }
              </TabList>
            </Box>
            {TotalLevel.statusCode === 200
              ? Object.values(TotalLevel.data).map((lv) => (
                <TabPanel key={`content ${lv.level}`} value={(lv.level).toString()}>
                  <TableRelations
                    setSnackColor={setSnackColor}
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                    handleSnackbar={handleSnackbar}
                    Selectedcurriculum={Selectedcurriculum}
                    TotalLevel={TotalLevel.data}
                    reLevel={reTotalLevel}
                    level={lv.level}
                    Relations={Relations}
                    reRelations={reRelations}
                    curriculumId={Selectedcurriculum}
                    colums={columsName}
                    rootSelection={Subjects}
                    reSubjects={reSubjects} />
                </TabPanel>
              ))
              : <TabPanel key={'content 1'} value={'1'}>
                <TableRelations
                  setSnackColor={setSnackColor}
                  tabValue={tabValue}
                  setTabValue={setTabValue}
                  handleSnackbar={handleSnackbar}
                  Selectedcurriculum={Selectedcurriculum}
                  reLevel={reTotalLevel}
                  level={1}
                  Relations={Relations}
                  reRelations={reRelations}
                  curriculumId={Selectedcurriculum}
                  colums={columsName}
                  rootSelection={Subjects}
                  reSubjects={reSubjects} />
              </TabPanel>
            }
          </TabContext>
        </Box>
        <Portal>
          <Snackbar open={openSnackbar} autoHideDuration={20000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackColor} sx={{ width: '100%' }}>
              {snackbarText}
            </Alert>
          </Snackbar>
        </Portal>
      </PapperBlock>
    </div>
  );
}

export default RelationPage;
