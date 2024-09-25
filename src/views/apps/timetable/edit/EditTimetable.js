import { useEffect, useState } from "react";
import { Button, Card, Input, Label, Form, FormGroup } from "reactstrap";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import ExtensionsHeader from "@components/extensions-header";
import validateOptions from "@constants/validate";
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import "react-slidedown/lib/slidedown.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import {
  getDataClassroom,
  getDataCourse,
  getDataSemester,
  getDataStaff,
  getDataTerm,
  updateTimetable,
} from "../store/action";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { STAFF_ROLE } from "../../../../constants/app";

const EditTimetable = ({ selected, intl }) => {
  const history = useHistory();
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const SemesterOptions = validateOptions.SemesterOptions;
  const { courses } = useSelector((state) => state.timetable);
  const { staffs } = useSelector((state) => state.timetable);
  const { classrooms } = useSelector((state) => state.timetable);
  const { semesters } = useSelector((state) => state.timetable);
  const { terms } = useSelector((state) => state.timetable);
  const [disable, setDisable] = useState(false);

  const [coursesValue, setCourse] = useState();
  const [staffValue, setStaff] = useState();
  const [curriculumSectionValue, setTerm] = useState();
  const [classroomValue, setClassroom] = useState();
  const [semesterValue, setSemester] = useState();

  const courseOption = {
    value: selected?.course?.id,
    label: `${selected?.course?.code} - ${selected?.course?.name}`,
  };

  const staffOption = {
    value: selected?.staff?.id,
    label: `${selected?.staff?.last_name} ${selected?.staff?.last_name}`,
  };

  const termOption = {
    value: selected?.curriculum_section?.id,
    label: `${selected?.curriculum_section?.code} - ${selected?.curriculum_section?.title}`,
  };

  const classroomOption = selected?.classroomId
    ? {
        value: selected.classroom.id,
        label: `${selected.classroom.name} ${selected.classroom.area}`,
      }
    : undefined;

  const semesterOption = {
    value: selected?.semester?.id,
    label: `${selected?.semester?.name}`,
  };

  useEffect(() => {
    if (dataEdit) {
      setCourse(courseOption);
      setStaff(staffOption);
      setTerm(termOption);
      setClassroom(classroomOption);
      setSemester(semesterOption);
    }
  }, [dataEdit]);

  const cate = yup.object({
    lesson: yup
      .string()
      .required(<FormattedMessage id="Tiết học là bắt buộc" />),
    date: yup.string().required(<FormattedMessage id="Thứ là bắt buộc" />),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  useEffect(() => {
    dispatch(
      getDataCourse({
        filter: {},
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
    dispatch(
      getDataStaff({
        filter: {
          role: [STAFF_ROLE.MANAGE_STAFF, STAFF_ROLE.MANAGE_SYSTEM],
        },
        skip: 0,
        limit: 20,
        order: {
          key: "id",
          value: "desc",
        },
      })
    );
    dispatch(
      getDataClassroom({
        filter: {},
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
    dispatch(
      getDataSemester({
        filter: {},
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
    dispatch(
      getDataTerm({
        filter: {},
        skip: 0,
        limit: 20,
        order: [
          {
            key: "id",
            value: "desc",
          },
        ],
      })
    );
  }, [dispatch]);

  const onSubmit = async (values) => {
    dispatch(
      updateTimetable({
        id: selected?.id,
        data: {
          lesson: values?.lesson,
          courseId: parseInt(coursesValue?.value),
          staffId: parseInt(staffValue?.value),
          classroomId: parseInt(classroomValue?.value) || null,
          semesterId: parseInt(semesterValue?.value),
          date: values?.date,
          practice_hours: values?.practice_hours || null,
          theory_hours: values?.theory_hours || null,
          curriculumSectionId: parseInt(curriculumSectionValue?.value),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Chỉnh sửa lịch học" />} />

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
            defaultValue={dataEdit?.lesson || ""}
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
            defaultValue={dataEdit?.date || ""}
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
          <Label>
            <FormattedMessage id="term" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setTerm(e)}
            innerRef={register({ required: true })}
            name="curriculumSectionId"
            value={curriculumSectionValue}
            placeholder={<FormattedMessage id="select" />}
            options={terms?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.code} - ${item?.title}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.curriculumSectionId && errors.curriculumSectionId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Môn học" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setCourse(e)}
            innerRef={register({ required: true })}
            name="courseId"
            value={coursesValue}
            placeholder={<FormattedMessage id="select" />}
            options={courses?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.code} - ${item?.name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.courseId && errors.courseId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Instructors" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setStaff(e)}
            innerRef={register({ required: true })}
            name="staffId"
            value={staffValue}
            placeholder={<FormattedMessage id="select" />}
            options={staffs?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.last_name} - ${item?.first_name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.staffId && errors.staffId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Phòng học" />
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setClassroom(e)}
            innerRef={register({ required: true })}
            name="classroomId"
            value={classroomValue}
            placeholder={<FormattedMessage id="select" />}
            options={classrooms?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.name} - ${item?.area}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.classroomId && errors.classroomId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="Semester" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setSemester(e)}
            innerRef={register({ required: true })}
            name="semesterId"
            value={semesterValue}
            placeholder={<FormattedMessage id="select" />}
            options={semesters?.map((item, index) => {
              return {
                value: item?.id,
                label: `Kì: ${item?.name} - Khoá: ${item?.product?.product_names[0]?.name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.semesterId && errors.semesterId.message}
          </small>
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
            defaultValue={dataEdit?.theory_hours || ""}
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
            defaultValue={dataEdit?.practice_hours || ""}
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

        <div style={{ textAlign: "end" }}>
          <Button
            type="submit"
            className="mr-1"
            color="primary"
            disabled={disable}
          >
            <FormattedMessage id="update" />
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={() => history.goBack()}
          >
            <FormattedMessage id="Cancel" />
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default injectIntl(EditTimetable);
