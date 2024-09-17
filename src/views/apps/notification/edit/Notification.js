import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import "react-phone-number-input/style.css";

import { isObjEmpty, scrollToTop } from "@utils";

import classnames from "classnames";
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
import { updateNotification } from "../store/action";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { htmlToDraftUtil } from "../../../../utility/Utils";
import classNames from "classnames";
import Select from "react-select";
import {} from "react-scroll-up";
import { validateEditor } from "../../../../helper/common";

const NotificationTab = ({ selected, intl }) => {
  const store = useSelector((state) => state.notification);
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const lang = useSelector((state) => state.common.language);
  const [editorState, setEditorState] = useState(null);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [disable, setDisable] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [valueContent, setValueContent] = useState("");
  const { id } = useParams();
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (store.status === 200) {
      scrollToTop();
      history.push("/apps/notification/list");
    }
  }, [store.status, history]);
  useEffect(() => {
    if (valueDescription) {
      const description =
        valueDescription &&
        draftToHtml(convertToRaw(valueDescription.getCurrentContent()));
      setValueContent(description);
    }
  }, [valueDescription]);

  useEffect(() => {
    if (isSubmit) {
      const check = validateEditor(valueContent);
      if (check === true) {
        setEditorState({
          classError: "invalid-editor is-invalid form-control",
          descriptionError: <FormattedMessage id="The content is required" />,
        });
      } else {
        setEditorState({});
      }
    }
  }, [valueContent, isSubmit]);

  const onSubmit = async (values) => {
    setIsSubmit(true);
    if (validateEditor(valueContent)) {
      setEditorState({
        classError: "invalid-editor is-invalid form-control",
        correct_answerError: <FormattedMessage id="The content is required" />,
      });
    } else {
      const description = draftToHtml(
        convertToRaw(valueDescription.getCurrentContent())
      );

      // if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        updateNotification({
          code: selected?.code,
          data: {
            message_content: description,
          },
        })
      );
    }

    // }
  };

  useEffect(() => {
    if (Object.keys(selected)) {
      setStatus(selected.status);
      setValueDescription(htmlToDraftUtil(selected?.message_content || " "));
    }
  }, [selected]);
  return (
    <Row>
      <Col sm="12">
        <Media className="mb-2">
          <Media className="mt-50" body>
            <h4>{selected.name} </h4>
          </Media>
        </Media>
      </Col>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="name">
              <FormattedMessage id="code_notification" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="code"
              id="code"
              readOnly
              defaultValue={selected && selected.code}
            />
          </FormGroup>

          <FormGroup>
            <Label for="product">
              <FormattedMessage id="Course" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="product"
              id="product"
              readOnly
              defaultValue={
                (selected && selected?.product?.product_names[0]?.name) || ""
              }
            />
          </FormGroup>

          {selected?.message_type === 0 &&
            Object.keys(selected?.user || {})?.length > 0 && (
              <FormGroup>
                <Label for="user">
                  <FormattedMessage id="User" />{" "}
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  name="user"
                  id="user"
                  readOnly
                  defaultValue={
                    (selected &&
                      selected?.user?.first_name +
                        " " +
                        selected?.user?.last_name) ||
                    ""
                  }
                />
              </FormGroup>
            )}

          <FormGroup>
            <Label for="description">
              <FormattedMessage id="message_content" />{" "}
            </Label>

            <Editor
              toolbar={{
                options: ["inline", "textAlign"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
              }}
              stripPastedStyles={true}
              editorState={valueDescription}
              onEditorStateChange={(data) => setValueDescription(data)}
              toolbarClassName="toolbarClassName"
              wrapperClassName={"wrapperClassName " + editorState?.classError}
              editorClassName="editorClassName "
              name="description"
              innerRef={register}
              className={classNames({
                "is-invalid": errors["description"],
              })}
            />
            {editorState && (
              <small className="text-danger">
                {editorState.descriptionError}
              </small>
            )}
          </FormGroup>

          <div style={{ textAlign: "end", marginTop: "145px" }}>
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
export default injectIntl(NotificationTab);
