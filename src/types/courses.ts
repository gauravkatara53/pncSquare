export type CoursesType = {
  coursesOffered?: {
    programs: {
      programType: string;
      courses: string[];
    }[];
  };
};
