import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo, Fragment } from "react";
import { useForm } from "react-hook-form";
import { X, Plus } from "react-feather";

import { FormattedMessage } from "react-intl";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  Row,
  Button,
  Form,
  Media,
} from "reactstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";

import draftToHtml from "draftjs-to-html";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";

const SectionContentService = ({
  aboutData,
  dataServiceEditor,
  setDataServiceEditor,
}) => {
  const [intro, setIntro] = useState();
  const [dataService, setDataService] = useState([]);

  const increaseCount = () => {
    let listTemp = [];
    if (dataServiceEditor) {
      listTemp = [...dataServiceEditor];
    }

    listTemp.push({
      title_service: "",
      content_service: htmlToDraftUtil(""),
      feature_service: "",
      image_service: "",
    });

    setDataServiceEditor(listTemp);
  };

  const deleteForm = (index) => {
    const listTemp = [...dataServiceEditor];
    listTemp.splice(index, 1);
    setDataServiceEditor(listTemp);
  };

  useEffect(() => {
    const content =
      aboutData?.section_service && JSON.parse(aboutData?.section_service);

    content &&
      setIntro({
        header_service: content.header_service,
        short_header_service: content.short_header_service,
        content_about: content.content_about,
        image_about: content.image_about,
      });

    content && setDataService(content?.data);
  }, [aboutData]);

  useEffect(() => {
    if (dataService?.length > 0) {
      const initialEditorStates = dataService.map((item) => {
        return {
          ...item,
          content_service: () => EditorState.createEmpty(),
        };
      });

      initialEditorStates.forEach((item, index) => {
        item.content_service = htmlToDraftUtil(
          dataService[index]?.content_service || ""
        );
      });
      setDataServiceEditor(initialEditorStates);
    }
  }, [dataService]);

  const onChange = async (e, index) => {
    const dataEditor = [...dataServiceEditor];

    const imageBase64 = await convertFileToBase64(e.target.files[0]);

    if (dataEditor[index]) {
      dataEditor[index].image_service = imageBase64;
    }
    setDataServiceEditor(dataEditor);

    let urlImage = "";
    let fileImage = e.target.files[0];
    if (imageBase64) {
      const newData = imageBase64.replace(/,/gi, "").split("base64");
      if (newData[1]) {
        const data = {
          imageData: newData[1],
          imageFormat: fileImage?.type?.split("/")[1] || "png",
        };
        await uploadImage(data, fileImage).then((res) => {
          urlImage = res?.data;
        });
      } else {
        urlImage = imageBase64;
      }
    }
    if (dataEditor[index]) {
      dataEditor[index].image_service = urlImage || "";
    }
    setDataServiceEditor(dataEditor);
  };

  return (
    <div id="section-content-service">
      <div className="text-center">
        <ExtensionsHeader
          title={<FormattedMessage id="section content service" />}
        />
      </div>
      <>
        <div className="post" id={"section-content-service-" + (0 + 1)}>
          <Row>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="header">
                  <FormattedMessage id="header" />{" "}
                </Label>
                <Input
                  name="header_service"
                  defautlValue={intro?.header_service}
                  value={intro?.header_service || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, header_service: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="short_header">
                  <FormattedMessage id="Title" />{" "}
                </Label>
                <Input
                  name="short_header_service"
                  defautlValue={intro?.short_header_service}
                  value={intro?.short_header_service || " "}
                  onChange={(e) => {
                    setIntro({
                      ...intro,
                      short_header_service: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            {dataServiceEditor &&
              dataServiceEditor?.length > 0 &&
              dataServiceEditor?.map((item, i) => {
                return (
                  <Fragment
                    key={i}
                    index={i}
                    className="justify-content-between align-items-center"
                  >
                    <Col xs={12} md={12}>
                      <h5 className="my-2 title">
                        <FormattedMessage id="post" /> {i + 1}
                      </h5>
                    </Col>
                    <Col xs={12} md={12}>
                      <FormGroup>
                        <Label for={`title${i + 1}`}>
                          <FormattedMessage id="Title" />{" "}
                        </Label>
                        <Input
                          name={`title_service${i + 1}`}
                          defautlValue={item?.title_service}
                          value={item?.title_service || " "}
                          onChange={(e) => {
                            const dataEditor = [...dataServiceEditor];
                            dataEditor[i].title_service = e.target.value;
                            setDataServiceEditor(dataEditor);
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={12}>
                      {/* <h4><FormattedMessage id = "- Cloud Service"/></h4> */}
                      <FormGroup>
                        <Label for="content_service">
                          <FormattedMessage id="Content" />{" "}
                        </Label>
                        <Editor
                          stripPastedStyles={true}
                          editorState={item.content_service}
                          onEditorStateChange={(data) => {
                            const dataEditor = [...dataServiceEditor];
                            dataEditor[i].content_service = data;
                            setDataServiceEditor(dataEditor);
                          }}
                          name="quecontent_servicestion"
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={11} md={11}>
                      <FormGroup>
                        <Label for="feature_service">
                          <FormattedMessage id="feature" />{" "}
                        </Label>
                        <Input
                          type="textarea"
                          name={`feature_service${i + 1}`}
                          defautlValue={item?.feature_service}
                          value={item?.feature_service || " "}
                          onChange={(e) => {
                            const dataEditor = [...dataServiceEditor];
                            dataEditor[i].feature_service = e.target.value;
                            setDataServiceEditor(dataEditor);
                          }}
                        />
                      </FormGroup>
                    </Col>

                    <Col
                      xs={1}
                      md={1}
                      className="d-flex justify-content-between align-items-center"
                    >
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
                    <Col xs={12} md={6}>
                      <FormGroup>
                        <Label for="Image">
                          <FormattedMessage id="link_image" />
                        </Label>
                        <Row className="aligns-end p-1">
                          <Media className="mr-25" left>
                            <Media
                              object
                              name={`image_service${i + 1}`}
                              id={"image_service" + (i + 1)}
                              className="rounded mr-50 objectFit-contain image
            form-control"
                              src={item?.image_service || null}
                              value={item?.image_service || null}
                              height="100"
                              width="100"
                            />
                          </Media>{" "}
                          <Row className="flex-column px-1">
                            <Button.Ripple
                              tag={Label}
                              className="mt-1"
                              color="primary"
                            >
                              <FormattedMessage id="Upload" />
                              <Input
                                type="file"
                                onChange={(e) => {
                                  onChange(e, i);
                                }}
                                hidden
                                name={0 + 1}
                                accept="image/*"
                              />
                            </Button.Ripple>
                          </Row>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col sm={12}>
                      <hr />
                    </Col>
                  </Fragment>
                );
              })}

            <Button.Ripple
              className="btn-icon"
              color="primary"
              type="button"
              onClick={increaseCount}
            >
              <Plus size={14} />
              <span className="align-middle ml-25">
                <FormattedMessage id="add" />
              </span>
            </Button.Ripple>
          </Row>
        </div>
      </>
    </div>
  );
};
export default memo(SectionContentService);
