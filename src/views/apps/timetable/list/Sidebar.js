import Sidebar from "@components/sidebar";
import classnames from "classnames";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "@constants/validate";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addTimetable } from "../store/action";

const SidebarNewTimetable = ({ open, toggleSidebar, disable, setDisable }) => {
  const store = useSelector((state) => state.timetable);
  const { courses } = useSelector((state) => state.timetable);
  const { staffs } = useSelector((state) => state.timetable);
  const { classrooms } = useSelector((state) => state.timetable);
  const { semesters } = useSelector((state) => state.timetable);
  const { terms } = useSelector((state) => state.timetable);

  const SemesterOptions = validateOptions.SemesterOptions;

  const dispatch = useDispatch();
  const cate = yup.object({
    lesson: yup
      .string()
      .required(<FormattedMessage id="Tiết học là bắt buộc" />),
    date: yup.string().required(<FormattedMessage id="Thứ là bắt buộc" />),
    courseId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn môn học" />),
    semesterId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn kì học" />),
    staffId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn giảng viên" />),
    curriculumSectionId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn lớp học" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    setDisable(true);

    dispatch(
      addTimetable({
        lesson: values?.lesson,
        courseId: parseInt(values?.courseId),
        staffId: parseInt(values?.staffId),
        classroomId: parseInt(values?.classroomId) || null,
        semesterId: parseInt(values?.semesterId),
        date: values?.date,
        practice_hours: values?.practice_hours || null,
        theory_hours: values?.theory_hours || null,
        curriculumSectionId: parseInt(values?.curriculumSectionId),
      })
    );
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New TimeTable" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="lesson">
            <FormattedMessage id="Tiết học" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="lesson"
            id="lesson"
            placeholder=""
            innerRef={register(SemesterOptions.lesson)}
            onBlur={() => {
              let lesson = document.getElementById("lesson");
              if (lesson && lesson.value) {
                lesson.value = lesson.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["lesson"] })}
          />
          <small className="text-danger">
            {errors?.lesson && errors.lesson.message}
          </small>
          {errors?.lesson?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid lesson" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="date">
            <FormattedMessage id="Thứ" /> <span className="text-danger">*</span>
          </Label>
          <Input
            name="date"
            id="date"
            placeholder=""
            innerRef={register(SemesterOptions.date)}
            onBlur={() => {
              let date = document.getElementById("date");
              if (date && date.value) {
                date.value = date.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["date"] })}
          />
          <small className="text-danger">
            {errors?.date && errors.date.message}
          </small>
          {errors?.date?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid date" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="theory_hours">
            <FormattedMessage id="Số giờ lý thuyết" />{" "}
          </Label>
          <Input
            name="theory_hours"
            id="theory_hours"
            placeholder=""
            innerRef={register(SemesterOptions.theory_hours)}
            onBlur={() => {
              let theory_hours = document.getElementById("theory_hours");
              if (theory_hours && theory_hours.value) {
                theory_hours.value = theory_hours.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["theory_hours"] })}
          />
          <small className="text-danger">
            {errors?.theory_hours && errors.theory_hours.message}
          </small>
          {errors?.theory_hours?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid theory_hours" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="practice_hours">
            <FormattedMessage id="Số giờ thực hành" />{" "}
          </Label>
          <Input
            name="practice_hours"
            id="practice_hours"
            placeholder=""
            innerRef={register(SemesterOptions.practice_hours)}
            onBlur={() => {
              let practice_hours = document.getElementById("practice_hours");
              if (practice_hours && practice_hours.value) {
                practice_hours.value = practice_hours.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["practice_hours"] })}
          />
          <small className="text-danger">
            {errors?.practice_hours && errors.practice_hours.message}
          </small>
          {errors?.practice_hours?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid practice_hours" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="term" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="curriculumSectionId"
            render={({ field }) => {
              return (
                <Select
                  id="curriculumSectionId"
                  innerRef={register}
                  name="curriculumSectionId"
                  className={classnames("react-select")}
                  options={terms?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.code} - ${item?.title}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("curriculumSectionId", "");
                    setValue("curriculumSectionId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.curriculumSectionId && errors.curriculumSectionId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Môn học" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="courseId"
            render={({ field }) => {
              return (
                <Select
                  id="courseId"
                  innerRef={register}
                  name="courseId"
                  className={classnames("react-select")}
                  options={courses?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.code} - ${item?.name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("courseId", "");
                    setValue("courseId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.courseId && errors.courseId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Instructors" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="staffId"
            render={({ field }) => {
              return (
                <Select
                  id="staffId"
                  innerRef={register}
                  name="staffId"
                  className={classnames("react-select")}
                  options={staffs?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.last_name}  ${item?.first_name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("staffId", "");
                    setValue("staffId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.staffId && errors.staffId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Phòng học" />{" "}
          </Label>
          <Controller
            control={control}
            name="classroomId"
            render={({ field }) => {
              return (
                <Select
                  id="classroomId"
                  innerRef={register}
                  name="classroomId"
                  className={classnames("react-select")}
                  options={classrooms?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.name} - ${item?.area}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("classroomId", "");
                    setValue("classroomId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.classroomId && errors.classroomId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Semester" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="semesterId"
            render={({ field }) => {
              return (
                <Select
                  id="semesterId"
                  innerRef={register}
                  name="semesterId"
                  className={classnames("react-select")}
                  options={semesters?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `Kì: ${item?.name} - Khoá: ${item?.product?.product_names[0]?.name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("semesterId", "");
                    setValue("semesterId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.semesterId && errors.semesterId.message}
          </small>
        </FormGroup>

        <div style={{ textAlign: "end" }}>
          <Button
            type="submit"
            className="mr-1"
            color="primary"
            disabled={disable}
          >
            <FormattedMessage id="add" />
          </Button>

          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            <FormattedMessage id="Cancel" />
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default injectIntl(SidebarNewTimetable);
