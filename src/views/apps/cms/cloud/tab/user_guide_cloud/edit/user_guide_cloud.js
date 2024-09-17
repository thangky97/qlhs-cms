import { isObjEmpty } from "@utils";
import classNames from "classnames";
import draftToHtml from "draftjs-to-html";

import { convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";
import avatarBlank from "./../../../../../../../assets/images/avatars/bg-blank.png";

import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import request from "../../../../../../../services/request";
import api from "../../../../../../../constants/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { htmlToDraftUtil } from "../../../../../../../utility/Utils";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../../helper/common";

const CloudUserGuideTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const lang = useSelector((state) => state.common.language);
  const [cloud_userguide, setCloudUserGuide] = useState();
  const [avatar, setAvatar] = useState(avatarBlank);
  const [fileImage, setFileImage] = useState();
  const [type, setType] = useState();
  const [productData, setProductData] = useState(null);
  const [disable, setDisable] = useState(false);
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    setFileImage(e.target.files[0]);
    setAvatar(imageBase64);
  };
  useEffect(() => {
    if (productData) {
      setAvatar(productData.image);
    }
  }, [productData]);
  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null &&
        productData !== null &&
        selected.id !== productData.id)
    ) {
      setProductData(selected);
    }
  }, [selected, productData]);

  useEffect(() => {
    (async () => {
      const listAbout = await request.send({
        method: api.LIST_ABOUT.method,
        path: api.LIST_ABOUT.path,
        query: { lang },
      });
      if (listAbout?.data?.data?.length > 0) {
        setCloudUserGuide(listAbout?.data?.data[0]?.id);
        setValueDescription(
          htmlToDraftUtil(listAbout?.data?.data[0]?.user_guide_cloud || " ")
        );
      }
    })();
  }, []);

  const onSubmit = async () => {
    const user_guide_cloud = draftToHtml(
      convertToRaw(valueDescription.getCurrentContent())
    );

    setDisable(true);
    const dataAbout = await request.send({
      method: api.GET_ABOUT.method,
      path: api.GET_ABOUT.path,
      query: { lang, id: cloud_userguide },
    });
    const values = dataAbout.data;
    let data = {
      id: values.id,
      data: {
        about: values.about || " ",
        lang: values.lang,
        address_1: values.address_1 || " ",
        address_2: values.address_2 || " ",
        section_intro_1: values.section_intro_1 || " ",
        section_intro_2: values.section_intro_2 || " ",
        section_intro_3: values.section_intro_3 || " ",
        section_product: values.section_product || " ",
        section_partner: values.section_partner || " ",
        section_service: values.section_service || " ",
        section_about: values.section_about || " ",
        privacy_policy: values.privacy_policy || " ",
        company_name: values.company_name || " ",
        founded: values.founded || " ",
        officer: values.officer || " ",
        advisor: values.advisor || " ",
        faq: values.faq || " ",
        terms_of_use: values.terms_of_use || " ",
        my_cloud: values.my_cloud || " ",
        user_guide_cloud: user_guide_cloud || " ",
        link_cloud: values.link_cloud || " ",
      },
    };

    await request
      .send({
        method: api.UPDATE_ABOUT.method,
        path: api.UPDATE_ABOUT.path,
        data,
      })
      .then((result) => {
        if (result) {
          const { statusCode, data } = result;
          if (statusCode === 200) {
            toast.success(<FormattedMessage id={"Update successful!"} />);
            history.goBack();
          } else if (statusCode == 400) {
            toast.warn(<FormattedMessage id={"Update failed!"} />);
            setDisable(false);
          }
        }
      })
      .catch((result) => {
        setDisable(false);
      });
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
    <Row>
      <Col sm="12">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for="privacy_description">
              <FormattedMessage id="Description" />{" "}
              <span className="text-danger"></span>
            </Label>

            <Editor
              stripPastedStyles={true}
              toolbar={{
                image: { uploadCallback: uploadCallback },
              }}
              defaultEditorState={valueDescription}
              editorState={valueDescription}
              onEditorStateChange={(data) => setValueDescription(data)}
              name="privacy_description"
              className={classNames({
                "is-invalid": errors["privacy_description"],
              })}
            />
            <small className="text-danger">
              {errors?.description_en && errors.description_en.message}
            </small>
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
export default injectIntl(CloudUserGuideTab);
