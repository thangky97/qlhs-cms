// ** React Import
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage } from "react-intl";
import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import { BG_BLANK } from "./../../../../../../constants/app";
import { Button, Form, FormGroup, Input, Label, Media, Row } from "reactstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { add } from "../store/action";
import { toast } from "react-toastify";

const SidebarAdd = ({
  open,
  toggleSidebar,
  avatar,
  setAvatar,
  valueContent,
  setValueContent,
  disable,
  setDisable,
}) => {
  // ** States
  const [fileImage, setFileImage] = useState();
  const lang = useSelector((state) => state.common.language);
  const store = useSelector((state) => state.sliders);
  const dispatch = useDispatch();
  // ** Vars
  const { register, errors, handleSubmit } = useForm();

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const onSubmit = async (values) => {
    const content =
      valueContent &&
      draftToHtml(convertToRaw(valueContent?.getCurrentContent()));

    if (isObjEmpty(errors)) {
      setDisable(true);
      var urlImage = "";
      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData[1]) {
          if (newData[1] == BG_BLANK) {
            toast.error(<FormattedMessage id="Image is required" />);
            setDisable(false);
            return;
          }
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
              title: values.title || undefined,
              lang,
              image: urlImage,
              content: content,
              url: values.url || " ",
            })
          );
        }
      }
    }
  };
  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Slide banner" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="title">
            <FormattedMessage id="Title" />{" "}
          </Label>
          <Input
            name="title"
            id="title"
            placeholder=" "
            innerRef={register({
              required: false,
            })}
            onBlur={() => {
              let title = document.getElementById("title");
              if (title && title.value) {
                title.value = title.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["title"] })}
          />
          <small className="text-danger">
            {errors?.title && errors.title.message}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="content">
            <FormattedMessage id="Content" />
          </Label>
          <Editor
            stripPastedStyles={true}
            toolbar={{
              options: ["inline", "textAlign"],
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
            }}
            editorState={valueContent}
            onEditorStateChange={(data) => setValueContent(data)}
            name="content"
            id="content"
            className={classNames({ "is-invalid": errors["content"] })}
          />
          <small className="text-danger">
            {errors?.content && errors.content.message}
          </small>
        </FormGroup>
        <FormGroup>
          <Label for="url">
            <FormattedMessage id="Link url" />{" "}
          </Label>
          <Input
            name="url"
            id="url"
            placeholder=" "
            innerRef={register({
              required: false,
            })}
            onBlur={() => {
              let title = document.getElementById("url");
              if (title && title.value) {
                title.value = title.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["url"] })}
          />
          <small className="text-danger">
            {errors?.title && errors.title.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="Image">
            <FormattedMessage id="Image" />
            <span className="text-danger"></span>
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
              <Button.Ripple tag={Label} className="mt-1" color="primary">
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

export default SidebarAdd;
