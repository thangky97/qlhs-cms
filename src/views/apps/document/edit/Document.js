import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage, injectIntl } from "react-intl";
import avatarBlank from "./../../../../assets/images/avatars/bg-blank.png";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
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
import validateOptions from "../../../../constants/validate";
import { convertFileToBase64, uploadImage } from "../../../../helper/common";
import { htmlToDraftUtil } from "../../../../utility/Utils";
import { update } from "../store/action";

const DocumentTab = ({ selected, common, intl }) => {
  const dispatch = useDispatch();
  const [description, setdescription] = useState(" ");
  const DocumentOptions = validateOptions.DocumentOptions;
  const [disable, setDisable] = useState(false);
  const store = useSelector((state) => state.documents);
  const [avatar, setAvatar] = useState(avatarBlank);
  const [valueContent, setValueContent] = useState(EditorState.createEmpty());
  const [fileImage, setFileImage] = useState();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [documentData, setDocumentData] = useState(null);

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
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        documentData !== null &&
        selected.id !== documentData.id)
    ) {
      setDocumentData(selected);
    }
  }, [selected]);
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

  const onSubmit = async (values) => {
    setDisable(true);
    var urlImage = " ";
    if (avatar) {
      const newData = avatar.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const data = {
          imageData: newData[1],
          imageFormat: fileImage.type.split("/")[1],
        };
        await uploadImage(data, fileImage).then((res) => {
          urlImage = res?.data;
        });
      } else {
        urlImage = avatar;
      }
      if (urlImage) {
        dispatch(
          update({
            document_id: parseInt(id),
            image: urlImage,
            ...values,
            content: description,
            open: parseInt(values.open),
            lang: common?.language,
          })
        );
      }
    }
  };
  useEffect(() => {
    if (store.status == 200) {
      history.goBack();
    }
  }, [store.status]);
  useEffect(() => {
    if (documentData) {
      setAvatar(documentData?.image);
      setType(documentData?.type);
      setStatus(documentData?.open);
      setValueContent(
        htmlToDraftUtil(documentData?.document_contents[0]?.content || " ")
      );
    }
  }, [documentData]);

  useEffect(() => {
    if (valueContent) {
      const description = draftToHtml(
        convertToRaw(valueContent.getCurrentContent())
      );
      setdescription(description);
    }
  }, [valueContent]);

  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body>
            <h4>{selected.username} </h4>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="sort_order">
              <FormattedMessage id="sort_order" />{" "}
            </Label>
            <Input
              name="sort_order"
              id="sort_order"
              placeholder=" "
              innerRef={register(DocumentOptions.sort_order)}
              defaultValue={documentData && documentData?.sort_order}
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
              <FormattedMessage id="Label" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="label"
              id="label"
              placeholder=""
              innerRef={register(DocumentOptions.label)}
              onBlur={() => {
                let label2 = document.getElementById("label");
                if (label2 && label2.value) {
                  label2.value = label2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["label"] })}
              defaultValue={
                documentData && documentData?.document_labels[0]?.label
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
              <FormattedMessage id="Short Content" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="short_content"
              id="short_content"
              placeholder=""
              innerRef={register(DocumentOptions.short_content)}
              onBlur={() => {
                let shortContent2 = document.getElementById("short_content");
                if (shortContent2 && shortContent2.value) {
                  shortContent2.value = shortContent2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["short_content"] })}
              defaultValue={
                documentData &&
                documentData?.document_contents[0]?.short_content
              }
            />
            <small className="text-danger">
              {errors?.short_content && errors.short_content.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="product_description">
              <FormattedMessage id="Description" />{" "}
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
              wrapperClassName={"wrapperClassName"}
              editorClassName="editorClassName "
              onEditorStateChange={(data) => setValueContent(data)}
              name="product_description"
              className={classNames({
                "is-invalid": errors["description"],
              })}
            />
          </FormGroup>

          <FormGroup>
            <Label for="open">
              <FormattedMessage id="open" />
            </Label>

            <Input
              type="select"
              name="open"
              id="open"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              defaultValue={documentData && documentData.status}
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
              onClick={() => history.goBack()}
            >
              <FormattedMessage id="Cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default injectIntl(DocumentTab);
