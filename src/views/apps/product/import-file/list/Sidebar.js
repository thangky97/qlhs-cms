import Sidebar from "@components/sidebar";
import { isObjEmpty } from "@utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import { convertFileToBase64, uploadImage } from "../../../../../helper/common";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validateOptions from "../../../../../constants/validate";
import { add } from "../store/action";
import { Editor } from "react-draft-wysiwyg";
import avatarBlank from "../../../../../assets/images/avatars/bg-blank.png";
import { EditorState } from "draft-js";

const SidebarAdd = ({ open, toggleSidebar, intl, disable, setDisable }) => {
  const [versionData, setVersionData] = useState(null);
  const store = useSelector((state) => state.versions);
  const VersionOptions = validateOptions.VersionOptions;
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, control } = useForm();
  const [valueDescription, setValueDescription] = useState(
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
  const onSubmit = (values) => {
    if (isObjEmpty(errors)) {
      setDisable(true);
      dispatch(
        add({
          product_id: parseInt(id),
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
    <Sidebar
      size="lg"
      open={open}
      title={<FormattedMessage id="Add New File" />}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="version">
            <FormattedMessage id="FileName" />{" "}
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
          />
          <small className="text-danger">
            {errors?.version && errors.version.message}
          </small>
        </FormGroup>

        <FormGroup>
          <Label for="link">
            <FormattedMessage id="TypeFile" />{" "}
          </Label>
          <Input
            name="link"
            id="link"
            placeholder=" "
            innerRef={register(VersionOptions.last_name)}
            onBlur={() => {
              let link = document.getElementById("link");
              if (link && link.value) {
                link.value = link.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["link"] })}
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
            type="textarea"
            innerRef={register(VersionOptions.infor)}
            onBlur={() => {
              let infor = document.getElementById("info");
              if (infor && infor.value) {
                infor.value = infor.value.trim();
              }
            }}
            className={classNames({ "is-invalid": errors["infor"] })}
          />
          <small className="text-danger">
            {errors?.infor && errors.infor.message}
          </small>
        </FormGroup> */}
        <FormGroup>
          <Label for="product_description">
            <FormattedMessage id="importFile" />{" "}
            <span className="text-danger"></span>
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
            editorState={valueDescription}
            onEditorStateChange={(data) => setValueDescription(data)}
            name="product_description"
            innerRef={register(VersionOptions.description_en)}
            // className={classNames({
            //   "is-invalid": errors["product_description"],
            // })}
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
            <FormattedMessage id="Save" />
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

export default injectIntl(SidebarAdd);
