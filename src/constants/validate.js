import { FormattedMessage } from "react-intl";
import REGEX from "./regex";
import { number } from "yup";
const validateOptions = {
  AboutOptions: {
    about: {
      // required: <FormattedMessage id="The about title field is required" />,
      maxLength: {
        value: 255,
        message: <FormattedMessage id="About title up to 255 characters" />,
      },
    },
  },
  PartnerOptions: {
    name: {
      required: <FormattedMessage id="The name field is required" />,
      maxLength: {
        value: 255,
        message: <FormattedMessage id="Partner name up to 255 characters" />,
      },
    },
  },
  DocumentOptions: {
    label: {
      required: <FormattedMessage id="the label field is required" />,
      validate: (value) => !REGEX.TITLE.test(value),

      maxLength: {
        value: 255,

        message: <FormattedMessage id="Label up to 255 characters" />,
      },
    },

    sort_order: {
      required: <FormattedMessage id="The sort order field is required" />,
      pattern: {
        value: /^\d+$/,
        message: <FormattedMessage id="Number Input" />,
      },
    },

    short_content: {
      required: <FormattedMessage id="the short content field is required" />,
      validate: (value) => !REGEX.TITLE.test(value),
      maxLength: {
        value: 255,

        message: <FormattedMessage id="Short content up to 255 characters" />,
      },
    },
  },

  TermOptions: {
    title: {
      required: <FormattedMessage id="Tên lớp học là bắt buộc" />,
    },
  },

  KindOptions: {
    name: {
      required: <FormattedMessage id="The solution name field is required" />,

      minLength: {
        value: 3,

        message: (
          <FormattedMessage id="Solution name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 70,
        message: <FormattedMessage id="Solution must be 70 characters max" />,
      },
    },
  },

  EditKindOptions: {
    name: {
      required: <FormattedMessage id="The solution name field is required" />,
      minLength: {
        value: 3,

        message: (
          <FormattedMessage id="Solution name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 70,
        message: <FormattedMessage id="Solution must be 70 characters max" />,
      },
    },
  },
  TranscriptOptions: {
    name: {
      required: <FormattedMessage id="The student name field is required" />,

      minLength: {
        value: 3,

        message: (
          <FormattedMessage id="Student name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 70,
        message: (
          <FormattedMessage id="Student name must be 70 characters max" />
        ),
      },
    },
    score: {
      required: <FormattedMessage id="The score field is required" />,

      // minLength: {
      //   value: 3,

      //   message: (
      //     <FormattedMessage id="Score must be at least 3 characters" />
      //   ),
      // },
      // maxLength: {
      //   value: 70,
      //   message: <FormattedMessage id="Score must be 70 characters max" />,
      // },
    },
  },
  EditTranscriptOptions: {
    student_code: {
      required: <FormattedMessage id="The student code field is required" />,
    },
    name: {
      required: <FormattedMessage id="The student name field is required" />,

      minLength: {
        value: 3,

        message: (
          <FormattedMessage id="Student name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 70,
        message: (
          <FormattedMessage id="Student name must be 70 characters max" />
        ),
      },
    },
    score: {
      required: <FormattedMessage id="The score field is required" />,
    },
  },
  ProductOptions: {
    product_name: {
      required: <FormattedMessage id="The product's name field is required" />,
      validate: (value) => !REGEX.NAME2.test(value),
      minLength: {
        value: 3,
        message: (
          <FormattedMessage id="Product name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 100,
        message: <FormattedMessage id="Product name up to 100 characters" />,
      },
      alidate: (value) => !REGEX.SPACE.test(value),
    },
    vat: {
      required: <FormattedMessage id="The VAT field is required" />,
      min: {
        value: 0,
        message: <FormattedMessage id="VAT more than 0" />,
      },
      max: {
        value: 100,
        message: <FormattedMessage id="VAT less than 100" />,
      },
    },
    number_trial: {
      // required: <FormattedMessage id="The Number day field is required" />,
      min: {
        value: 0,
        message: (
          <FormattedMessage id="Number day must be greater than or equal to 0" />
        ),
      },
      max: {
        value: 30,
        message: (
          <FormattedMessage id="Number day must be less than or equal to 30" />
        ),
      },
      validate: (value) =>
        value >= 0 || (
          <FormattedMessage id="Number day must be a positive number" />
        ),
    },
    service_price_local: {
      required: <FormattedMessage id="The price field is required" />,
      validate: (value) => !REGEX.PRICE.test(value),
      pattern: {
        value: /^0*/g,
        message: <FormattedMessage id="Invalid price" />,
      },
      maxLength: {
        value: 255,
      },
    },

    service_price_cloud: {
      required: <FormattedMessage id="The price field is required" />,
      validate: (value) => !REGEX.PRICE.test(value),
      pattern: {
        value: /^0*/g,
        message: <FormattedMessage id="Invalid price" />,
      },
      maxLength: {
        value: 255,
      },
    },
  },
  StaffOptions: {
    last_name: {
      required: <FormattedMessage id="The last name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="Last name up to 25 characters" />,
      },
    },
    first_name: {
      required: <FormattedMessage id="The first name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="First name up to 25 characters" />,
      },
    },
    username: {
      required: <FormattedMessage id="The username field is required" />,
      minLength: {
        value: 6,

        message: (
          <FormattedMessage id="Username must be at least 6 characters" />
        ),
      },
      maxLength: {
        value: 50,
        message: <FormattedMessage id="username must be 50 characters max" />,
      },
      pattern: {
        value: REGEX.USERNAME,
        message: <FormattedMessage id="Invalid username" />,
      },
    },
    email: {
      required: <FormattedMessage id="The email field is required" />,
      validate: (value) => {
        if (value != "") {
          return REGEX.EMAIL.test(value);
        }
      },

      maxLength: {
        value: 125,
        message: <FormattedMessage id="Email up to 125 characters" />,
      },
    },

    password: {
      required: <FormattedMessage id="The password field is required" />,
      minLength: {
        value: 8,
        message: <FormattedMessage id="Password minimum 8 characters" />,
      },
    },
    phone: {
      required: <FormattedMessage id="The phone number field is required" />,
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id="Invalid phone number" />,
      },
      maxLength: {
        value: 25,
        message: <FormattedMessage id="Phone number up to 25 characters" />,
      },
    },
  },
  EditStaffOptions: {
    last_name: {
      required: <FormattedMessage id="The last name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="Last name up to 25 characters" />,
      },
    },
    first_name: {
      required: <FormattedMessage id="The first name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="First name up to 25 characters" />,
      },
    },
    username: {
      required: <FormattedMessage id="The username field is required" />,
      minLength: {
        value: 6,

        message: (
          <FormattedMessage id="Username must be at least 6 characters" />
        ),
      },
      maxLength: {
        value: 50,
        message: <FormattedMessage id="username must be 50 characters max" />,
      },
      pattern: {
        value: REGEX.USERNAME,
        message: <FormattedMessage id="Invalid username" />,
      },
    },
    email: {
      required: <FormattedMessage id="The email field is required" />,
      validate: (value) => {
        if (value != "") {
          return REGEX.EMAIL.test(value);
        }
      },

      maxLength: {
        value: 125,
        message: <FormattedMessage id="Email up to 125 characters" />,
      },
    },

    password: {
      required: <FormattedMessage id="The password field is required" />,
      minLength: {
        value: 8,
        message: <FormattedMessage id="Password minimum 8 characters" />,
      },
    },
    phone: {
      required: <FormattedMessage id="The phone number field is required" />,
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id="Invalid phone number" />,
      },
      maxLength: {
        value: 25,
        message: <FormattedMessage id="Phone number up to 25 characters" />,
      },
    },
  },
  UserOptions: {
    last_name: {
      required: <FormattedMessage id="The last name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="Last name up to 25 characters" />,
      },
    },
    first_name: {
      required: <FormattedMessage id="The first name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="First name up to 25 characters" />,
      },
    },
    username: {
      required: <FormattedMessage id="The username field is required" />,
      minLength: {
        value: 6,

        message: (
          <FormattedMessage id="Username must be at least 6 characters" />
        ),
      },
      maxLength: {
        value: 50,
        message: <FormattedMessage id="username must be 50 characters max" />,
      },
      pattern: {
        value: REGEX.USERNAME,
        message: <FormattedMessage id="Invalid username" />,
      },
    },
    email: {
      required: <FormattedMessage id="The email field is required" />,
      validate: (value) => {
        if (value != "") {
          return REGEX.EMAIL.test(value);
        }
      },

      maxLength: {
        value: 125,
        message: <FormattedMessage id="Email up to 125 characters" />,
      },
    },
    password: {
      required: <FormattedMessage id="The password field is required" />,
      validate: (value) => !REGEX.PASSWORD.test(value?.trim()),
      minLength: {
        value: 8,
        message: <FormattedMessage id="Password minimum 8 characters" />,
      },
    },

    phone: {
      pattern: {
        value:
          /^(0|\\d)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id="Invalid phone number" />,
      },
      maxLength: {
        value: 25,
        message: <FormattedMessage id="Phone number up to 25 characters" />,
      },
    },
  },
  EditUserOptions: {
    last_name: {
      required: <FormattedMessage id="The last name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="Last name up to 25 characters" />,
      },
    },
    first_name: {
      required: <FormattedMessage id="The first name field is required" />,
      validate: (value) => !REGEX.NAME.test(value),

      maxLength: {
        value: 25,
        message: <FormattedMessage id="First name up to 25 characters" />,
      },
    },
    username: {
      required: <FormattedMessage id="The username field is required" />,
      minLength: {
        value: 6,

        message: (
          <FormattedMessage id="Username must be at least 6 characters" />
        ),
      },
      maxLength: {
        value: 50,
        message: <FormattedMessage id="username must be 50 characters max" />,
      },
      pattern: {
        value: REGEX.USERNAME,
        message: <FormattedMessage id="Invalid username" />,
      },
    },
    email: {
      required: <FormattedMessage id="The email field is required" />,
      validate: (value) => {
        if (value != "") {
          return REGEX.EMAIL.test(value);
        }
      },

      maxLength: {
        value: 125,
        message: <FormattedMessage id="Email up to 125 characters" />,
      },
    },
    password: {
      required: <FormattedMessage id="The password field is required" />,
      validate: (value) => !REGEX.PASSWORD.test(value?.trim()),
      minLength: {
        value: 8,
        message: <FormattedMessage id="Password minimum 8 characters" />,
      },
    },

    phone: {
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id="Invalid phone number" />,
      },
      maxLength: {
        value: 25,
        message: <FormattedMessage id="Phone number up to 25 characters" />,
      },
    },
  },
  StudentOptions: {
    name: {
      required: <FormattedMessage id="The name field is required" />,
      maxLength: {
        value: 255,
        message: <FormattedMessage id="Partner name up to 255 characters" />,
      },
    },
    email: {
      required: <FormattedMessage id="The email field is required" />,
      validate: (value) => {
        if (value != "") {
          return REGEX.EMAIL.test(value);
        }
      },

      maxLength: {
        value: 125,
        message: <FormattedMessage id="Email up to 125 characters" />,
      },
    },
    phone: {
      required: <FormattedMessage id="The phone number field is required" />,
      pattern: {
        value:
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,
        message: <FormattedMessage id="Invalid phone number" />,
      },
      maxLength: {
        value: 25,
        message: <FormattedMessage id="Phone number up to 25 characters" />,
      },
    },
    date: {
      required: <FormattedMessage id="The phone number field is required" />,
    },
    // gender: {
    //   required: <FormattedMessage id="The phone number field is required" />,
    // },
    // courseId: {
    //   required: <FormattedMessage id="The phone number field is required" />,
    // },
    // formality: {
    //   required: <FormattedMessage id="The phone number field is required" />,
    // },
  },

  CloudOptions: {
    product_name: {
      required: <FormattedMessage id="The cloud name field is required" />,
      validate: (value) => !REGEX.NAME2.test(value),
      minLength: {
        value: 3,
        message: (
          <FormattedMessage id="Cloud name must be at least 3 characters" />
        ),
      },
      maxLength: {
        value: 100,
        message: <FormattedMessage id="Cloud name up to 100 characters" />,
      },
      alidate: (value) => !REGEX.SPACE.test(value),
    },
  },

  CourseOptions: {
    name: {
      required: <FormattedMessage id="Tên môn học là bắt buộc" />,
    },
  },

  ClassroomOptions: {
    name: {
      required: <FormattedMessage id="Tên phòng học là bắt buộc" />,
    },
    // area: {
    //   required: <FormattedMessage id="Tên khu là bắt buộc" />,
    // },
  },

  DepartmentOptions: {
    name: {
      required: <FormattedMessage id="Tên nghành là bắt buộc" />,
    },
  },

  SemesterOptions: {
    name: {
      required: <FormattedMessage id="Tên kì học là bắt buộc" />,
    },
  },
};
export default validateOptions;
