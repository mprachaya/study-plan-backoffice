import React, { useState } from 'react';
// import { useFetch } from '../../../hooks/useFetch';
// import url from '../../../api/url/partSetup';
import
{
  Box,
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import { PapperBlock } from 'dan-components';
import { useLocation } from 'react-router-dom'; // สำหรับดึงค่าที่ฝากไว้ใน state จากคำสั่ง useHistory
import TableBody from '@mui/material/TableBody';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import AlertDialog from '../../../../components/DialogModal/AlertDialog';

function StructurePage() {
  const location = useLocation();
  const curriculumName = location.state.curriculum_name_th;
  const [open, setOpen] = useState(false);
  const [subjectType, setSubjecType] = useState('test');

  const handleOpenDialog = (text) => {
    setSubjecType(text);
    setOpen(true);
  };

  return (
    <div>
      <PapperBlock title="Curriculums (หลักสูตร)" desc="Some text description">
        <Typography sx={{ mb: 2 }}>หลักสูตร {curriculumName}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '150vh',
          }}>
          {/* หมวดวิชาศึกษาทั่วไป, หมวดวิชาเฉพาะ */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              minWidth: '400px',
            }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                m: 2
              }}>
              <Typography variant='body2' color='grey'>Category</Typography>
              <Typography style={{ lineHeight: '20px' }} variant='h6' fontWeight='bold' >หมวดวิชาศึกษาทั่วไป</Typography>
              <TableContainer>
                <Table
                  sx={{
                    minWidth: 200,
                    boxShadow: 1,
                    width: '80%',
                    my: 2,
                  }}
                  size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">subject type</TableCell>
                      <TableCell align="center">total credit</TableCell>
                      <TableCell align="center"><CreateRoundedIcon/></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">name</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center"><Button size='small' onClick={() => handleOpenDialog('test')}>edit</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">name</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                m: 2
              }}>
              <Typography variant='body2' color='grey'>Category</Typography>
              <Typography style={{ lineHeight: '20px' }} variant='h6' fontWeight='bold' >หมวดวิชาเฉพาะ</Typography>
              <TableContainer>
                <Table
                  sx={{
                    minWidth: 200,
                    boxShadow: 1,
                    width: '80%',
                    my: 2,
                  }}
                  size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">subject type</TableCell>
                      <TableCell align="center">total credit</TableCell>
                      <TableCell align="center"><CreateRoundedIcon/></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">name</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">name</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          {/* หมวดวิชาเลือกเสรี */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              minWidth: '400px',
            }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                m: 2
              }}>
              <Typography variant='body2' color='grey'>Category</Typography>
              <Typography style={{ lineHeight: '20px' }} variant='h6' fontWeight='bold' >หมวดวิชาเลือกเสรี</Typography>
              <TableContainer>
                <Table
                  sx={{
                    minWidth: 200,
                    boxShadow: 1,
                    width: '80%',
                    m: 2,
                  }}
                  size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">total credit</TableCell>
                      <TableCell align="center"><CreateRoundedIcon/></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">0</TableCell>
                      <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
        <AlertDialog
          text='test'
          open={open}
          header={subjectType}
          addBtn={true}
          handleClose={() => setOpen(false) }>
          <TableContainer>
            <Table
              sx={{
                minWidth: 200,
                boxShadow: 1,
                width: '90%',
                m: 2,
                ml: 3,
              }}
              size="small">
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ width: 200 }}>group type</TableCell>
                  <TableCell align="center" sx={{ width: 100 }}>total credit</TableCell>
                  <TableCell align="center"><CreateRoundedIcon/></TableCell>
                  <TableCell align="center"><DeleteForeverRoundedIcon/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                  <TableCell align="center"><Button size='small' color='error'>delete</Button></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center"><Button size='small'>edit</Button></TableCell>
                  <TableCell align="center"><Button size='small' color='error'>delete</Button></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AlertDialog>
      </PapperBlock>
    </div>
  );
}

export default StructurePage;
