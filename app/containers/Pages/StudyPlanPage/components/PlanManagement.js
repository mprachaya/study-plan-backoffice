import React, { useState } from 'react';
import { PapperBlock } from 'dan-components';
import {
  Box,
  Button,
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
import { TabContext, TabList, TabPanel } from '@mui/lab';
// import PropTypes from 'prop-types';

function PlanManagement() {
  const planName = localStorage.getItem('plan_name');// Get plan name
  const initialValue = JSON.parse(planName);//  Remove double quote
  const [tabValue, setTabValue] = useState(1);

  const handleChangeTabs = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <PapperBlock title="Plan Management" desc={ initialValue }>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          p: 6,
          display: 'flex',
          flexDirection: 'column'
        }}>
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
              <Tab key={1} label='test1' value={(1).toString()}/>
              <Tab key={2} label='test2' value={(2).toString()}/>
              <Tab key={3} label='test3' value={(3).toString()}/>
              <Tab key={4} label='test4' value={(4).toString()}/>
              <Tab key={5} label='test5' value={(5).toString()}/>
              <Tab key={6} label='test6' value={(6).toString()}/>
              <Tab key={7} label='test7' value={(7).toString()}/>
              <Tab key={8} label='test8' value={(8).toString()}/>
            </TabList>
          </Box>
          <TabPanel key={'content 1'} value={(1).toString()}>
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
                      fontSize: 14,
                      color: 'black',
                      opacity: '80%',
                      m: 1,
                    }}
                  >
                    Subjects
                  </Typography>
                  <TextField
                    variant= "outlined"
                    label= "code, name"
                    sx={{
                      width: '160px',
                      borderRadius: 2,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    overflow: 'auto',
                    my: 2,
                  }}>
                  <MenuList>
                    <ListItem >
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>ENGCE101 NAME....</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                        <Typography>test</Typography>
                        <Button>+</Button>
                      </Box>
                    </ListItem>
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
                  <TableContainer>
                    <Table>
                      <tbody>
                        <TableRow sx={{ margin: 2 }}>
                          <TableCell align='left'>
                            <Typography fontSize={14} fontWeight={'bold'}>REMOVE</Typography>
                          </TableCell>
                          <TableCell align='left'>code</TableCell>
                          <TableCell align='left'>name</TableCell>
                          <TableCell align='left'>credit</TableCell>
                          <TableCell align='left'>group</TableCell>
                        </TableRow>
                        <TableRow sx={{ margin: 2 }}>
                          <TableCell align='left'>
                            <Button variant='outlined'>X</Button>
                          </TableCell>
                          <TableCell align='left'>test</TableCell>
                          <TableCell align='left'>test</TableCell>
                          <TableCell align='left'>test</TableCell>
                          <TableCell align='left'>test</TableCell>
                        </TableRow>
                      </tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel key={'content 2'} value={(2).toString()}>
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
