import ExtensionsHeader from "@components/extensions-header";
import { isObjEmpty } from "@utils";
import classNames from "classnames";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
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
import { getData, update } from "../store/action";
import SectionContent1 from "./content/SectionContent1";
import SectionContent2 from "./content/SectionContent2";
import SectionContent3 from "./content/SectionContent3";
import SectionContentAbout from "./content/SectionContentAbout";
import SectionContentPartner from "./content/SectionContentPartner";
import SectionContentProduct from "./content/SectionContentProduct";
import SectionContentService from "./content/SectionContentService";
import SectionSystem from "./content/SectionSystem";
const AboutTab = ({ selected, intl, idAbout }) => {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [disable, setDisable] = useState(false);
  const [valueContentIntro1, setValueContentIntro1] = useState(() =>
    EditorState.createEmpty()
  );
  const [valueContentIntro2, setValueContentIntro2] = useState(() =>
    EditorState.createEmpty()
  );
  const [valueContentIntro3Content1, setValueContentIntro3Content1] = useState(
    () => EditorState.createEmpty()
  );
  const [valueContentIntro3Content2, setValueContentIntro3Content2] = useState(
    () => EditorState.createEmpty()
  );
  const [valueContentIntro3Content3, setValueContentIntro3Content3] = useState(
    () => EditorState.createEmpty()
  );

  const [valueContentProduct, setValueContentProduct] = useState(() =>
    EditorState.createEmpty()
  );

  const [valueContentAbout, setValueContentAbout] = useState(() =>
    EditorState.createEmpty()
  );

  const [valueContentPartner, setValueContentPartner] = useState(() =>
    EditorState.createEmpty()
  );

  const [dataServiceEditor, setDataServiceEditor] = useState([]);

  const store = useSelector((state) => state.abouts);
  const lang = useSelector((state) => state.common.language);

  const [aboutData, setAboutData] = useState(null);

  const AboutOptions = validateOptions.AboutOptions;
  const dispatch = useDispatch();

  const clonePost = useCallback((parentId, chillrenId) => {
    const elems = document.querySelectorAll(`${parentId} ${chillrenId}`);
    const elem = elems[elems.length - 1];
    var clone = elem.cloneNode(true);
    clone.id = parentId + "-" + (elems.length + 1);
    elem.after(clone);

    const titles = document.querySelectorAll(`${parentId} .title`);
    const title = titles[titles.length - 1];
    title.innerHTML = `- Post ${elems.length + 1}`;
  }, []);
  const deleteElement = useCallback((id) => {
    document.getElementById(id).remove();
  }, []);

  useEffect(() => {
    if (
      selected !== null ||
      (selected !== null && aboutData !== null && selected.id !== aboutData.id)
    ) {
      setAboutData(selected);
    }
  }, [selected, lang]);
  useEffect(() => {
    if (store?.err?.statusCode) {
      setDisable(false);
    }
  }, [store?.err]);

  const getDataIntro = (introId) => {
    const posts = document.querySelectorAll(`${introId} .post`);
    let object = {};

    posts.forEach((item) => {
      let formControls = document.querySelectorAll(
        `${introId} #${item.id} .form-group .form-control`
      );
      formControls.forEach((formElem) => {
        object[formElem.name] =
          formElem.value || formElem.getAttribute("value");
      });
    });
    return object;
  };

  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      const contentIntro1 = draftToHtml(
        convertToRaw(valueContentIntro1.getCurrentContent())
      );

      const contentIntro2 = draftToHtml(
        convertToRaw(valueContentIntro2.getCurrentContent())
      );

      const contentIntro3Content1 = draftToHtml(
        convertToRaw(valueContentIntro3Content1.getCurrentContent())
      );
      const contentIntro3Content2 = draftToHtml(
        convertToRaw(valueContentIntro3Content2.getCurrentContent())
      );
      const contentIntro3Content3 = draftToHtml(
        convertToRaw(valueContentIntro3Content3.getCurrentContent())
      );

      const contentProduct = draftToHtml(
        convertToRaw(valueContentProduct.getCurrentContent())
      );

      const contentAubout = draftToHtml(
        convertToRaw(valueContentAbout.getCurrentContent())
      );

      const contentServiceList =
        dataServiceEditor?.length > 0 &&
        dataServiceEditor.map((item) => {
          return {
            ...item,
            content_service: draftToHtml(
              convertToRaw(item?.content_service?.getCurrentContent())
            ),
          };
        });

      const contentPartner = draftToHtml(
        convertToRaw(valueContentPartner.getCurrentContent())
      );

      let intro1 = {
        ...getDataIntro("#section-content-1"),
        content_content1: contentIntro1 || "",
      };

      let intro2 = {
        ...getDataIntro("#section-content-2"),
        content_content2: contentIntro2 || "",
      };
      let intro3 = {
        ...getDataIntro("#section-content-3"),
        content1_content3: contentIntro3Content1 || "",
        content2_content3: contentIntro3Content2 || "",
        content3_content3: contentIntro3Content3 || "",
      };

      let introProduct = {
        ...getDataIntro("#section-content-product"),
        content_product: contentProduct || "",
      };

      let introService = {
        ...getDataIntro("#section-content-service"),
      };
      let introAbout = {
        ...getDataIntro("#section-content-about"),
        content_about: contentAubout || "",
      };
      let introPartner = {
        ...getDataIntro("#section-content-partner"),
        content_partner: contentPartner || "",
      };
      let introSystem = getDataIntro("#section-system");

      dispatch(
        update({
          id: idAbout && parseInt(idAbout),
          data: {
            ...values,
            lang: lang,
            company_name: values.company_name || " ",
            founded: values.founded || " ",
            officer: values.officer || "officer",
            advisor: values.advisor || " ",
            address_1: values.address_1 || " ",
            address_2: values.address_2 || " ",
            section_intro_1: (intro1 && JSON.stringify(intro1)) || undefined,
            section_intro_2: (intro2 && JSON.stringify(intro2)) || undefined,
            section_intro_3: (intro3 && JSON.stringify(intro3)) || undefined,
            section_product:
              (introProduct && JSON.stringify(introProduct)) || undefined,
            section_partner:
              (introPartner && JSON.stringify(introPartner)) || undefined,
            section_service:
              (introService &&
                JSON.stringify({
                  ...introService,
                  data: contentServiceList || [],
                })) ||
              undefined,
            section_about:
              (introAbout && JSON.stringify(introAbout)) || undefined,
            privacy_policy: aboutData.privacy_policy,
            faq: aboutData.faq,
            terms_of_use: aboutData.terms_of_use || "terms of use",
            section_system:
              (introSystem && JSON.stringify(introSystem)) || undefined,
          },
        })
      );
    }
  };
  useEffect(() => {
    if (store.status == 200) {
      history.push("/apps/cms/setting/list#about");
    }
  }, [store.status]);
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
        <Form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
          <SectionContent2
            {...{
              clonePost,
              aboutData,
              deleteElement,
              setValueContentIntro2,
            }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContentAbout
            {...{ clonePost, aboutData, deleteElement, setValueContentAbout }}
          />

          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContentProduct
            {...{ clonePost, aboutData, deleteElement, setValueContentProduct }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContent1
            {...{ clonePost, aboutData, deleteElement, setValueContentIntro1 }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContentService
            {...{
              clonePost,
              aboutData,
              deleteElement,
              dataServiceEditor,
              setDataServiceEditor,
            }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContent3
            {...{
              clonePost,
              aboutData,
              deleteElement,
              setValueContentIntro3Content1,
              setValueContentIntro3Content2,
              setValueContentIntro3Content3,
            }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionContentPartner
            {...{ clonePost, aboutData, deleteElement, setValueContentPartner }}
          />
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <div className="text-center">
            <ExtensionsHeader title={<FormattedMessage id="contact" />} />
          </div>
          <FormGroup>
            <Label for="company_name">
              <FormattedMessage id="company name" />{" "}
              {/* <span className="text-danger">*</span> */}
            </Label>
            <Input
              name="company_name"
              id="company_name"
              placeholder=""
              innerRef={register(AboutOptions.about)}
              onBlur={() => {
                let about2 = document.getElementById("company_name");
                if (about2 && about2.value) {
                  about2.value = about2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["company_name"] })}
              defaultValue={aboutData?.company_name}
            />
          </FormGroup>
          {/* editor */}
          {/* <FormGroup>
            <Label for="company_name">
              <FormattedMessage id="company name" />
            </Label>
            <Editor
              toolbar={{
                options: ["inline", "textAlign"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline"],
                },
              }}
              defaultEditorState={valueContent}
              editorState={valueContent}
              toolbarClassName="toolbarClassName"
              editorClassName="editorClassName "
              wrapperClassName="wrapperClassName"
              onEditorStateChange={(data) => {
                setValueContent(data);
                setValueContentIntro1(data);
              }}
              name="company_name"
            />
          </FormGroup> */}

          <FormGroup>
            <Label for="founded">
              <FormattedMessage id="founded" />{" "}
              {/* <span className="text-danger">*</span> */}
            </Label>
            <Input
              name="founded"
              id="founded"
              placeholder=""
              innerRef={register(AboutOptions.about)}
              onBlur={() => {
                let about2 = document.getElementById("founded");
                if (about2 && about2.value) {
                  about2.value = about2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["founded"] })}
              defaultValue={aboutData?.founded}
            />
          </FormGroup>

          <FormGroup>
            <Label for="officer">
              <FormattedMessage id="officer" />{" "}
              {/* <span className="text-danger">*</span> */}
            </Label>
            <Input
              name="officer"
              id="officer"
              type="textarea"
              placeholder=""
              innerRef={register(AboutOptions.about)}
              onBlur={() => {
                let about2 = document.getElementById("officer");
                if (about2 && about2.value) {
                  about2.value = about2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["officer"] })}
              defaultValue={aboutData?.officer}
            />
          </FormGroup>

          <FormGroup>
            <Label for="advisor">
              <FormattedMessage id="advisor" />{" "}
              {/* <span className="text-danger">*</span> */}
            </Label>
            <Input
              name="advisor"
              id="advisor"
              placeholder=""
              innerRef={register(AboutOptions.about)}
              onBlur={() => {
                let about2 = document.getElementById("advisor");
                if (about2 && about2.value) {
                  about2.value = about2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["advisor"] })}
              defaultValue={aboutData?.advisor}
            />
          </FormGroup>

          <FormGroup>
            <Label for="about">
              <FormattedMessage id="about title" />{" "}
              {/* <span className="text-danger">*</span> */}
            </Label>
            <Input
              name="about"
              id="about"
              placeholder=""
              innerRef={register(AboutOptions.about)}
              onBlur={() => {
                let about2 = document.getElementById("about");
                if (about2 && about2.value) {
                  about2.value = about2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["about"] })}
              defaultValue={aboutData?.about}
            />
            <small className="text-danger">
              {errors?.about && errors.about.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="address_1">
              <FormattedMessage id="Address 1" />
            </Label>
            <Input
              name="address_1"
              id="address_1"
              type="textarea"
              defaultValue={aboutData?.address_1}
              innerRef={register(AboutOptions.address_1)}
              onBlur={() => {
                let addressl1 = document.getElementById("address_1");
                if (addressl1 && addressl1.value) {
                  addressl1.value = addressl1.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["address_1"] })}
            />
            <small className="text-danger">
              {errors?.address_1 && errors.address_1.message}
            </small>
          </FormGroup>

          <FormGroup>
            <Label for="address_2">
              <FormattedMessage id="Address 2" />
            </Label>
            <Input
              name="address_2"
              id="address_2"
              type="textarea"
              defaultValue={aboutData?.address_2}
              innerRef={register(AboutOptions.address_2)}
              onBlur={() => {
                let addressl2 = document.getElementById("address_2");
                if (addressl2 && addressl2.value) {
                  addressl2.value = addressl2.value.trim();
                }
              }}
              className={classNames({ "is-invalid": errors["address_2"] })}
            />
            <small className="text-danger">
              {errors?.address_2 && errors.address_2.message}
            </small>
          </FormGroup>
          <br></br>
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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>

          <br></br>
          <SectionSystem {...{ clonePost, aboutData, deleteElement }} />
          <br></br>

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
              <FormattedMessage id="Cancel" />
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};
export default injectIntl(AboutTab);
