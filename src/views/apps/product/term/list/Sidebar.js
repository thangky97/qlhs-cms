import Sidebar from "@components/sidebar";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";

import { useParams } from "react-router-dom";
import Select from "react-select";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import validateOptions from "../../../../../constants/validate";
import { add } from "../store/action";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SidebarAdd = ({ open, toggleSidebar, intl, disable, setDisable }) => {
  const store = useSelector((state) => state.versions);
  const { id } = useParams();
  const { instractors } = useSelector((state) => state.terms);
  const { courses } = useSelector((state) => state.terms);

  const TermOptions = validateOptions.TermOptions;
  const lang = useSelector((state) => state.common.language);

  const dispatch = useDispatch();

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
    //   .required(<FormattedMessage id="Số sinh viên là bắt buộc" />),
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
    instructorId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn giảng viên" />),
    // courseId: yup
    //   .number()
    //   .required(<FormattedMessage id="Vui lòng chọn môn học" />),
  });

  const { register, errors, handleSubmit, setValue, setError, control } =
    useForm({ resolver: yupResolver(termValidate) });

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    setDisable(true);
    dispatch(
      add({
        code: values.code,
        productId: parseInt(id),
        title: values.title,
        number_students: values?.number_students || null,
        time: values?.time || null,
        date: values?.date || null,
        password: values?.password || null,
        instructorId: parseInt(values?.instructorId),
        courseId: parseInt(values?.courseId) || null,
        description: values.description || "",
        status: values.status,
        lang: lang,
      })
    );
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Thêm mới lớp học" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
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
            <FormattedMessage id="Số sinh viên" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="number_students"
            id="number_students"
            placeholder=" "
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
            <FormattedMessage id="time" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="time"
            id="time"
            type="time"
            placeholder=""
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
            <FormattedMessage id="instructors" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="instructorId"
            render={({ field }) => {
              return (
                <Select
                  id="instructorId"
                  innerRef={register}
                  name="instructorId"
                  className={classnames("react-select")}
                  options={instractors?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.last_name} ${item?.first_name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("instructorId", "");
                    setValue("instructorId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.instructorId && errors.instructorId.message}
          </small>
        </FormGroup>

        {/* <FormGroup>
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
                  className={classnames(
                    "react-select",
                    !changeSelect
                      ? {
                          "is-invalid": errors["courseId"],
                        }
                      : ""
                  )}
                  options={courses?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.name}`,
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
            id="status"
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
            {disable ? <Spinner size="sm" /> : <FormattedMessage id="Save" />}
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

export default injectIntl(SidebarAdd);
