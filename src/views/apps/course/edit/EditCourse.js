import { useEffect, useState } from "react";
import { Button, Card, Input, Label, Form, FormGroup } from "reactstrap";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import ExtensionsHeader from "@components/extensions-header";
import validateOptions from "@constants/validate";
import "@styles/base/pages/app-invoice.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";
import "react-slidedown/lib/slidedown.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import { htmlToDraftUtil } from "@utils";
import draftToHtml from "draftjs-to-html";
import { updateCourse } from "../store/action";
import { useHistory } from "react-router-dom";

const EditCourse = ({ selected, intl }) => {
  const history = useHistory();
  const dataEdit = selected || {};
  const dispatch = useDispatch();
  const CourseOptions = validateOptions.CourseOptions;
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState();
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (selected) {
      setValueDescription(htmlToDraftUtil(selected?.description || ""));
    }
  }, [selected]);

  const cate = yup.object({
    name: yup
      .string()
      .required(<FormattedMessage id="Tên môn học là bắt buộc" />),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(cate),
    mode: "all",
  });

  const onSubmit = async (values) => {
    const desc =
      (valueDescription &&
        draftToHtml(convertToRaw(valueDescription?.getCurrentContent()))) ||
      null;

    dispatch(
      updateCourse({
        id: selected?.id,
        data: {
          name: values?.name,
          description: desc || "",
          status: parseInt(values.status),
        },
      })
    );
    history.goBack();
  };

  return (
    <Card className="invoice-preview-card mb-0 p-3">
      <ExtensionsHeader title={<FormattedMessage id="Chỉnh sửa môn học" />} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Tên môn học" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder=""
            innerRef={register(CourseOptions.name)}
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

export default injectIntl(EditCourse);
