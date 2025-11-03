import type {
  Course,
  CourseAssignment,
  CourseWithCourseAssignment,
  Chemical,
  Level,
} from "./useLMS";

// Multiple mock courses
export const mockCourses: Course[] = [
  {
    _id: "course-chem-001",
    title: "Chemical Handling SK-148",
    description: "Proper procedures and safety for handling SK-148 chemicals.",
    thumbnailUrl: "https://example.com/thumbs/sk-148.png",
    minimumPassScore: 70,
    files: [
      { type: "document", url: "https://example.com/docs/sk-148-sds.pdf" },
      { type: "video", url: "https://example.com/video/sk-148-intro.mp4" },
    ],
    questionsAndOptions: [
      {
        question:
          "When using SK-148 for heavy soil cleaning, which PPE is required?",
        options: ["Safety goggles", "Sandals", "No gloves", "Loose clothing"],
      },
      {
        question:
          "Recommended dilution ratio for general cleaning with SK-148?",
        options: ["1:64", "1:128", "1:32", "1:8"],
      },
      {
        question: "Which step should be performed BEFORE applying SK-148?",
        options: [
          "Don PPE",
          "Turn off ventilation",
          "Dilute with oil",
          "Smoke nearby",
        ],
      },
      {
        question: "Select the correct storage guideline for SK-148:",
        options: [
          "Store near heat",
          "Keep sealed and labeled",
          "Expose to sunlight",
          "Mix with acids",
        ],
      },
    ],
    answers: [
      ["Safety goggles"],
      ["1:128"],
      ["Don PPE"],
      ["Keep sealed and labeled"],
    ],
    assessmentDuration: 10,
    facilityId: "facility-001",
  },
  {
    _id: "course-floor-002",
    title: "Floor Machine Basics",
    description: "Operating auto-scrubbers and burnishers safely and effectively.",
    thumbnailUrl: "https://example.com/thumbs/floor.png",
    minimumPassScore: 75,
    files: [
      { type: "video", url: "https://example.com/video/floor-basics.mp4" },
      { type: "document", url: "https://example.com/docs/floor-checklist.pdf" },
    ],
    questionsAndOptions: [
      {
        question: "What should be checked before starting a floor machine?",
        options: [
          "Power cable integrity",
          "Loose clothing",
          "Random tools on floor",
          "Play loud music",
        ],
      },
      {
        question: "When should recovery tank be emptied?",
        options: ["After each use", "Once a week", "Never", "Only if smells"],
      },
    ],
    answers: [["Power cable integrity"], ["After each use"]],
    assessmentDuration: 8,
    facilityId: "facility-001",
  },
  {
    _id: "course-food-003",
    title: "Food Contact Surface Sanitization",
    description: "How to sanitize food contact surfaces to regulatory standards.",
    thumbnailUrl: "https://example.com/thumbs/food.png",
    minimumPassScore: 80,
    files: [
      { type: "document", url: "https://example.com/docs/sanitize-guide.pdf" },
      { type: "image", url: "https://example.com/img/poster.png" },
    ],
    questionsAndOptions: [
      {
        question: "Minimum contact time for sanitizer X at 200ppm?",
        options: ["10 sec", "30 sec", "1 min", "5 min"],
      },
    ],
    answers: [["1 min"]],
    assessmentDuration: 5,
    facilityId: "facility-002",
  },
];

// Multiple mock assignments across courses/users
export const mockAssignments: CourseAssignment[] = [
  {
    userId: "user-001",
    courseId: "course-chem-001",
    expiresAt: "open",
    completed: false,
    score: 0,
    attempts: 0,
    maxAttempts: 100,
  },
  {
    userId: "user-001",
    courseId: "course-floor-002",
    expiresAt: "open",
    completed: true,
    score: 92,
    attempts: 1,
    maxAttempts: 3,
  },
  {
    userId: "user-002",
    courseId: "course-food-003",
    expiresAt: "open",
    completed: false,
    score: 0,
    attempts: 0,
    maxAttempts: 2,
  },
];

// Join helper
export const mockCoursesWithAssignments: CourseWithCourseAssignment[] = mockCourses.map(
  (c) => ({
    ...c,
    courseAssignment:
      mockAssignments.find((a) => a.courseId === c._id && a.userId === "user-001") || null,
  })
);

// Chemicals for levels
export const mockChemicals: Chemical[] = [
  {
    name: "SK-148",
    quantity: 20,
    unit: "L",
    sdsDocument: "https://example.com/docs/sk-148-sds.pdf",
    usageThreshold: "5 L/week",
    concentration: "10%",
    unitOfMeasurement: "liters",
    facility: "facility-001",
  },
  {
    name: "Quat-X",
    quantity: 5,
    unit: "L",
    sdsDocument: "https://example.com/docs/quatx-sds.pdf",
    usageThreshold: "2 L/week",
    concentration: "200ppm",
    unitOfMeasurement: "liters",
    facility: "facility-002",
  },
];

// Levels referencing courses and chemicals
export const mockLevels: Level[] = [
  {
    hierachy: 1,
    requiredCourses: [mockCourses[0], mockCourses[1]],
    chemicalsHandleAble: [mockChemicals[0]],
    percentCompleted: 50,
  },
  {
    hierachy: 2,
    requiredCourses: [mockCourses[2]],
    chemicalsHandleAble: [mockChemicals[0], mockChemicals[1]],
    percentCompleted: 20,
  },
];

// Backwards-compatible single exports (defaults)
export const mockCourse: Course = mockCourses[0];
export const mockAssignment: CourseAssignment = mockAssignments[0];
export const mockCourseWithAssignment: CourseWithCourseAssignment = mockCoursesWithAssignments[0];
