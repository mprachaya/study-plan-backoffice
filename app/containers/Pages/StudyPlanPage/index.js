import React, { useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import TbPagination from './components/TbPagination';
import useFetch from '../../../hooks/useFetch';
import url from '../../../api/url/partSetup';

function StudyPlanPage() {
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

  // const curriculumMenu = result?.map(selection => selection.curriculum_name_th + ' ' + selection.curriculum_year);
  // const curriculumValue = result?.map(selection => selection.curriculum_id);

  // const dummyTest = [
  //   {
  //     study_plan_id: 1,
  //     curriculum_name: 'Test Curriculum',
  //     stuidy_plan_name: 'Test plan',
  //     study_plan_ver: 1,
  //   },
  //   {
  //     study_plan_id: 2,
  //     curriculum_name: 'Test Curriculum',
  //     stuidy_plan_name: 'Test plan',
  //     study_plan_ver: 2,
  //   },
  // ];

  // useEffect(() => {
  //   result?.map((value) => console.log('curriculumName : ' + value.curriculum_id ));
  // }, [result]);

  // useEffect(() => {
  //   console.log(curriculumValue);
  // }, [curriculumValue]);

  useEffect(() => {
    console.log(Curriculum.data);
  }, [Curriculum]);

  return (
    <div>
      <PapperBlock
        title='Study Plans'
        desc='Some text description'>
        <TbPagination
          colums={columsName}
          rows={StudyPlans.data}
        />
        {/* <TbPagination colums={columsName} rows={Categories} openFormUpdate={handleOpenFormUpdate} openAlertDialog={handleOpenAlertDialog} openFormCreate={handleOpenCreateDialog} searchData={reFetchData} /> */}
      </PapperBlock>
    </div>
  );
}

export default StudyPlanPage;
