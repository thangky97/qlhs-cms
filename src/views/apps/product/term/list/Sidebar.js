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
    instructorId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn giảng viên" />),
    userId: yup
      .array() // userId cần là mảng
      .min(1, <FormattedMessage id="Vui lòng chọn ít nhất một sinh viên" />) // Kiểm tra có ít nhất một sinh viên được chọn
      .required(<FormattedMessage id="Vui lòng chọn sinh viên" />),
  });

  const { register, errors, handleSubmit, setValue, setError, control } =
    useForm({ resolver: yupResolver(termValidate) });

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const onSubmit = async (values) => {
    console.log(values);

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
        userId: values.userId, // Giữ nguyên mảng userId đã chọn
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
                      label: `${item?.last_name} ${item?.first_name} - ${item?.role}`,
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

        <FormGroup>
          <Label>
            <FormattedMessage id="Student" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="userId"
            render={({ field }) => {
              return (
                <Select
                  id="userId"
                  innerRef={register}
                  name="userId"
                  className={classnames("react-select")}
                  options={instractors?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.last_name} ${item?.first_name} - ${item?.role}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  isMulti // Cho phép chọn nhiều user
                  {...field}
                  onChange={(selectedOptions) => {
                    setError("userId", "");
                    // Kiểm tra nếu selectedOptions là một mảng và sau đó thực hiện map
                    const selectedValues = Array.isArray(selectedOptions)
                      ? selectedOptions.map((option) => parseInt(option.value))
                      : []; // Nếu không có lựa chọn nào, trả về mảng rỗng

                    // Lưu mảng các userId đã chọn
                    setValue("userId", selectedValues, {
                      shouldValidate: true,
                    });
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.userId && errors.userId.message}
          </small>
        </FormGroup>

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
