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
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import { htmlToDraftUtil } from "@utils";
import draftToHtml from "draftjs-to-html";
import { getDataTrainingProgram, updateDepartment } from "../store/action";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const EditDepartment = ({ selected, intl }) => {
  const history = useHistory();
  const { staffs } = useSelector((state) => state.department);
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const DepartmentOptions = validateOptions.DepartmentOptions;
  const { training_programs } = useSelector((state) => state.department);
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState();
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const [trainingProgramValue, setTrainingProgram] = useState();

  const trainingProgramOption = {
    value: selected?.training_program?.id,
    label: `${selected?.training_program?.code} -  ${selected?.training_program?.name}`,
  };

  useEffect(() => {
    if (selected) {
      setValueDescription(htmlToDraftUtil(selected?.description || ""));
    }
    setTrainingProgram(trainingProgramOption);
  }, [selected]);

  const cate = yup.object({
    code: yup.string().required(<FormattedMessage id="Mã là bắt buộc" />),
    name: yup
      .string()
      .required(<FormattedMessage id="Tên nghành là bắt buộc" />),
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
      getDataTrainingProgram({
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
    const desc =
      (valueDescription &&
        draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
      null;

    dispatch(
      updateDepartment({
        id: selected?.id,
        data: {
          code: values?.code,
          name: values?.name,
          description: desc || "",
          status: parseInt(values.status),
          trainingProgramId: parseInt(trainingProgramValue?.value),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Chỉnh sửa nghành" />} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="code">
            <FormattedMessage id="Mã" /> <span className="text-danger">*</span>
          </Label>
          <Input
            name="code"
            id="code"
            innerRef={register(DepartmentOptions.code)}
            onBlur={() => {
              let code = document.getElementById("code");
              if (code && code.value) {
                code.value = code.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["code"] })}
            defaultValue={dataEdit?.code || ""}
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
            defaultValue={dataEdit?.name || ""}
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
            <FormattedMessage id="training_program" />
            <span className="text-danger"> *</span>
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setTrainingProgram(e)}
            innerRef={register({ required: true })}
            name="trainingProgramId"
            value={trainingProgramValue}
            placeholder={<FormattedMessage id="Select..." />}
            options={training_programs?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.code} - ${item?.name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
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
            <FormattedMessage id="status" />
          </Label>

          <Input
            type="select"
            name="status"
            value={status}
            onChange={(e) => setStatus(parseInt(e.target.value))}
            id="status"
            defaultValue={selected && selected?.status}
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

export default injectIntl(EditDepartment);
