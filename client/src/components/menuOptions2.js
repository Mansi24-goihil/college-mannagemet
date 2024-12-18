

export const menuOptions2 = {
    master: {
      title: "Master",
      submenus: [
        {
          name: "Course",
          path: "/master/course",
          subItems: [
            { name: "Course Details", path: "/master/course/details" },
            { name: "Course Syllabus", path: "/master/course/syllabus" },
          ],
        },
        { name: "Semester", path: "/master/semester", 
          subItems: [
          { name: "Course Details123", path: "/master/course/details" },
          { name: "Course Syllabus45665", path: "/master/course/syllabus" },
        ], },
        { name: "Div", path: "/master/div" ,subItems:[]},
        { name: "Subject", path: "/master/subject" ,subItems:[]},
      ],
    },
    teacher: {
      title: "Teacher",
      submenus: [
        {
          name: "Teacher's Subject Selection",
          path: "/teacher/subject-selection",
          subItems: [
            { name: "Subject List", path: "/teacher/subject-selection/list" },
            { name: "Add Subject", path: "/teacher/subject-selection/add" },
          ],
        },
        { name: "Class Teacher", path: "/teacher/class-teacher",subItems:[] },
        { name: "Daily Activity", path: "/teacher/daily-activity" ,subItems:[]},
      ],
    },
    student: {
      title: "Student",
      submenus: [
        { name: "Student Register", path: "/student/register" },
        {
          name: "Master",
          path: "/student/master",
          subItems: [
            { name: "Student Info", path: "/student/master/info" },
            { name: "Student Marks", path: "/student/master/marks" },
          ],
        },
        { name: "Subject", path: "/student/subject" },
        { name: "Attendance", path: "/student/attendance" },
      ],
    },
    student2: {
      title: "Student2",
      submenus: [
        { name: "StudentRegister123", path: "/student2/register" },
        {
          name: "Master123",
          path: "/student2/master",
          subItems: [
            { name: "Student Info`12133", path: "/student2/master/info" },
            { name: "Student Marks123", path: "/student2/master/marks" },
          ],
        },
        { name: "Subject123123", path: "/student2/subject" },
        { name: "Attendance1223", path: "/student2/attendance" },
      ],
    },
    // userAccount: {
    //   title: "User Account",
    //   submenus: [
    //     { name: "Change", path: "/user-account/change" },
    //     { name: "Reset", path: "/user-account/reset" },
    //     { name: "user-right", path: "/user-account/user-right" },
  
    //   ],
    // },
  };
  