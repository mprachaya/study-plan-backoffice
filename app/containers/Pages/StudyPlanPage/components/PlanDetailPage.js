import React, { Fragment, useEffect, useState } from 'react';
import { PapperBlock } from 'dan-components';
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import useFetch from '../../../../hooks/useFetch';
import url from '../../../../api/url/partSetup';

function PlanDetailPage() {
  const [duration, setDuration] = useState([
    {
      id: 0, year: 1, semester: 1, subplan: []
    },
    {
      id: 1, year: 1, semester: 2, subplan: []
    },
    {
      id: 2, year: 2, semester: 1, subplan: []
    },
    {
      id: 3, year: 2, semester: 2, subplan: []
    },
    {
      id: 4, year: 3, semester: 1, subplan: []
    },
    {
      id: 5, year: 3, semester: 2, subplan: []
    },
    {
      id: 6, year: 4, semester: 1, subplan: []
    },
    {
      id: 7, year: 4, semester: 2, subplan: []
    },
  ]);
  const [subPlanData, setSubPlanData] = useState([]);

  const { resData: AllSubPlan } = useFetch(`${url.apiPart + 'substudy'}`, { study_plan_id: JSON.parse(localStorage.getItem('study_plan_id')), sub_study_semester: '', sub_study_year: '' }); // select all subplan by studyplan to make add menu filter

  useEffect(() => {
    if (AllSubPlan.data !== undefined) {
      setSubPlanData(AllSubPlan.data);
    }
  }, [AllSubPlan]);

  useEffect(() => {
    console.log(subPlanData);
    if (subPlanData) {
      const resultFilter = duration.map(du => subPlanData.filter(sp => du.year === sp.sub_study_year && du.semester === sp.sub_study_semester)
        .map(filterPlan => filterPlan));
      // duration.forEach(index => { duration[index].subplan = resultFilter[index]; });
      const updateSubplan = duration.map((obj, index) => (
        obj.id === index && { ...obj, subplan: resultFilter[index] }));
      setDuration(updateSubplan);
      // duration.forEach((val, index) => { duration[index].subplan = resultFilter[index]; }); // move result data to duration state
    }
  }, [subPlanData]);

  return (
    <div>
      <PapperBlock title="Plan Detail" desc="Some text description">
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Box
              sx={{
                display: 'flex',
                m: 2,
                justifyContent: 'center',
              }}>
              <TableContainer component={Paper}>
                {duration ? duration.map((d) => (
                  <Table key={d.id} sx={{ minWidth: 650 }} size="small">
                    <tbody>
                      <TableRow>
                        <TableCell colSpan={3} sx={{ textAlign: 'center' }}>ปี{d.year} เทอม{d.semester}</TableCell>
                      </TableRow>
                      <TableRow sx={{ margin: 2, mx: 2 }}>
                        <TableCell align='left' sx={{ width: 200 }}>
                          <Typography fontSize={14} fontWeight={'bold'}>code</Typography>
                        </TableCell>
                        <TableCell align='left' >
                          <Typography fontSize={14} fontWeight={'bold'}>subject name</Typography>
                        </TableCell>
                        <TableCell align='right' sx={{ pr: 8 }}>
                          <Typography fontSize={14} fontWeight={'bold'}>credit</Typography>
                        </TableCell>
                      </TableRow>
                      {d.subplan ? d.subplan.map((da, index) => (
                        <Fragment key={da.sub_study_id} >
                          <TableRow sx={{ margin: 2, mx: 2 }}>
                            <TableCell align='left'>
                              <Typography fontSize={14}>{da.subject_code}</Typography>
                            </TableCell>
                            <TableCell align='left'>
                              <Typography fontSize={14}>{da.subject_name_th}</Typography>
                            </TableCell>
                            <TableCell align='right' sx={{ pr: 10 }}>
                              <Typography fontSize={14}>{da.credit_qty}</Typography>
                            </TableCell>
                          </TableRow>
                          {d.subplan.length === index + 1 && <TableRow sx={{ margin: 2, mx: 2 }}><TableCell align='left' sx={{ fontWeight: 'bold' }}>total</TableCell><TableCell colSpan={2} align='right' sx={{ pr: 10, fontWeight: 600, color: 'steelblue' }}>{d.subplan.reduce((prev, current) => prev + current.credit_qty, 0)}</TableCell></TableRow>}
                        </Fragment>
                      ))
                        : <TableRow sx={{ margin: 2, mx: 2 }}>
                          <TableCell align='left' colSpan={3}>
                            <Typography fontSize={14}>ไม่มีแผนการเรียนแนะนำ</Typography>
                          </TableCell>
                        </TableRow>
                      }
                    </tbody>
                  </Table>
                ))
                  : 'loading'
                }
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </PapperBlock>
    </div>
  );
}

export default PlanDetailPage;
