import classnames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import validateOptions from "../../../../../constants/validate";
import { isObjEmpty } from "@utils";
import {
  getDataCourse,
  getDetailCourse,
  getInstractors,
  update,
} from "../store/action";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { scrollToTop } from "./../../../../../utility/Utils";
import { STAFF_ROLE } from "../../../../../constants/app";

const TermTab = ({ selected, intl }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const store = useSelector((state) => state.terms);

  const [disable, setDisable] = useState(false);
  const lang = useSelector((state) => state.common.language);
  const history = useHistory();
  const productId = useSelector((state) => selected.productId);
  const { instractors } = useSelector((state) => state.terms);
  const { courses } = useSelector((state) => state.terms);
  const [termData, setTermData] = useState(null);
  const [status, setStatus] = useState(null);
  const TermOptions = validateOptions.TermOptions;

  const [changeSubject, setChangeSubject] = useState();

  const [changeSelectSubject, setChangeSelectSubject] = useState(changeSubject);
  const [InstractorValue, setInstractors] = useState();

  const optionSubject = {
    value: store?.courseDetail?.id,
    label: store?.courseDetail?.name,
  };
  const instructorOption = {
    value: termData?.staff?.id,
    label: `${termData?.staff?.last_name}  ${termData?.staff?.first_name}`,
  };

  const termValidate = yup.object({
    code: yup
      .string()
      .matches(/^[a-zA-Z0-9]*$/, {
        message: <FormattedMessage id="validate field code" />,
      })
      .required(<FormattedMessage id="Mã lớp học là bắt buộc" />),
    title: yup
      .string()
      .required(<FormattedMessage id="Tên lớp học là bắt buộc" />),
    // number_students: yup
    //   .string()
    //   .required(<FormattedMessage id="Số học sinh là bắt buộc" />),
    // time: yup
    //   .string()
    //   .required(<FormattedMessage id="The time study field is required" />),
    // date: yup
    //   .string()
    //   .required(<FormattedMessage id="The school day field is required" />),
    // password: yup
    //   .string()
    //   .matches(/^[a-zA-Z0-9]*$/, {
    //     message: <FormattedMessage id="validate field code" />,
    //   })
    //   .required(<FormattedMessage id="Mật khẩu lớp học là bắt buộc" />),
    // instructorId: yup
    //   .number()
    //   .required(<FormattedMessage id="Vui lòng chọn môn học" />),
    // courseId: yup
    //   .number()
    //   .required(<FormattedMessage id="Vui lòng chọn môn học" />),
  });

  const { register, errors, handleSubmit, setError, setValue, control } =
    useForm({ resolver: yupResolver(termValidate) });

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && termData !== null && selected.id !== termData.id)
    ) {
      setTermData(selected);
    }
  }, [selected, termData]);

  useEffect(() => {
    if (store) {
      setChangeSubject(optionSubject);
      setInstractors(instructorOption);
    }
  }, [store]);

  useEffect(() => {
    if (termData) {
      setStatus(termData.status);
    }
  }, [termData]);

  useEffect(() => {
    if (changeSubject) {
      setChangeSelectSubject(changeSubject);
    }
  }, [changeSubject]);

  useEffect(() => {
    dispatch(
      getDataCourse({
        filter: {
          status: 1,
        },
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
      getInstractors({
        filter: {
          status: 1,
          role: [STAFF_ROLE.MANAGE_STAFF, STAFF_ROLE.MANAGE_SYSTEM],
        },
        skip: 0,
        limit: 20,
        order: {
          key: "createdAt",
          value: "desc",
        },
      })
    );
  }, [dispatch]);

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        update({
          id: parseInt(id),
          data: {
            code: values.code,
            productId: productId,
            title: values.title,
            number_students: values?.number_students || null,
            time: values?.time || null,
            date: values?.date || null,
            password: values?.password || null,
            instructorId: parseInt(InstractorValue?.value),
            courseId: parseInt(changeSelectSubject?.value) || null,
            description: values.description || "",
            status: values.status,
            lang: lang,
          },
        })
      );
    }
  };

  useEffect(() => {
    if (store.status === 200) {
      setDisable(false);
      scrollToTop();
      history.goBack();
    }
  }, [store.status, history, id]);

  useEffect(() => {
    dispatch(getDetailCourse(selected?.courseId));
  }, [dispatch, selected?.courseId]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="Code">
          <FormattedMessage id="Mã lớp học" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="code"
          id="code"
          placeholder=""
          defaultValue={termData && termData?.code}
          innerRef={register()}
          onBlur={() => {
            let name = document.getElementById("code");
            if (name && name.value) {
              name.value = name.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["code"] })}
        />
        <small className="text-danger">
          {errors?.code && errors.code.message}
        </small>
        {errors?.name?.type == "validate" && (
          <small className="text-danger">
            <FormattedMessage id="Invalid name" />
          </small>
        )}
      </FormGroup>

      <FormGroup>
        <Label for="title">
          <FormattedMessage id="Tên lớp học" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="title"
          id="title"
          placeholder=" "
          defaultValue={termData && termData?.title}
          innerRef={register(TermOptions.title)}
          onBlur={() => {
            let title = document.getElementById("title");
            if (title && title.value) {
              title.value = title.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["title"] })}
        />
        <small className="text-danger">
          {errors?.title && errors.title.message}
        </small>
      </FormGroup>

      {/* <FormGroup>
        <Label for="number_students">
          <FormattedMessage id="Số học sinh" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="number_students"
          id="number_students"
          placeholder=" "
          defaultValue={termData && termData?.number_students}
          innerRef={register(TermOptions.number_students)}
          onBlur={() => {
            let number_students = document.getElementById("number_students");
            if (number_students && number_students.value) {
              number_students.value = number_students.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["number_students"] })}
        />
        <small className="text-danger">
          {errors?.number_students && errors.number_students.message}
        </small>
      </FormGroup> */}

      {/* <FormGroup>
        <Label for="time">
          <FormattedMessage id="time" /> <span className="text-danger">*</span>
        </Label>
        <Input
          name="time"
          id="time"
          type="time"
          placeholder=""
          defaultValue={termData && termData?.time}
          innerRef={register}
          onBlur={() => {
            let time = document.getElementById("time");
            if (time && time.value) {
              time.value = time.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["time"] })}
        />
        <small className="text-danger">
          {errors?.time && errors.time.message}
        </small>
        {errors?.time?.type == "validate" && (
          <small className="text-danger">
            <FormattedMessage id="Invalid name" />
          </small>
        )}
      </FormGroup> */}

      {/* <FormGroup>
        <Label for="date">
          <FormattedMessage id="school day" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="date"
          id="date"
          type="date"
          placeholder=""
          defaultValue={termData && termData?.date}
          innerRef={register}
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
            <FormattedMessage id="Invalid name" />
          </small>
        )}
      </FormGroup> */}

      {/* <FormGroup>
        <Label for="password">
          <FormattedMessage id="Mật khẩu lớp học" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="password"
          id="password"
          placeholder=" "
          defaultValue={termData && termData.password}
          innerRef={register(TermOptions.password)}
          onBlur={() => {
            let password = document.getElementById("password");
            if (password && password.value) {
              password.value = password.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["password"] })}
        />
        <small className="text-danger">
          {errors?.password && errors.password.message}
        </small>
      </FormGroup> */}

      <FormGroup>
        <Label>
          <FormattedMessage id="instructors" />
          <span className="text-danger"> *</span>
        </Label>
        <Select
          isClearable={false}
          onChange={(e) => setInstractors(e)}
          innerRef={register({ required: true })}
          name="instructorId"
          value={InstractorValue}
          placeholder={<FormattedMessage id="Select..." />}
          options={instractors?.map((item, index) => {
            return {
              value: item?.id,
              label: `${item?.last_name} ${item?.first_name}`,
            };
          })}
          className="react-select"
          classNamePrefix="select"
        />
        <small className="text-danger">
          {errors?.instructorId && errors.instructorId.message}
        </small>
      </FormGroup>
      {/* 
      <FormGroup>
        <Label>
          <FormattedMessage id="Môn học" />{" "}
          <span className="text-danger">*</span>
        </Label>
        <Select
          isClearable={false}
          onChange={(e) => setChangeSelectSubject(e)}
          innerRef={register({ required: true })}
          name="courseId"
          value={changeSelectSubject}
          placeholder={<FormattedMessage id="Select..." />}
          options={courses?.map((item, index) => {
            return {
              value: item?.id,
              label: `${item?.name}`,
              number: index + 1,
            };
          })}
          className="react-select"
          classNamePrefix="select"
        />
        <small className="text-danger">
          {errors?.courseId && errors.courseId.message}
        </small>
      </FormGroup> */}

      <FormGroup>
        <Label for="description">
          <FormattedMessage id="description" />{" "}
          <span className="text-danger"></span>
        </Label>
        <Input
          name="description"
          id="descriptionss"
          placeholder=""
          defaultValue={termData && termData.description}
          innerRef={register(TermOptions.description)}
          onBlur={() => {
            let description = document.getElementById("description");
            if (description && description.value) {
              description.value = description.value.trim();
            }
          }}
          className={classnames({ "is-invalid": errors["description"] })}
        />
      </FormGroup>

      <FormGroup>
        <Label for="status">
          <FormattedMessage id="status" />
        </Label>
        <Input
          type="select"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          id="status"
          defaultValue={termData && termData.status}
          innerRef={register({ required: true })}
        >
          <option value="1">{intl.formatMessage({ id: "Active" })}</option>
          <option value="0">{intl.formatMessage({ id: "Deactive" })}</option>
        </Input>
      </FormGroup>
      <div style={{ textAlign: "end" }}>
        <Button
          type="submit"
          className="mr-1"
          color="primary"
          disabled={disable}
        >
          {disable ? <Spinner size="sm" /> : <FormattedMessage id="update" />}
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
  );
};
export default injectIntl(TermTab);
