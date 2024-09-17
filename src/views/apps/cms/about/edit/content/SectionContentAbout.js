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

const SectionContentAbout = ({ aboutData, setValueContentAbout }) => {
  const [valueContent, setValueContent] = useState(() =>
    EditorState.createEmpty()
  );
  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_about && JSON.parse(aboutData?.section_about);

    content &&
      setIntro({
        header_about: content.header_about,
        title_about: content.title_about,
        content_about: content.content_about,
        image_about: content.image_about,
      });
    setValueContent(htmlToDraftUtil(content?.content_about || " "));
    setValueContentAbout(htmlToDraftUtil(content?.content_about || " "));
  }, [aboutData]);

  const onChange = async (e) => {
    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    document.getElementById(
      "section-content-about-image-" + e.target.name
    ).src = imageBase64;

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
    document.getElementById(
      "section-content-about-image-" + e.target.name
    ).value = urlImage;
  };
  return (
    <div id="section-content-about">
      <div className="text-center">
        <ExtensionsHeader
          title={<FormattedMessage id="section content about" />}
        />
      </div>
      <>
        <div className="post" id={"section-content-about-" + (4 + 1)}>
          <Row>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="header">
                  <FormattedMessage id="header" />{" "}
                </Label>
                <Input
                  name="header_about"
                  defaultValue={intro?.header_about}
                  value={intro?.header_about || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, header_about: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="title">
                  <FormattedMessage id="Title" />{" "}
                </Label>
                <Input
                  name="title_about"
                  defaultValue={intro?.title_about}
                  value={intro?.title_about || " "}
                  onChange={(e) => {
                    setIntro({ ...intro, title_about: e.target.value });
                  }}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup>
                <Label for="content">
                  <FormattedMessage id="Content" />{" "}
                </Label>
                <Editor
                  // toolbar={{
                  //   options: ["inline", "textAlign"],
                  //   inline: {
                  //     inDropdown: false,
                  //     options: ["bold", "italic", "underline"],
                  //   },
                  // }}
                  stripPastedStyles={true}
                  defaultEditorState={valueContent}
                  editorState={valueContent}
                  toolbarClassName="toolbarClassName"
                  editorClassName="editorClassName"
                  wrapperClassName="wrapperClassName"
                  onEditorStateChange={(data) => {
                    setValueContent(data);
                    setValueContentAbout(data);
                  }}
                  name="content_about"
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={6}>
              <FormGroup>
                <Label for="Image">
                  <FormattedMessage id="Logo" />
                </Label>
                <Row className="aligns-end p-1">
                  <Media className="mr-25" left>
                    <Media
                      object
                      name="image_about"
                      id={"section-content-about-image-" + (4 + 1)}
                      className="rounded mr-50 objectFit-contain image
            form-control"
                      src={intro?.image_about || null}
                      value={intro?.image_about || null}
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
                        name={4 + 1}
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
export default memo(SectionContentAbout);
