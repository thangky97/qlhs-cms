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
import { getDataUser, updateDepartment } from "../store/action";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { STAFF_ROLE } from "../../../../constants/app";

const EditDepartment = ({ selected, intl }) => {
  const history = useHistory();
  const department = useSelector((state) => state.department);
  const { staffs } = useSelector((state) => state.department);
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const DepartmentOptions = validateOptions.DepartmentOptions;
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState();
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const [InstractorValue, setInstractors] = useState();

  const instructorOption = {
    value: dataEdit?.staff?.id,
    label: `${dataEdit?.staff?.last_name}  ${dataEdit?.staff?.first_name}`,
  };

  useEffect(() => {
    if (department) {
      setInstractors(instructorOption);
    }
  }, [department]);

  useEffect(() => {
    if (selected) {
      setValueDescription(htmlToDraftUtil(selected?.description || ""));
    }
  }, [selected]);

  const cate = yup.object({
    // position: yup
    //   .string()
    //   .required(<FormattedMessage id="Chức vụ là bắt buộc" />),
    name: yup
      .string()
      .required(<FormattedMessage id="Tên bộ môn là bắt buộc" />),
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
      getDataUser({
        filter: {
          status: 1,
          role: STAFF_ROLE.MANAGE_STAFF,
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
    const desc =
      (valueDescription &&
        draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
      null;

    dispatch(
      updateDepartment({
        id: selected?.id,
        data: {
          position: values?.position || "",
          name: values?.name,
          usersId: parseInt(InstractorValue?.value),
          description: desc || "",
          status: parseInt(values.status),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Chỉnh sửa bộ môn" />} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            <FormattedMessage id="instructors" />
          </Label>
          <Select
            isClearable={false}
            onChange={(e) => setInstractors(e)}
            innerRef={register({ required: true })}
            name="usersId"
            value={InstractorValue}
            placeholder={<FormattedMessage id="Select..." />}
            options={staffs?.data?.map((item, index) => {
              return {
                value: item?.id,
                label: `${item?.last_name} ${item?.first_name}`,
              };
            })}
            className="react-select"
            classNamePrefix="select"
          />
          <small className="text-danger">
            {errors?.usersId && errors.usersId.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="position">
            <FormattedMessage id="Chức vụ" />{" "}
            {/* <span className="text-danger">*</span> */}
          </Label>
          <Input
            name="position"
            id="position"
            placeholder=""
            innerRef={register(DepartmentOptions.position)}
            onBlur={() => {
              let position = document.getElementById("position");
              if (position && position.value) {
                position.value = position.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["position"] })}
            defaultValue={dataEdit?.position || ""}
          />
          <small className="text-danger">
            {errors?.position && errors.position.message}
          </small>
          {errors?.position?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid position" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Tên bộ môn" />{" "}
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
