import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
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
import validateOptions from "../../../../../constants/validate";
import { convertFileToBase64, uploadImage } from "../../../../../helper/common";
import avatarBlank from "../../../../../assets/images/avatars/bg-blank.png";
import { update } from "../store/action";

const VersionTab = ({ selected, common, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const [versionData, setVersionData] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const store = useSelector((state) => state.versions);

  const [disable, setDisable] = useState(false);
  const VersionOptions = validateOptions.VersionOptions;

  const [valueDescription, setValueDescription] = useState(() =>
    EditorState.createEmpty()
  );

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

  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);
  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        versionData !== null &&
        selected.id !== versionData.id)
    ) {
      setVersionData(selected);
    }
  }, [selected]);
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        update({
          id: parseInt(id),
          data: {
            ...values,
            info: values.info || " ",
            link: values.link || " ",
          },
        })
      );
    }
  };
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
            <Label for="version">
              <FormattedMessage id="VideoName" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="version"
              id="version"
              placeholder=" "
              innerRef={register(VersionOptions.version)}
              onBlur={() => {
                let versionl = document.getElementById("version");
                if (versionl && versionl.value) {
                  versionl.value = versionl.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["version"] })}
              defaultValue={versionData && versionData.version}
            />
            <small className="text-danger">
              {errors?.version && errors.version.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="link">
              <FormattedMessage id="TypeVideo" />{" "}
              <span className="text-danger">*</span>
            </Label>
            <Input
              name="link"
              id="link"
              placeholder=" "
              innerRef={register(VersionOptions.last_name)}
              className={classNames({ "is-invalid": errors["link"] })}
              onBlur={() => {
                let link = document.getElementById("link");
                if (link && link.value) {
                  link.value = link.value.trim();
                }
              }}
              defaultValue={versionData && versionData.link}
            />
            <small className="text-danger">
              {errors?.last_name && errors.last_name.message}
            </small>
          </FormGroup>
          {/* <FormGroup>
            <Label for="info">
              <FormattedMessage id="infor" />{" "}
            </Label>
            <Input
              name="info"
              id="info"
              placeholder=" "
              innerRef={register(VersionOptions.infor)}
              onBlur={() => {
                let infor = document.getElementById("info");
                if (infor && infor.value) {
                  infor.value = infor.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["infor"] })}
              defaultValue={versionData && versionData.info}
            />
            <small className="text-danger">
              {errors?.infor && errors.infor.message}
            </small>
          </FormGroup> */}
          <FormGroup>
            <Label for="product_description">
              <FormattedMessage id="importVideo" />{" "}
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
              defaultEditorState={valueDescription}
              editorState={valueDescription}
              onEditorStateChange={(data) => setValueDescription(data)}
              name="product_description"
              innerRef={register(VersionOptions.description_en)}
              className={classNames({
                "is-invalid": errors["product_description"],
              })}
            />
            <small className="text-danger">
              {errors?.description_en && errors.description_en.message}
            </small>
          </FormGroup>
          <FormGroup>
            <Label for="status">
              <FormattedMessage id="status" />
            </Label>

            <Input
              type="select"
              name="status"
              id="status"
              defaultValue={versionData && versionData.status}
              innerRef={register({ required: true })}
            >
              <option value="1">{intl.formatMessage({ id: "Active" })}</option>
              <option value="0">
                {intl.formatMessage({ id: "Deactive" })}
              </option>
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
      </Col>
    </Row>
  );
};
export default injectIntl(VersionTab);
