import React, { useEffect, useState } from 'react';
import { PapperBlock } from 'dan-components';
import {
  Box,
  Button,
  IconButton,
  ListItem,
  MenuList,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../../../../hooks/useFetch';
import url from '../../../../api/url/partSetup';

function PlanManagement() {
  const planName = JSON.parse(localStorage.getItem('plan_name'));// Get plan name
  const planId = JSON.parse(localStorage.getItem('study_plan_id'));// Get plan id
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [tabValue, setTabValue] = useState(1);
  const [menuSubjects, setMenuSubjects] = useState([]);
  const [subStudy, setSubStudy] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [dynamicTab, setDynamicTab] = useState(1);
  const [totalCredit, setTotalCredit] = useState(0);
  const { resData: Subjects } = useFetch(`${url.apiPart + 'subjects'}`, { curriculum_id: JSON.parse(localStorage.getItem('curriculum_id')), subject_id: '' }); // for add selection
  const { resData: SubPlan, refetch: reSubPlan } = useFetch(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: 1, sub_study_year: 1 }); // select subplan by semester and year by studyplan
  const { resData: AllSubPlan, refetch: reAllSubPlan } = useFetch(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: '', sub_study_year: '' }); // select all subplan by studyplan to make add menu filter
  // const electiveSubjects = [
  //   {id: 200, name: 'วิชาชีพเลือก1'},
  //   {id: 201, name: 'วิชาชีพเลือก2'},
  //   {id: 202, name: 'วิชาชีพเลือก3'},
  //   {id: 203, name: 'วิชาชีพเลือก4'},
  // ]
  const freeSubjects = [
    { id: 204, name: 'วิชาเลือกเสรี1' },
    { id: 205, name: 'วิชาเลือกเสรี2' },
  ];

  const handleAddSubStudy = (id) => {
    axios.post(url.apiPart + 'substudy_create',
      {
        study_plan_id: planId,
        subject_id: id,
        sub_study_semester: semester,
        sub_study_year: year
      }).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      reSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: semester, sub_study_year: year });
      reAllSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: '', sub_study_year: '' });
    });
  };

  const addSpecialSubject = (mode) => {
    if (mode === 'freesubject') {
      // check free subject in subplan
      const checkDuplicate = freeSubjects.filter(fs => subStudy.find(ss => ss.subject_id === fs.id));
      console.log('checkDuplicate: ', checkDuplicate);
      console.log('freeSubjects: ', freeSubjects);
      if (checkDuplicate.length > 0 && checkDuplicate.length !== freeSubjects.length) {
        const filterDuplicate = freeSubjects.filter(cd => checkDuplicate.find(fs2 => fs2.id !== cd.id));
        console.log('filterDuplicate: ', filterDuplicate);
        // insert first object of filterDuplicate
        // handleAddSubStudy(filterDuplicate[0].id);
        // console.log(filterDuplicate[0].id);
      } else {
        console.log('insert first freesubject');
        // handleAddSubStudy(freeSubjects[0].id);
      } if (checkDuplicate.length === freeSubjects.length) {
        console.log('show warning modal!');
      }
      // if not have any free subject sent first free subject else sent next free subject id for insert
    } else if (mode === 'electivesubject') {
      console.log('test');
    }
  };

  const handleDeleteSubStudy = (subId) => {
    axios.post(url.apiPart + 'substudy_delete',
      {
        sub_study_id: subId,
      }).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      reSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: semester, sub_study_year: year });
      reAllSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: '', sub_study_year: '' });
    });
  };

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    setTextSearch(e.target.value);
  };

  const getCurrentPosition = (positionYear, positionSemester, value) => {
    setYear(positionYear);
    setSemester(positionSemester);
    setDynamicTab(value);
  };

  useEffect(() => {
    reSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: semester, sub_study_year: year });
  }, [tabValue]);

  useEffect(() => {
    if (Subjects.data !== undefined) {
      console.log('Subjects: ', Subjects.data);
      if (AllSubPlan.data !== undefined) {
        const filterMenu = (Subjects.data).filter(raw => !(AllSubPlan.data).find((data) => raw.subject_id === data.subject_id));
        console.log('AllSubPlan: ', AllSubPlan.data);
        console.log('filterMenu: ', filterMenu);
        setMenuSubjects(filterMenu);
      }
    }
  }, [Subjects, AllSubPlan]);

  useEffect(() => {
    if (SubPlan !== undefined) {
      console.log('Year: ' + year + ' Semester: ' + semester);
      setSubStudy(SubPlan.data);
    }
  }, [SubPlan]);

  useEffect(() => {
    if (subStudy !== undefined) {
      console.log(subStudy);
      setTotalCredit(subStudy.reduce((prev, current) => prev + current.credit_qty, 0));
      // setTotalCredit(1);
    } else {
      setTotalCredit(0);
    }
  }, [subStudy]);

  useEffect(() => {
    console.log(totalCredit);
  }, [totalCredit]);

  return (
    <PapperBlock title="Plan Management" desc={ 'หน้าจัดการแผนการเรียนแนะนำ มคอ.2' }>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>
        <Typography fontWeight={'bold'} align='center'
          sx={{
            opacity: '90%'
          }}>
          {planName}
        </Typography>
        <TabContext value={tabValue.toString()}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              m: 1,
              borderBottom: 1,
              borderColor: 'divider'
            }}>
            <TabList
              TabIndicatorProps={{
                style: { transition: 'none', display: 'none' }
              }}
              onChange={handleChangeTabs}>
              <Tab onClick={() => getCurrentPosition(1, 1, 1)} key={1} label={'ปี 1/เทอม1'} value={(1).toString()}/>
              <Tab onClick={() => getCurrentPosition(1, 2, 2)} key={2} label={'ปี 1/เทอม2'} value={(2).toString()}/>
              <Tab onClick={() => getCurrentPosition(2, 1, 3)} key={3} label={'ปี 2/เทอม1'} value={(3).toString()}/>
              <Tab onClick={() => getCurrentPosition(2, 2, 4)} key={4} label={'ปี 2/เทอม2'} value={(4).toString()}/>
              <Tab onClick={() => getCurrentPosition(3, 1, 5)} key={5} label={'ปี 3/เทอม1'} value={(5).toString()}/>
              <Tab onClick={() => getCurrentPosition(3, 2, 6)} key={6} label={'ปี 3/เทอม2'} value={(6).toString()}/>
              <Tab onClick={() => getCurrentPosition(4, 1, 7)} key={7} label={'ปี 4/เทอม1'} value={(7).toString()}/>
              <Tab onClick={() => getCurrentPosition(4, 2, 8)} key={8} label={'ปี 4/เทอม2'} value={(8).toString()}/>
            </TabList>
          </Box>
          <TabPanel key={dynamicTab} value={(dynamicTab).toString()}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                height: '450px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 4,
                  m: 2,
                  width: '400px',
                  boxShadow: 4,
                  borderRadius: 2,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '40px',
                  }}>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      color: 'black',
                      opacity: '80%',
                      my: 2,
                      ml: 2,
                    }}
                  >
                    Subjects
                  </Typography>
                  <Box>
                    <SearchIcon
                      sx={{
                        my: 2,
                        mr: 1.5,
                        color: 'grey',
                        fontSize: 22
                      }}/>
                    <TextField
                      size='small'
                      variant= "filled"
                      label= "code, name"
                      value={textSearch}
                      onChange={(e) => handleChange(e)}
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => setTextSearch('')}>
                            {textSearch !== '' ? <ClearOutlinedIcon/> : ''}
                          </IconButton>
                        )
                      }}
                      sx={{
                        width: '160px',
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    overflow: 'auto',
                    my: 2,
                  }}>
                  <MenuList>
                    {menuSubjects ? menuSubjects.filter(raw => raw.subject_code.includes(textSearch) || raw.subject_name_th.includes(textSearch)).map((menu) => (
                      <ListItem key={menu.subject_id}>
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            boxShadow: 1,
                            p: 1.5,
                          }}>
                          <Typography>{menu.subject_code + ' ' + menu.subject_name_th}</Typography>
                          <Tooltip title="เพิ่มวิชาในแผน">
                            <Button onClick={() => handleAddSubStudy(menu.subject_id)}>+</Button>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    ))
                      : (
                        <ListItem>
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between'
                            }}>
                            <Typography>ไม่มีรายวิชาในหลักสูตร</Typography>
                          </Box>
                        </ListItem>
                      )
                    }
                  </MenuList>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  m: 2,
                  width: '600px',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <Typography fontWeight={'bold'} fontSize={14} sx={{ width: 100 }}>Plan Lists</Typography>
                  <Typography mx={2} fontSize={14} sx={{ width: 100 }}>Total {totalCredit} credit</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '70%' }}>
                    <Tooltip title="เพิ่มวิชาพิเศษ">
                      <Button onClick={() => addSpecialSubject('freesubject')} sx={{ mx: 1 }} color='info' variant='outlined'>วิชาเสรี(0/2)</Button>
                    </Tooltip>
                    <Tooltip title="เพิ่มวิชาพิเศษ">
                      <Button sx={{ mx: 1 }} color='info' variant='contained'>วิชาเลือก(0/4)</Button>
                    </Tooltip>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                  }}>
                  <TableContainer>
                    <Table>
                      <tbody>
                        <TableRow sx={{ margin: 2 }}>
                          <TableCell align='left'>
                            <Typography fontSize={14} fontWeight={'bold'}>REMOVE</Typography>
                          </TableCell>
                          <TableCell align='left' sx={{ width: 80 }}>code</TableCell>
                          <TableCell align='left'>name</TableCell>
                          <TableCell align='left' sx={{ width: 80 }}>credit</TableCell>
                        </TableRow>
                        {subStudy ? subStudy.map((substd) => (
                          <TableRow key={substd.sub_study_id} sx={{ margin: 2 }}>
                            <TableCell align='left'>
                              <Button onClick={() => handleDeleteSubStudy(substd.sub_study_id)} variant='outlined'>X</Button>
                            </TableCell>
                            <TableCell align='left' sx={{ width: 120 }}>{substd.subject_code}</TableCell>
                            <TableCell align='left'>{substd.subject_name_th}</TableCell>
                            <TableCell align='left'>{substd.credit_qty}</TableCell>
                          </TableRow>
                        ))
                          : <TableRow><TableCell colSpan={3}>ไม่มีรายวิชาในแผนแนะนำ</TableCell></TableRow>
                        }
                      </tbody>
                    </Table>
                  </TableContainer>
                  {/* } */}
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </PapperBlock>
  );
}

// PlanManagement.propTypes = {
//   planName: PropTypes.string.isRequired,
// };

export default PlanManagement;
