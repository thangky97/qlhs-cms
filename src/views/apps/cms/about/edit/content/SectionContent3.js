import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo } from "react";
import { FormattedMessage } from "react-intl";

import { Button, Col, FormGroup, Input, Label, Media, Row } from "reactstrap";
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";

const SectionContent3 = ({
  aboutData,
  setValueContentIntro3Content1,
  setValueContentIntro3Content2,
  setValueContentIntro3Content3,
}) => {
  const [valueContent1, setValueContent1] = useState(() =>
    EditorState.createEmpty()
  );
  const [valueContent2, setValueContent2] = useState(() =>
    EditorState.createEmpty()
  );
  const [valueContent3, setValueContent3] = useState(() =>
    EditorState.createEmpty()
  );

  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_intro_3 && JSON.parse(aboutData?.section_intro_3);
    content &&
      setIntro({
        header_content3: content.header_content3,
        short_header_content3: content.short_header_content3,
        title1_content3: content.title1_content3,
        title2_content3: content.title2_content3,
        title3_content3: content.title3_content3,
        content1_content3: content.content1_content3,
        content2_content3: content.content2_content3,
        content3_content3: content.content3_content3,
        image1_content3: content.image1_content3,
        image2_content3: content.image2_content3,
        image3_content3: content.image3_content3,
      });
    setValueContent1(htmlToDraftUtil(content?.content1_content3 || " "));
    setValueContent2(htmlToDraftUtil(content?.content2_content3 || " "));
    setValueContent3(htmlToDraftUtil(content?.content3_content3 || " "));

    setValueContentIntro3Content1(
      htmlToDraftUtil(content?.content1_content3 || " ")
    );
    setValueContentIntro3Content2(
      htmlToDraftUtil(content?.content2_content3 || " ")
    );
    setValueContentIntro3Content3(
      htmlToDraftUtil(content?.content3_content3 || " ")
    );
  }, [aboutData]);

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    document.getElementById("section-content-3-image-" + e.target.name).src =
      imageBase64;

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

    document.getElementById("section-content-3-image-" + e.target.name).value =
      urlImage;
  };
  return (
    <div id="section-content-3">
      <div className="text-center">
        <ExtensionsHeader title={<FormattedMessage id="section benefit" />} />
      </div>
      <>
        <div className="post" id={"section-content-3-" + (1 + 1)}>
          <Row>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="header">
                  <FormattedMessage id="header_benefit" />{" "}
                </Label>
                <Input
                  name="header_content3"
                  defautlValue={intro?.header_content3}
                  value={intro?.header_content3 || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, header_content3: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="short_header">
                  <FormattedMessage id="benefit_title" />{" "}
                </Label>
                <Input
                  name="short_header_content3"
                  defautlValue={intro?.short_header_content3}
                  value={intro?.short_header_content3 || " "}
                  onChange={(e) => {
                    setIntro({
                      ...intro,
                      short_header_content3: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <h5 className="my-2 title">
                <FormattedMessage id="post 1" />
              </h5>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="post1_title" />{" "}
                </Label>
                <Input
                  name="title1_content3"
                  defautlValue={intro?.title1_content3}
                  value={intro?.title1_content3 || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, title1_content3: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="post1_content" />{" "}
                </Label>
                {/* <Input
                type="textarea"

                name="content1_content3"
                defautlValue={intro?.content1_content3}
                value={intro?.content1_content3||" "}   onChange={(e)=>{
                  setIntro({...intro,content1_content3:e.target.value})
                }}
              /> */}
                <Editor
                  // toolbar={{
                  //   options: ["inline", "textAlign"],
                  //   inline: {
                  //     inDropdown: false,
                  //     options: ["bold", "italic", "underline"],
                  //   },
                  // }}
                  stripPastedStyles={true}
                  defaultEditorState={valueContent1}
                  editorState={valueContent1}
                  toolbarClassName="toolbarClassName"
                  editorClassName="editorClassName"
                  wrapperClassName="wrapperClassName"
                  onEditorStateChange={(data) => {
                    setValueContent1(data);
                    setValueContentIntro3Content1(data);
                  }}
                  name="content1_content3"
                />
              </FormGroup>
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
                      name="image1_content3"
                      id={"section-content-3-image-" + (1 + 1)}
                      className="rounded mr-50 objectFit-contain image
            form-control"
                      src={intro?.image1_content3 || null}
                      value={intro?.image1_content3 || null}
                      height="100"
                      width="100"
                    />
                  </Media>{" "}
                  <Row className="flex-column px-1">
                    <Button.Ripple tag={Label} className="mt-1" color="primary">
                      <FormattedMessage id="Upload" />
                      <Input
                        type="file"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        hidden
                        name={1 + 1}
                        accept="image/*"
                      />
                    </Button.Ripple>
                  </Row>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <h5 className="my-2 title">
                <FormattedMessage id="post 2" />
              </h5>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="post2_title" />{" "}
                </Label>
                <Input
                  name="title2_content3"
                  defautlValue={intro?.title2_content3}
                  value={intro?.title2_content3 || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, title2_content3: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="post2_content" />{" "}
                </Label>
                {/* <Input
                name="content2_content3"
                type="textarea"
                defautlValue={intro?.content2_content3}
                value={intro?.content2_content3||" "}   onChange={(e)=>{
                  setIntro({...intro,content2_content3:e.target.value})
                }}
              /> */}

                <Editor
                  // toolbar={{
                  //   options: ["inline", "textAlign"],
                  //   inline: {
                  //     inDropdown: false,
                  //     options: ["bold", "italic", "underline"],
                  //   },
                  // }}
                  stripPastedStyles={true}
                  defaultEditorState={valueContent2}
                  editorState={valueContent2}
                  toolbarClassName="toolbarClassName"
                  editorClassName="editorClassName"
                  wrapperClassName="wrapperClassName"
                  onEditorStateChange={(data) => {
                    setValueContent2(data);
                    setValueContentIntro3Content2(data);
                  }}
                  name="content2_content3"
                />
              </FormGroup>
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
                      name="image2_content3"
                      id={"section-content-3-image-" + (2 + 1)}
                      className="rounded mr-50 objectFit-contain image
            form-control"
                      src={intro?.image2_content3 || null}
                      value={intro?.image2_content3 || null}
                      height="100"
                      width="100"
                    />
                  </Media>{" "}
                  <Row className="flex-column px-1">
                    <Button.Ripple tag={Label} className="mt-1" color="primary">
                      <FormattedMessage id="Upload" />
                      <Input
                        type="file"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        hidden
                        name={2 + 1}
                        accept="image/*"
                      />
                    </Button.Ripple>
                  </Row>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <h5 className="my-2 title">
                <FormattedMessage id="post 3" />
              </h5>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="post3_title" />{" "}
                </Label>
                <Input
                  name="title3_content3"
                  defaultValue={intro?.title3_content3}
                  value={intro?.title3_content3 || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, title3_content3: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="post3_content" />{" "}
                </Label>
                {/* <Input
                name="content3_content3"
                type="textarea"
                defaultValue={intro?.content3_content3}
                value={intro?.content3_content3||" "}   onChange={(e)=>{
                  setIntro({...intro,content3_content3:e.target.value})
                }}
              /> */}

                <Editor
                  // toolbar={{
                  //   options: ["inline", "textAlign"],
                  //   inline: {
                  //     inDropdown: false,
                  //     options: ["bold", "italic", "underline"],
                  //   },
                  // }}
                  stripPastedStyles={true}
                  defaultEditorState={valueContent3}
                  editorState={valueContent3}
                  toolbarClassName="toolbarClassName"
                  editorClassName="editorClassName"
                  wrapperClassName="wrapperClassName"
                  onEditorStateChange={(data) => {
                    setValueContent3(data);
                    setValueContentIntro3Content3(data);
                  }}
                  name="content3_content3"
                />
              </FormGroup>
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
                      name="image3_content3"
                      id={"section-content-3-image-" + (3 + 1)}
                      className="rounded mr-50 objectFit-contain image
            form-control"
                      src={intro?.image3_content3 || null}
                      value={intro?.image3_content3 || null}
                      height="100"
                      width="100"
                    />
                  </Media>{" "}
                  <Row className="flex-column px-1">
                    <Button.Ripple tag={Label} className="mt-1" color="primary">
                      <FormattedMessage id="Upload" />
                      <Input
                        type="file"
                        onChange={(e) => {
                          onChange(e);
                        }}
                        hidden
                        name={3 + 1}
                        accept="image/*"
                      />
                    </Button.Ripple>
                  </Row>
                </Row>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </>
    </div>
  );
};
export default memo(SectionContent3);
