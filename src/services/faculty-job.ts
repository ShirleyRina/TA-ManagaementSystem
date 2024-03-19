import axios from 'axios';
const JOBS_API_URL = 'http://localhost:9000/faculty-jobs';
const QUERY_JOBS_API_URL = 'http://localhost:9000/jobs/faculty';
import { backendURL } from '../config';
const BASE_API_URL: string | undefined = backendURL + '/api/';
const token = localStorage.getItem('token');

const getJobs = () => {
  // henry: move localStorage import into this function
  // to avoid error when user login was not faculty the json
  // string was empty.
  const userString = localStorage.getItem('user') ?? '';
  const user = JSON.parse(userString);
  return axios
    .get(QUERY_JOBS_API_URL + '/' + user.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getJobsByFacultyID = (facultyId: number) => {
  const JOBS_API_BY_FACULTY = 'http://localhost:9000/jobs/faculty/' + facultyId;

  return axios
    .get(JOBS_API_BY_FACULTY)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//get one job from id passed as parameter
const getOneJob = (id: number) => {
  return axios
    .get(JOBS_API_URL + '/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
const postJob = (job: {
  title: string;
  courseId: number;
  courseSchedule: string;
  totalHoursPerWeek: number;
  maxNumberOfTAs: number;
  requiredCourses: string;
  requiredSkills: string;
  TAStats: string;
  notes?: string;
  deadlineToApply: Date;
  facultyId: number;
}) => {
  const CREATE_JOB_API = 'http://localhost:9000/jobs';
  return axios
    .post(CREATE_JOB_API, job)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};
const getFacultyJobs = (id: number) => {
  console.log(token);
  return axios
    .get(JOBS_API_URL + '/faculty/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
//update job from id passed as parameter
const updateJob = (
  id: number,
  job: {
    title: string;
    courseId: number;
    courseSchedule: string;
    totalHoursPerWeek: number;
    maxNumberOfTAs: number;
    requiredCourses: string;
    requiredSkills: string;
    TAStats: string;
    notes?: string;
    deadlineToApply: Date;
    facultyId: number;
  }
) => {
  return axios
    .put(JOBS_API_URL + '/edit/' + id, job)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
};

const getPerformances = () => {
  const userString = localStorage.getItem('user') ?? '';
  const user = JSON.parse(userString);
  const PERFORMANCES_API_URL = `${BASE_API_URL}/performances/faculty/${user.id}`;

  return axios
    .get(PERFORMANCES_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const updatePerformance = (
  id: number,
  performance: {
    employeeName: string;
    jobId: number;
    performanceMetrics: string;
    evaluation: string;
  }
) => {
  const UPDATE_PERFORMANCE_API_URL = `${BASE_API_URL}/performances/edit/${id}`;

  return axios
    .put(UPDATE_PERFORMANCE_API_URL, performance, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });
};

const FacultyJobService = {
  getJobsByFacultyID,
  getJobs,
  getOneJob,
  postJob,
  getFacultyJobs,
  updateJob,
  getPerformances,
  updatePerformance,
};

export default FacultyJobService;
