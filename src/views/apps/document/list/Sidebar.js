import Sidebar from "@components/sidebar";
import classNames from "classnames";
import { convertToRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import avatarBlank from "../../../../assets/images/avatars/bg-blank.png";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";

import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import validateOptions from "../../../../constants/validate";
import {
  convertFileToBase64,
  uploadImage,
  validateEditor,
} from "../../../../helper/common";
import { add } from "../store/action";

const SidebarAdd = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  valueContent,
  setValueContent,
  intl,
  disable,
  setDisable,
  editorState,
  setEditorState,
}) => {
  const lang = useSelector((state) => state.common.language);
  const [isSubmit, setIsSubmit] = useState(false);
  const [product_description, setProduct_description] = useState(" ");
  const [fileImage, setFileImage] = useState();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.documents);
  const [staffData, setstaffData] = useState(null);
  const { register, errors, control, setValue, setError, handleSubmit } =
    useForm();
  const DocumentOptions = validateOptions.DocumentOptions;
  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };
  const handleError = () => {
    setIsSubmit(true);
    if (validateEditor(product_description)) {
      setEditorState({
        classError: "invalid-editor is-invalid form-control",
        descriptionError: <FormattedMessage id="The description is required" />,
      });
    } else {
      setEditorState(null);
    }
  };
  const handleOnchangeStateEditor = (data) => {
    setValueContent(data);

    const product_description =
      data && draftToHtml(convertToRaw(data.getCurrentContent()));
    setProduct_description(product_description);
  };
  useEffect(() => {
    if (isSubmit) {
      const check = validateEditor(product_description);

      if (check === true) {
        setEditorState({
          classError: "invalid-editor is-invalid form-control",
          descriptionError: (
            <FormattedMessage id="The description is required" />
          ),
        });
      } else {
        setEditorState({});
      }
    }
  }, []);

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const onSubmit = async (values) => {
    if (validateEditor(product_description)) {
      setEditorState({
        classError: "invalid-editor is-invalid form-control",
        descriptionError: <FormattedMessage id="The description is required" />,
      });
      return;
    }

    setDisable(true);
    var urlImage = " ";
    if (avatar) {
      const newData = avatar.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const data = {
          imageData: newData[1],
          imageFormat: fileImage?.type?.split("/")[1] || "png",
        };
        await uploadImage(data, fileImage).then((res) => {
          urlImage = res?.data;
        });
      } else {
        urlImage = avatar;
      }

      if (urlImage) {
        dispatch(
          add({
            ...values,
            lang,
            image: urlImage || undefined,
            content: product_description,
            type: "blog",
          })
        );
      }
    }
  };
  const uploadCallback = async (file) => {
    var linkImg = avatarBlank;
    const imageBase64 = await convertFileToBase64(file);
    if (imageBase64) {
      const newData = imageBase64.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const data = {
          imageData: newData[1],
          imageFormat: file?.type?.split("/")[1] || "png",
        };
        await uploadImage(data, file).then((res) => {
          linkImg = res?.data;
        });
      }
    }
    return new Promise((resolve, reject) => {
      resolve({ data: { link: linkImg } });
    });
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New News" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit, handleError)}>
        <FormGroup>
          <Label for="sort_order">
            <FormattedMessage id="sort_order" />{" "}
          </Label>
          <Input
            name="sort_order"
            id="sort_order"
            placeholder=" "
            defaultValue="1"
            innerRef={register(DocumentOptions.sort_order)}
            onBlur={() => {
              let sort_order = document.getElementById("sort_order");
              if (sort_order && sort_order.value) {
                sort_order.value = sort_order.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["sort_order"] })}
          />
          <small className="text-danger">
            {errors?.sort_order && errors.sort_order.message}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="label">
            <FormattedMessage id="Label" />
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="label"
            id="label"
            placeholder=""
            innerRef={register(DocumentOptions.label)}
            onBlur={() => {
              let label1 = document.getElementById("label");
              if (label1 && label1.value) {
                label1.value = label1.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["label"] })}
            defaultValue={
              staffData && staffData.data?.document_labels[0]?.label
            }
          />
          <small className="text-danger">
            {errors?.label && errors.label.message}
          </small>
          {errors?.label?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid label" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="short_content">
            <FormattedMessage id="Short Content" />
            <span className="text-danger">*</span>
          </Label>
          <Input
            name="short_content"
            id="short_content"
            placeholder=""
            innerRef={register(DocumentOptions.short_content)}
            onBlur={() => {
              let shortContent = document.getElementById("short_content");
              if (shortContent && shortContent.value) {
                shortContent.value = shortContent.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["short_content"] })}
          />
          <small className="text-danger">
            {errors?.short_content && errors.short_content.message}
          </small>

          {errors?.short_content?.type == "validate" && (
            <small className="text-danger">
              <FormattedMessage id="Invalid short content" />
            </small>
          )}
        </FormGroup>

        <FormGroup>
          <Label for="content">
            <FormattedMessage id="Content" />{" "}
            <span className="text-danger">*</span>
          </Label>
          <Editor
            stripPastedStyles={true}
            toolbar={{
              // options: ["inline", "textAlign"],
              // inline: {
              //   inDropdown: false,
              //   options: ["bold", "italic", "underline"],
              // },
              image: { uploadCallback: uploadCallback },
            }}
            defaultEditorState={valueContent}
            editorState={valueContent}
            toolbarClassName="toolbarClassName"
            wrapperClassName={"wrapperClassName " + editorState?.classError}
            editorClassName="editorClassName "
            onEditorStateChange={(e) => {
              handleOnchangeStateEditor(e);
            }}
            name="product_description"
            className={classNames({
              "is-invalid": errors["product_description"],
            })}
          />
          {editorState && (
            <small className="text-danger">
              {editorState.descriptionError}
            </small>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="open">
            <FormattedMessage id="status" />
          </Label>

          <Input
            type="select"
            name="open"
            id="open"
            defaultValue={staffData && staffData.status}
            innerRef={register({ required: true })}
          >
            <option value="1">{intl.formatMessage({ id: "Opened" })}</option>
            <option value="0">
              {intl.formatMessage({ id: "Not opened" })}
            </option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Image" />
          </Label>
          <Row className="align-items-end p-1">
            <Media className="mr-25" left>
              <Media
                object
                className="rounded mr-50"
                src={avatar}
                height="100"
                width="100"
              />
            </Media>{" "}
            <Row className="flex-column px-1">
              <Button.Ripple
                tag={Label}
                className="mt-1"
                outline
                color="primary"
              >
                <FormattedMessage id="Upload" />
                <Input
                  type="file"
                  onChange={(e) => onChange(e)}
                  hidden
                  accept="image/*"
                />
              </Button.Ripple>
            </Row>
          </Row>
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
            Editor=""
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
