import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  CurriculumPage,
  FacultyPage,
  StudentCurrentGroupPage,
  SubjectPage,
  SubjectCategoryPage,
  SubjectTypePage,
  GroupTypePage,
  // RelationPage,
  // DashboardPage
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={CurriculumPage} />
        <Route exact path="/app/curriculum-page" component={CurriculumPage} />
        <Route path="/app/faculty-page" component={FacultyPage} />
        <Route path="/app/studentgroup-page" component={StudentCurrentGroupPage} />
        <Route path="/app/subject-page" component={SubjectPage} />
        <Route path="/app/subject-category" component={SubjectCategoryPage} />
        <Route path="/app/subject-type" component={SubjectTypePage} />
        <Route path="/app/subject-grouptype" component={GroupTypePage} />
        {/* <Route path="/app/subject-relations" component={RelationPage} /> */}
        {/* <Route exact path="/app/blank-page" component={BlankPage} /> */}
        {/* <Route path="/app/pages/dashboard" component={DashboardPage} /> */}
        {/* <Route path="/app/pages/form" component={Form} />
        <Route path="/app/pages/table" component={Table} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route exact path="/app/pages" component={Parent} /> */}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
