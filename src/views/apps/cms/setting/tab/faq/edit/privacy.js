import { isObjEmpty } from "@utils";
import classNames from "classnames";
import draftToHtml from "draftjs-to-html";
import Repeater from "@components/repeater";
import { X, Plus } from "react-feather";

import { convertToRaw, EditorState } from "draft-js";
import { validateOptions } from "postcss-rtl/lib/options";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";
import { FormattedMessage, injectIntl } from "react-intl";

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";
import request from "../../../../../../../services/request";
import api from "../../../../../../../constants/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { htmlToDraftUtil } from "../../../../../../../utility/Utils";
const CityTab = ({ selected, intl }) => {
  const { register, errors, handleSubmit, unregister } = useForm();
  const history = useHistory();
  const lang = useSelector((state) => state.common.language);
  const [idPrivacy, setIdPrivacy] = useState();
  const [disable, setDisable] = useState(false);
  const [dataFAQ, setDataFAQ] = useState([]);
  const [dataFAQEditor, setDataFAQEditor] = useState([]);
  const [intro, setIntro] = useState();
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    let listTemp = [];
    if (dataFAQEditor) {
      listTemp = [...dataFAQEditor];
    }

    listTemp.push({
      question: htmlToDraftUtil(""),
      ans: htmlToDraftUtil(""),
    });

    setDataFAQEditor(listTemp);
  };

  const deleteForm = (index) => {
    const listTemp = [...dataFAQEditor];
    listTemp.splice(index, 1);
    setDataFAQEditor(listTemp);
  };
  useEffect(() => {
    (async () => {
      const listAbout = await request.send({
        method: api.LIST_ABOUT.method,
        path: api.LIST_ABOUT.path,
        query: { lang },
      });
      if (listAbout?.data?.data?.length > 0) {
        setIdPrivacy(listAbout?.data?.data[0]?.id);
        setDataFAQ(
          listAbout?.data?.data[0]?.faq &&
            JSON.parse(listAbout?.data?.data[0]?.faq)
        );
      }
    })();
  }, []);

  const onSubmit = async (value) => {
    const dataFaq = [];

    dataFAQEditor.forEach((item) => {
      dataFaq.push({
        question: draftToHtml(convertToRaw(item.question.getCurrentContent())),
        ans: draftToHtml(convertToRaw(item.ans.getCurrentContent())),
      });
    });

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
        faq: JSON.stringify(dataFaq) || " ",
        terms_of_use: values.terms_of_use || " ",
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

  useEffect(() => {
    if (dataFAQ.length > 0) {
      const initialEditorStates = dataFAQ.map((item) => {
        return {
          ...item,
          question: () => EditorState.createEmpty(),
          ans: () => EditorState.createEmpty(),
        };
      });

      initialEditorStates.forEach((item, index) => {
        item.question = htmlToDraftUtil(dataFAQ[index]?.question || "");
        item.ans = htmlToDraftUtil(dataFAQ[index]?.ans || "");
      });

      setDataFAQEditor(initialEditorStates);
    }
  }, [dataFAQ.length]);
  return (
    <>
      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {dataFAQEditor &&
              dataFAQEditor?.length > 0 &&
              dataFAQEditor?.map((item, i) => {
                return (
                  <Row
                    key={i}
                    index={i}
                    className="justify-content-between align-items-center"
                  >
                    <Col md={11}>
                      <FormGroup>
                        <Label for={`question-${i + 1}`}>
                          <FormattedMessage id={"question"} />
                        </Label>
                        {/* <Input
                          innerRef={register()}
                          type="textarea"
                          id={`question-${i + 1}`}
                          name={`question-${i + 1}`}
                          value={item.question}
                          onChange={(e) => {
                            let listTemp = [...dataFAQEditor];
                            listTemp[i] = {
                              ...listTemp[i],
                              question: e.target.value,
                            };
                            setDataFAQEditor(listTemp);
                          }}
                        /> */}

                        <Editor
                          editorState={item.question}
                          onEditorStateChange={(data) => {
                            const dataEditor = [...dataFAQEditor];
                            dataEditor[i].question = data;
                            setDataFAQEditor(dataEditor);
                          }}
                          name="question"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={11}>
                      <FormGroup>
                        <Label for={`answer-${i + 1}`}>
                          <FormattedMessage id={"answer"} />
                        </Label>
                        <Editor
                          editorState={item.ans}
                          onEditorStateChange={(data) => {
                            const dataEditor = [...dataFAQEditor];
                            dataEditor[i].ans = data;
                            setDataFAQEditor(dataEditor);
                          }}
                          name="ans"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={1}>
                      <Button.Ripple
                        color="danger"
                        className="text-nowrap px-1"
                        onClick={() => deleteForm(i)}
                        outline
                      >
                        <span>
                          <FormattedMessage id={"delete"} />
                        </span>
                      </Button.Ripple>
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Row>
                );
              })}

            <Button.Ripple
              className="btn-icon"
              color="primary"
              onClick={increaseCount}
            >
              <Plus size={14} />
              <span className="align-middle ml-25">
                <FormattedMessage id="add" />
              </span>
            </Button.Ripple>

            <Row className="justify-content-end">
              <Button
                type="submit"
                className="mr-1 ml-2"
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
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default injectIntl(CityTab);
