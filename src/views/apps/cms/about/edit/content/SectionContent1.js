import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage } from "react-intl";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

const SectionContent1 = ({ aboutData, setValueContentIntro1 }) => {
  const [valueContent, setValueContent] = useState(() =>
    EditorState.createEmpty()
  );
  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_intro_1 && JSON.parse(aboutData?.section_intro_1);

    content &&
      setIntro({
        embed_content1: content.embed_content1,
        title_content1: content.title_content1,
        content_content1: content.content_content1,
      });
    setValueContent(htmlToDraftUtil(content?.content_content1 || " "));
    setValueContentIntro1(htmlToDraftUtil(content?.content_content1 || " "));
  }, [aboutData]);
  return (
    <div id="section-content-1">
      <div className="text-center">
        <ExtensionsHeader title={<FormattedMessage id="section content 1" />} />
      </div>
      <div className="post" id={"section-content-1-"}>
        <Row>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label for="embed">
                <FormattedMessage id="youtube_url" />
              </Label>
              <Input
                name="embed_content1"
                defaultValue={intro?.embed_content1}
                value={intro?.embed_content1 || " "}
                onChange={(e) => {
                  setIntro({ ...intro, embed_content1: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={6}>
            <FormGroup>
              <Label for="about">
                <FormattedMessage id="intro_title" />
              </Label>
              <Input
                name="title_content1"
                defaultValue={intro?.title_content1}
                value={intro?.title_content1 || " "}
                onChange={(e) => {
                  setIntro({ ...intro, title_content1: e.target.value });
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={12}>
            <FormGroup>
              <Label for="about">
                <FormattedMessage id="intro_content" />
              </Label>
              {/*               
              <Input name="content_content1" type="textarea" defaultValue={intro?.content_content1} value={intro?.content_content1||" "}   onChange={(e)=>{
                setIntro({...intro,content_content1:e.target.value})
              }} /> */}
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
                  setValueContentIntro1(data);
                }}
                name="content_content2"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default memo(SectionContent1);
