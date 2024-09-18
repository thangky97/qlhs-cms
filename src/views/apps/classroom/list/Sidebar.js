import Sidebar from "@components/sidebar";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import validateOptions from "@constants/validate";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addClassroom } from "../store/action";

const SidebarNewClassroom = ({
  intl,
  open,
  toggleSidebar,
  disable,
  setDisable,
}) => {
  const store = useSelector((state) => state.classrooms);

  const ClassroomOptions = validateOptions.ClassroomOptions;

  const dispatch = useDispatch();
  const cate = yup.object({
    name: yup
      .string()
      .required(<FormattedMessage id="Tên phòng học là bắt buộc" />),
    area: yup.string().required(<FormattedMessage id="Tên khu là bắt buộc" />),
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
      addClassroom({
        name: values?.name,
        area: values?.area,
        description: desc || "",
        status: parseInt(values.status) || 1,
      })
    );
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Thêm mới phòng học" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="area">
            <FormattedMessage id="Tên khu" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="area"
            id="area"
            placeholder=""
            innerRef={register(ClassroomOptions.area)}
            onBlur={() => {
              let area = document.getElementById("area");
              if (area && area.value) {
                area.value = area.value.trim();
              }
            }}
            className={classnames({ "is-invalid": errors["area"] })}
          />
          <small className="text-danger">
            {errors?.area && errors.area.message}
          </small>
          {errors?.area?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid area" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="name">
            <FormattedMessage id="Tên phòng học" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            placeholder=""
            innerRef={register(ClassroomOptions.name)}
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

export default injectIntl(SidebarNewClassroom);
