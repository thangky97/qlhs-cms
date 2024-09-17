import { isObjEmpty } from "@utils";
import classNames from "classnames";
import draftToHtml from "draftjs-to-html";

import { convertToRaw, EditorState } from "draft-js";
import { validateOptions } from "postcss-rtl/lib/options";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";

import { useHistory, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import request from "../../../../../../../services/request";
import api from "../../../../../../../constants/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { htmlToDraftUtil } from "../../../../../../../utility/Utils";
const CityTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const lang = useSelector((state) => state.common.language);
  const [idPrivacy, setIdPrivacy] = useState();
  const [disable, setDisable] = useState(false);
  const [valueDescription, setValueDescription] = useState(
    EditorState.createEmpty()
  );
  useEffect(() => {
    (async () => {
      const listAbout = await request.send({
        method: api.LIST_ABOUT.method,
        path: api.LIST_ABOUT.path,
        query: { lang },
      });
      if (listAbout?.data?.data?.length > 0) {
        setIdPrivacy(listAbout?.data?.data[0]?.id);
        setValueDescription(
          htmlToDraftUtil(listAbout?.data?.data[0]?.terms_of_use || " ")
        );
      }
    })();
  }, []);

  const onSubmit = async () => {
    const privacy_policy = draftToHtml(
      convertToRaw(valueDescription.getCurrentContent())
    );
    setDisable(true);
    const dataAbout = await request.send({
      method: api.GET_ABOUT.method,
      path: api.GET_ABOUT.path,
      query: { lang, id: idPrivacy },
    });
    const values = dataAbout.data;
    let data = {
      id: values.id,
      data: {
        about: values.about || " ",
        lang: values.lang || " ",
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
        founded: values.founded || " ",
        officer: values.officer || " ",
        advisor: values.advisor || " ",
        faq: values.faq || " ",
        terms_of_use: privacy_policy || " ",
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
                options: ["inline", "textAlign"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
              }}
              editorState={valueDescription}
              onEditorStateChange={(data) => setValueDescription(data)}
              name="privacy_description"
              // innerRef={register(ProductOptions.description_en)}
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
export default injectIntl(CityTab);
