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
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../../../../hooks/useFetch';
import url from '../../../../api/url/partSetup';
// import PropTypes from 'prop-types';

function PlanManagement() {
  const planName = JSON.parse(localStorage.getItem('plan_name'));// Get plan name
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [tabValue, setTabValue] = useState(1);
  const [menuSubjects, setMenuSubjects] = useState([]);
  const [subStudy, setSubStudy] = useState([]);
  const [textSearch, setTextSearch] = useState('');
  const [isLoading, setIsLoading] = useState(1);
  const page = [
    {
      key: 'content 1', pageValue: 1, year: 1, semester: 1
    },
    {
      key: 'content 2', pageValue: 2, year: 1, semester: 2
    },
    {
      key: 'content 3', pageValue: 3, year: 2, semester: 1
    },
    {
      key: 'content 4', pageValue: 4, year: 2, semester: 2
    },
    {
      key: 'content 5', pageValue: 5, year: 3, semester: 1
    },
    {
      key: 'content 6', pageValue: 6, year: 3, semester: 2
    },
    {
      key: 'content7', pageValue: 7, year: 4, semester: 1
    },
    {
      key: 'content 8', pageValue: 8, year: 4, semester: 2
    }];
  const { resData: Subjects } = useFetch(`${url.apiPart + 'subjects'}`, { curriculum_id: JSON.parse(localStorage.getItem('curriculum_id')), subject_id: '' });
  const { resData: SubPlan, refetch: reSubPlan } = useFetch(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: 1, sub_study_year: 1 });

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    setTextSearch(e.target.value);
  };

  const getCurrentPosition = (positionYear, positionSemester) => {
    setYear(positionYear);
    setSemester(positionSemester);
  };

  useEffect(() => {
    setIsLoading(1);
  }, []);

  useEffect(() => {
    reSubPlan(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: semester, sub_study_year: year });
  }, [tabValue]);

  useEffect(() => {
    if (Subjects !== undefined) {
      console.log(Subjects.data);
      setMenuSubjects(Subjects.data);
    }
  }, [Subjects]);

  useEffect(() => {
    if (SubPlan !== undefined) {
      setIsLoading(1);
      // console.log(SubPlan.data);
      console.log('Year: ' + year + ' Semester: ' + semester);
      setSubStudy(SubPlan.data);
    }
  }, [SubPlan]);

  useEffect(() => {
    console.log(subStudy);
  }, [subStudy]);

  // loading effect timeout
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(0);
      }, 1000);
    }
  }, [isLoading]);

  return (
    <PapperBlock title="Plan Management" desc={ 'หน้าจัดการแผนการเรียนแนะนำ มคอ.2' }>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          p: 6,
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
              onChange={handleChangeTabs}>
              {page.map((m) => (
                <Tab onClick={() => getCurrentPosition(m.year, m.semester)} key={m.pageValue} label={`ปี ${m.year}/เทอม${m.semester}`} value={(m.pageValue).toString()}/>
              ))}
            </TabList>
          </Box>
          {page.map((tab) => (
            <TabPanel key={tab.key} value={tab.pageValue.toString()}>
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
                            <Button>+</Button>
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
                    <Typography fontWeight={'bold'} fontSize={14}>Plan Lists</Typography>
                    <Typography mx={2} fontSize={14}>Total 0 credit</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                    }}>
                    {isLoading
                      ? <Typography>is Loading...</Typography>
                      : <TableContainer>
                        <Table>
                          <tbody>
                            <TableRow sx={{ margin: 2 }}>
                              <TableCell align='left'>
                                <Typography fontSize={14} fontWeight={'bold'}>REMOVE</Typography>
                              </TableCell>
                              <TableCell align='left'>code</TableCell>
                              <TableCell align='left'>name</TableCell>
                              <TableCell align='left'>credit</TableCell>
                            </TableRow>
                            {subStudy ? subStudy.map((substd) => (
                              <TableRow key={substd.sub_study_id} sx={{ margin: 2 }}>
                                <TableCell align='left'>
                                  <Button variant='outlined'>X</Button>
                                </TableCell>
                                <TableCell align='left'>{substd.subject_code}</TableCell>
                                <TableCell align='left'>{substd.subject_name_th}</TableCell>
                                <TableCell align='left'>{substd.credit_qty}</TableCell>
                              </TableRow>
                            ))
                              : <TableRow><TableCell colSpan={3}>ยังไม่มีรายวิชาในแผนการเรียนแนะนำ</TableCell></TableRow>
                            }
                          </tbody>
                        </Table>
                      </TableContainer>
                    }
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          ))}
          {/* <TabPanel key={'content 2'} value={(2).toString()}>
            <Box
              sx={{
                display: 'flex',
                p: 2,
                m: 2,
              }}
            >
              <Typography>test2</Typography>
            </Box>
          </TabPanel>
          <TabPanel key={'content 3'} value={(3).toString()}>
            <Typography>test3</Typography>
          </TabPanel>
          <TabPanel key={'content 4'} value={(4).toString()}>
            <Typography>test4</Typography>
          </TabPanel>
          <TabPanel key={'content 5'} value={(5).toString()}>
            <Typography>test5</Typography>
          </TabPanel>
          <TabPanel key={'content 6'} value={(6).toString()}>
            <Typography>test6</Typography>
          </TabPanel>
          <TabPanel key={'content 7'} value={(7).toString()}>
            <Typography>test7</Typography>
          </TabPanel>
          <TabPanel key={'content 8'} value={(8).toString()}>
            <Typography>test8</Typography>
          </TabPanel> */}
        </TabContext>
      </Box>
    </PapperBlock>
  );
}

// PlanManagement.propTypes = {
//   planName: PropTypes.string.isRequired,
// };

export default PlanManagement;
