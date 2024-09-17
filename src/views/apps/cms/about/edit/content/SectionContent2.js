import ExtensionsHeader from "@components/extensions-header";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState, memo } from "react";

import { useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useForm } from "react-hook-form";

import { FormattedMessage } from "react-intl";
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
import {
  convertFileToBase64,
  uploadImage,
} from "../../../../../../helper/common";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";

const SectionContent2 = ({ aboutData, setValueContentIntro2 }) => {
  const [intro, setIntro] = useState();
  const [editorState, setEditorState] = useState(null);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const content =
      aboutData?.section_intro_2 && JSON.parse(aboutData?.section_intro_2);
    content &&
      setIntro({
        header_content2: content.header_content2,
        title_content2: content.title_content2,
        content_content2: "hello section 2",
        image_content2: content.image_content2,
      });
    setValueContent(htmlToDraftUtil(content?.content_content2 || " "));
    setValueContentIntro2(htmlToDraftUtil(content?.content_content2 || " "));
  }, [aboutData]);

  const [valueContent, setValueContent] = useState(() =>
    EditorState.createEmpty()
  );

  const onChange = async (e) => {
    const content_content2 = draftToHtml(
      convertToRaw(valueContent.getCurrentContent())
    );

    const imageBase64 = await convertFileToBase64(e.target.files[0]);
    document.getElementById("section-content-2-image-" + e.target.name).src =
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
    document.getElementById("section-content-2-image-" + e.target.name).value =
      urlImage;
  };

  return (
    <div id="section-content-2">
      <div className="text-center">
        <ExtensionsHeader title={<FormattedMessage id="section content 2" />} />
      </div>
      <div className="post" id={"section-content-2-" + (0 + 1)}>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label for="header">
                <FormattedMessage id="header_solution" />{" "}
              </Label>
              <Input
                name="header_content2"
                defaultValue={intro?.header_content2}
                value={intro?.header_content2 || " "}
                onChange={(e) => {
                  setIntro({ ...intro, header_content2: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label for="title">
                <FormattedMessage id="solution_title" />{" "}
              </Label>
              <Input
                name="title_content2"
                defaultValue={intro?.title_content2}
                value={intro?.title_content2 || " "}
                onChange={(e) => {
                  setIntro({ ...intro, title_content2: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={12}>
            {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
            <FormGroup>
              <Label for="content">
                <FormattedMessage id="solution_content" />{" "}
              </Label>
              {/* <Input
                type="textarea"
                name="content_content2"
                defaultValue={intro?.content_content2}
                value={intro?.content_content2 || " "}
                onChange={(e) => {
                  setIntro({ ...intro, content_content2: e.target.value });
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
                defaultEditorState={valueContent}
                editorState={valueContent}
                toolbarClassName="toolbarClassName"
                editorClassName="editorClassName "
                wrapperClassName="wrapperClassName"
                onEditorStateChange={(data) => {
                  setValueContent(data);
                  setValueContentIntro2(data);
                }}
                name="content_content2"
              />
            </FormGroup>
            {/* </Form> */}
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
                    name="image_content2"
                    id={"section-content-2-image-" + (0 + 1)}
                    className="rounded mr-50 objectFit-contain image
            form-control"
                    src={intro?.image_content2 || null}
                    value={intro?.image_content2 || null}
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
                      name={0 + 1}
                      accept="image/*"
                    />
                  </Button.Ripple>
                </Row>
              </Row>
            </FormGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default memo(SectionContent2);
