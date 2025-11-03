"use client";
// BaseUrlContext shim: dynamically require to avoid alias/typing issues
let useBaseURL: () => { baseURL: string };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ctx = require("@/contexts/BaseUrlContext");
  if (ctx && typeof ctx.useBaseURL === "function") {
    useBaseURL = ctx.useBaseURL;
  } else {
    useBaseURL = () => ({ baseURL: "" });
  }
} catch (e) {
  useBaseURL = () => ({ baseURL: "" });
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import { mockCourses, mockCoursesWithAssignments, mockLevels } from "./mock-db";
// Toast shim: try dynamic require, fall back to console
let Toast: { show: (msg: string) => void } = { show: (msg: string) => console.log(msg) };
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("react-native-root-toast");
  Toast = mod?.default ? mod.default : mod;
} catch (e) {
  // noop: console fallback already set
}

export type Course = {
  _id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  minimumPassScore: number;
  files: { type: "document" | "video" | "image"; url: string }[];
  questionsAndOptions: { question: string; options: string[] }[];
  answers: string[][];
  assessmentDuration: number;
  facilityId?: string;
};

export type CourseAssignment = {
  userId: string;
  courseId: string;
  expiresAt: string | "open";
  completed: boolean;
  score: number;
  attempts: number;
  maxAttempts: number;
};

export type CourseWithCourseAssignment = Course & {
  courseAssignment: CourseAssignment | null;
};

export type Chemical = {
  name: string;
  quantity: number;
  unit: string;
  sdsDocument: string;
  usageThreshold: string;
  concentration: string;
  unitOfMeasurement: string;
  facility: string;
};

export type Level = {
  hierachy: number;
  requiredCourses: Course[];
  chemicalsHandleAble: Chemical[];
  percentCompleted: number;
};

const useLMS = () => {
  const { baseURL } = useBaseURL();
  const isMock = !baseURL;

  const [userCourses, setUserCourses] = useState<CourseWithCourseAssignment[]>(
    []
  );
  const [course, setCourse] = useState<Course | null>(null);
  const [userLevel, setUserLevel] = useState<Level | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(false);

  const extractErrorMessage = (err: any) => {
    return err?.response?.data?.message || "An error occurred";
  };

  const handleRequest = async (
    requestFunc: () => Promise<any>,
    successMessage: string
  ) => {
    setLoading(true);
    try {
      const response = await requestFunc();
      Toast.show(successMessage);
      setLoading(false);
      return response.data.data;
    } catch (e) {
      const errMsg = extractErrorMessage(e);
      Toast.show(errMsg);
      setLoading(false);
      throw new Error(errMsg);
    }
  };

  /**
   * Fetches a course by its ID.
   * @param {string} courseId - The ID of the course to fetch.
   */
  const getCourseById = async (courseId: string) => {
    setLoading(true);
    if (isMock) {
      try {
        const found = (mockCourses || []).find((c: any) => c._id === courseId) || null;
        setCourse(found);
      } finally {
        setLoading(false);
      }
      return;
    }
    const access_token = await AsyncStorage.getItem("auth-token");
    try {
      const path = `/v1/lms/course/${courseId}`;
      const response = await axios.get(`${baseURL}${path}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setCourse(response.data.data);
    } catch (e) {
      Toast.show(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Submits an assessment for a course.
   * @param {object} isForLevelAssessment - signifies that the current course in talk is required for a level.
   * @param {string} courseId - The ID of the course.
   */
  const startAssessment = async (
    courseId: string,
    isForLevelAssessment: boolean
  ) => {
    if (isMock) {
      Toast.show("Assessment started successfully");
      return { ok: true } as any;
    }
    const requestFunc = async () => {
      const access_token = await AsyncStorage.getItem("auth-token");
      const path = "/v1/lms/start-assessment";
      return await axios.post(
        `${baseURL}${path}`,
        { courseId, isForLevelAssessment },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
    };
    return handleRequest(requestFunc, "Assessment started successfully");
  };

  const submitAssessment = async (assessmentData: {
    answers: Array<Array<string>>;
    courseId: string;
    isForLevelAssessment?: boolean;
  }) => {
    if (isMock) {
      Toast.show("Assessment submitted successfully");
      return { ok: true } as any;
    }
    const requestFunc = async () => {
      const access_token = await AsyncStorage.getItem("auth-token");
      const path = "/v1/lms/submit-assessment";
      return await axios.post(`${baseURL}${path}`, assessmentData, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
    };
    return handleRequest(requestFunc, "Assessment submitted successfully");
  };

  /**
   * Fetches the courses for a specific user.
   * @param {string} userId - The ID of the user.
   */
  const getUserCourses = async (userId: string) => {
    setLoading(true);
    if (isMock) {
      try {
        const list = (mockCoursesWithAssignments || []).filter((c: any) =>
          (c as any).courseAssignment ? (c as any).courseAssignment.userId === userId : true
        );
        setUserCourses(list);
      } finally {
        setLoading(false);
      }
      return;
    }
    const access_token = await AsyncStorage.getItem("auth-token");
    try {
      const path = `/v1/lms/user-courses/${userId}`;
      const response = await axios.get(`${baseURL}${path}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUserCourses(response.data.data);
    } catch (e) {
      Toast.show(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const getMyCourses = async () => {
    const userId = await AsyncStorage.getItem("id");
    if (userId) {
      await getUserCourses(userId);
    }
  };

  const getUserLevel = async (userId: string) => {
    setLoading(true);
    if (isMock) {
      try {
        setUserLevel((mockLevels || [null])[0]);
      } finally {
        setLoading(false);
      }
      return;
    }
    const access_token = await AsyncStorage.getItem("auth-token");
    try {
      const path = `/v1/lms/level/user/${userId}`;
      const response = await axios.get(`${baseURL}${path}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setUserLevel(response.data.data);
    } catch (e) {
      Toast.show(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const getMyLevel = async () => {
    const userId = await AsyncStorage.getItem("id");
    if (userId) {
      await getUserLevel(userId);
    }
  };

  const getLevels = async () => {
    setLoading(true);
    if (isMock) {
      try {
        setLevels(mockLevels || []);
      } finally {
        setLoading(false);
      }
      return;
    }
    const access_token = await AsyncStorage.getItem("auth-token");
    try {
      const path = `/v1/lms/level`;
      const response = await axios.get(`${baseURL}${path}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setLevels(response.data.data);
    } catch (e) {
      Toast.show(extractErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    userCourses,
    course,
    loading,
    getCourseById,
    submitAssessment,
    getUserCourses,
    getMyCourses,
    userLevel,
    getUserLevel,
    levels,
    getLevels,
    getMyLevel,
    startAssessment,
  };
};

export default useLMS;

