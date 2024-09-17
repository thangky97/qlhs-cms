import { convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage } from "react-intl";
import { isObjEmpty } from "@utils";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";
import avatarBlank from "./../../../../../../assets/images/avatars/bg-blank.png";
import classNames from "classnames";
import draftToHtml from "draftjs-to-html";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Media,
  Row,
} from "reactstrap";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { update } from "../store/action";
import { toast } from "react-toastify";
import { BG_BLANK } from "../../../../../../constants/app";

const SliderTab = ({ selected }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [sliderData, setSliderData] = useState(null);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(avatarBlank);
  const [fileImage, setFileImage] = useState();
  const lang = useSelector((state) => state.common.language);
  const store = useSelector((state) => state.sliders);
  const [valueContent, setValueContent] = useState(EditorState.createEmpty());
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };
  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        sliderData !== null &&
        selected.id !== sliderData.id)
    ) {
      setSliderData(selected);
    }
  }, [selected]);
  useEffect(() => {
    if (store.status == 200) {
      history.goBack();
    }
  }, [store.status]);
  useEffect(() => {
    if (sliderData) {
      setAvatar(sliderData.image);
      setValueContent(htmlToDraftUtil(sliderData?.content || " "));
    }
  }, [sliderData]);
  const onSubmit = async (values) => {
    const content =
      valueContent &&
      draftToHtml(convertToRaw(valueContent?.getCurrentContent()));
    if (isObjEmpty(errors)) {
      setDisable(true);
      var urlImage = "";
      if (avatar) {
        const newData = avatar.replace(/,/gi, "").split("base64");
        if (newData.length > 1 && newData[1]) {
          const data = {
            imageData: newData[1],
            imageFormat: fileImage.type.split("/")[1],
          };
          await uploadImage(data, fileImage).then((res) => {
            urlImage = res?.data;
          });
        } else {
          urlImage = avatar;
          if (urlImage == BG_BLANK) {
            toast.error(<FormattedMessage id="Image is required" />);
            return;
          }
        }
      }
      if (urlImage) {
        dispatch(
          update({
            id: parseInt(sliderData.id),
            data: {
              title: values.title || " ",
              lang,
              image: urlImage,
              content: content,
              url: values.url || " ",
              priority_index: parseInt(values.priority_index),
            },
          })
        );
      }
    }
  };
  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body></Media>
        </Media>
      </Col>
      <Col sm="12">
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
                let title2 = document.getElementById("title");
                if (title2 && title2.value) {
                  title2.value = title2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["title"] })}
              defaultValue={sliderData?.title}
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
              defaultValue={selected.url}
            />
            <small className="text-danger">
              {errors?.title && errors.title.message}
            </small>
          </FormGroup>
          <FormGroup>
            <Label for="index">
              <FormattedMessage id="index" />{" "}
            </Label>
            <Input
              name="priority_index"
              id="priority_index"
              placeholder=" "
              innerRef={register({
                required: false,
              })}
              onBlur={() => {
                let title = document.getElementById("priority_index");
                if (title && title.value) {
                  title.value = title.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["priority_index"] })}
              defaultValue={sliderData?.priority_index}
            />
            <small className="text-danger">
              {errors?.title && errors.title.message}
            </small>
          </FormGroup>
          <FormGroup>
            <Label for="Image">
              <FormattedMessage id="Image" />
            </Label>
            <Row className="align-items-end p-1">
              <Media className="mr-25" left>
                <Media
                  object
                  className="rounded mr-50 objectFit-contain"
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
              <FormattedMessage id="update" />
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={() => {
                history.goBack();
              }}
            >
              <FormattedMessage id="cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default SliderTab;
