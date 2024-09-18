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
  const { staffs } = useSelector((state) => state.department);

  const [changeSelect, setChangeSelect] = useState();

  const DepartmentOptions = validateOptions.DepartmentOptions;

  const dispatch = useDispatch();
  const cate = yup.object({
    name: yup
      .string()
      .required(<FormattedMessage id="Tên bộ môn là bắt buộc" />),
    // position: yup
    //   .string()
    //   .required(<FormattedMessage id="Chức vụ là bắt buộc" />),
    usersId: yup
      .number()
      .required(<FormattedMessage id="Vui lòng chọn giảng viên" />),
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
        name: values?.name,
        position: values?.position || "",
        description: desc || "",
        usersId: parseInt(values?.usersId),
        status: parseInt(values.status) || 1,
      })
    );
    toggleSidebar();
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Thêm mới bộ môn" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>
            <FormattedMessage id="instructors" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Controller
            control={control}
            name="usersId"
            render={({ field }) => {
              return (
                <Select
                  id="usersId"
                  innerRef={register}
                  name="usersId"
                  className={classnames(
                    "react-select",
                    !changeSelect
                      ? {
                          "is-invalid": errors["usersId"],
                        }
                      : ""
                  )}
                  options={staffs?.data?.map((item, index) => {
                    return {
                      value: item?.id,
                      label: `${item?.last_name} ${item?.first_name}`,
                      number: index + 1,
                    };
                  })}
                  classNamePrefix="select"
                  {...field}
                  onChange={(e) => {
                    setError("usersId", "");
                    setValue("usersId", e?.value);
                  }}
                />
              );
            }}
          ></Controller>
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

export default injectIntl(SidebarNewDepartment);
