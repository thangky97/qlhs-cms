import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo } from "react";
import { FormattedMessage } from "react-intl";
import { FormGroup, Input, Label } from "reactstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";

const SectionContentPartner = ({ aboutData, setValueContentPartner }) => {
  const [valueContent, setValueContent] = useState(() =>
    EditorState.createEmpty()
  );

  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_partner && JSON.parse(aboutData?.section_partner);
    content &&
      setIntro({
        title_partner: content.title_partner,
        content_partner: content.content_partner,
      });
    setValueContent(htmlToDraftUtil(content?.content_partner || " "));
    setValueContentPartner(htmlToDraftUtil(content?.content_partner || " "));
  }, [aboutData]);

  return (
    <div id="section-content-partner">
      <div className="text-center">
        <ExtensionsHeader
          title={<FormattedMessage id="section content partner" />}
        />
      </div>
      <>
        <div className="post" id={"section-content-partner-" + (0 + 1)}>
          <FormGroup>
            <Label for="title">
              <FormattedMessage id="Title" />{" "}
            </Label>
            <Input
              name="title_partner"
              defaultValue={intro?.title_partner}
              value={intro?.title_partner || " "}
              onChange={(e) => {
                setIntro({ ...intro, title_partner: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">
              <FormattedMessage id="Content" />{" "}
            </Label>
            {/* <Input
                name="content_partner"
                type="textarea"
                defaultValue={intro?.content_partner}
                value={intro?.content_partner||" "}   onChange={(e)=>{
                  setIntro({...intro,content_partner:e.target.value})
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
              editorClassName="editorClassName"
              wrapperClassName="wrapperClassName"
              onEditorStateChange={(data) => {
                setValueContent(data);
                setValueContentPartner(data);
              }}
              name="content_partner"
            />
          </FormGroup>
        </div>
      </>
    </div>
  );
};
export default memo(SectionContentPartner);
