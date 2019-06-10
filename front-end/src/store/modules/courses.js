import localForage from 'localforage';
import { Content } from 'yet-unnamed-text-learning-app-core';
import generateUUID from '@/utils/generateUUID';

const state = {
  courseList: [],
  courses: {},
};

const getters = {
  list: (state) => {
    return state.courseList;
  },

  courses: (state) => {
    return state.courses;
  },
};

const mutations = {
  pushCourse(state, course) {
    state.courseList = [course, ...state.courseList];
  },

  deleteCourse(state, uuid) {
    state.courseList = state.courseList.filter(course =>
      course.uuid !== uuid  
      );
    state.courses[uuid] = undefined;
  },
  
  setCourses(state, courses) {
    state.courseList = courses;
  },

  setCourse(state, { course, uuid}) {
    state.courses[uuid] = course;
  },

  updateCourseDetails(state, details) {
    const course = state.courseList.find(({uuid}) => uuid === details.uuid);
    if (course) {
      for (const detail in details) {
        course[detail] = details[detail];
      }
    }
  },

  updateProgress(state, { course, uuid }) {
    const progress = Content.getProgress(course);
    const details = state.courseList.find((c) => c.uuid === uuid)
    details.updatedAt = Date.now();
    details.progress = progress;
  },

  resetCourse(state, uuid) {
    state.courses[uuid] = Content.stringify(Content.reset(Content.parse(state.courses[uuid])));
  },
};

const actions = {
  addCourse({ commit }, { course, details }) {
    const stringifiedCourse = Content.stringify(course);
    details.updatedAt = Date.now();
    localForage.setItem(`course-${details.uuid}`, stringifiedCourse).then(() => {
      commit('pushCourse', details);
      localForage.setItem('courses', state.courseList).then(() => {
        commit('setCourse', { course: stringifiedCourse, uuid: details.uuid });
      });
    });
  },

  deleteCourse({ commit }, uuid) {
    localForage.removeItem(`course-${uuid}`).then(() => {
      commit('deleteCourse', uuid);
      localForage.setItem('courses', state.courseList);
    });
  },

  refreshCourses({ commit }) {
    localForage.getItem('courses').then(courses => {
      commit('setCourses', courses || []);
      if (courses) {
        for (const courseDetails of courses) {
          localForage.getItem(`course-${courseDetails.uuid}`).then(course => {
            commit('setCourse', { course, uuid: courseDetails.uuid });
          });
        }
      }
    });
  },

  updateCourse({ commit }, { course, uuid }) {
    const stringifiedCourse = Content.stringify(course);
    localForage.setItem(`course-${uuid}`, stringifiedCourse);
    commit('setCourse', { course: stringifiedCourse, uuid });
    commit('updateProgress', { course, uuid });
    localForage.setItem('courses', state.courseList);
  },

  updateCourseDetails({ commit }, details) {
    commit('updateCourseDetails', details);
    localForage.setItem('courses', state.courseList);
  },

  resetCourse({ commit, dispatch }, uuid) {
    commit('resetCourse', uuid);
    localForage.setItem(`course-${uuid}`, state.courses[uuid]);
    dispatch('updateCourseDetails', { uuid, progress: 0 });
  },

  importCourse({ commit }, course) {
    const newUUID = generateUUID();
    course.details.uuid = newUUID;
    course.details.updatedAt = Date.now();
    commit('setCourse', { course: course.content, uuid: newUUID });
    localForage.setItem(`course-${newUUID}`, state.courses[newUUID]);
    commit('pushCourse', course.details);
    localForage.setItem('courses', state.courseList);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}