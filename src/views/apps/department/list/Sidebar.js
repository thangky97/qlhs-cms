import Sidebar from "@components/sidebar";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "@constants/validate";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDepartment } from "../store/action";

const SidebarNewDepartment = ({
  intl,
  open,
  toggleSidebar,
  disable,
  setDisable,
}) => {
  const store = useSelector((state) => state.department);
  const { training_programs } = useSelector((state) => state.department);

  const DepartmentOptions = validateOptions.DepartmentOptions;

  const dispatch = useDispatch();
  const cate = yup.object({
    code: yup.string().required(<FormattedMessage id="Mã là bắt buộc" />),
    name: yup
      .string()
      .required(<FormattedMessage id="Tên nghành là bắt buộc" />),
    trainingProgramId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn chương trình đào tạo" />),
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

  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const onSubmit = async (values) => {
    const desc =
      (valueDescription &&
        draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
      null;

    setDisable(true);

    dispatch(
      addDepartment({
        code: values?.code,
        name: values?.name,
        description: desc || "",
        trainingProgramId: parseInt(values?.trainingProgramId),
        status: parseInt(values.status) || 1,
      })
    );
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Thêm mới nghành" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="code">
            <FormattedMessage id="Mã" /> <span className="text-danger">*</span>
          </Label>
          <Input
            name="code"
            id="code"
            placeholder=""
            innerRef={register(DepartmentOptions.code)}
            onBlur={() => {
              let code = document.getElementById("code");
              if (code && code.value) {
                code.value = code.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["code"] })}
          />
          <small className="text-danger">
            {errors?.code && errors.code.message}
          </small>
          {errors?.code?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid code" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Tên nghành" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder=""
            innerRef={register(DepartmentOptions.name)}
            onBlur={() => {
              let name = document.getElementById("name");
              if (name && name.value) {
                name.value = name.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["name"] })}
          />
          <small className="text-danger">
            {errors?.name && errors.name.message}
          </small>
          {errors?.name?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid name" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label>
            <FormattedMessage id="training_program" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="trainingProgramId"
            render={({ field }) => {
              return (
                <Select
                  id="trainingProgramId"
                  innerRef={register}
                  name="trainingProgramId"
                  className={classnames("react-select")}
                  options={training_programs?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.code} - ${item?.name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("trainingProgramId", "");
                    setValue("trainingProgramId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
          <small className="text-danger">
            {errors?.trainingProgramId && errors.trainingProgramId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="description">
            <FormattedMessage id="Mô tả" />{" "}
          </Label>

          <Editor
            stripPastedStyles={true}
            editorState={valueDescription}
            onEditorStateChange={(data) => setValueDescription(data)}
            name="description"
            innerRef={register}
          />
        </FormGroup>

        <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" />{" "}
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

export default injectIntl(SidebarNewDepartment);
