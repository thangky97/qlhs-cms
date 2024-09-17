import ExtensionsHeader from "@components/extensions-header";
import { useEffect } from "react";
import { useState, memo } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { FormattedMessage } from "react-intl";
import { htmlToDraftUtil } from "../../../../../../utility/Utils";

const SectionContentProduct = ({ aboutData, setValueContentProduct }) => {
  const [valueContent, setValueContent] = useState(() =>
    EditorState.createEmpty()
  );
  const [intro, setIntro] = useState();
  useEffect(() => {
    const content =
      aboutData?.section_product && JSON.parse(aboutData?.section_product);

    content &&
      setIntro({
        title_product: content.title_product,
        content_product: content.content_product,
      });
    setValueContent(htmlToDraftUtil(content?.content_product || " "));
    setValueContentProduct(htmlToDraftUtil(content?.content_product || " "));
  }, [aboutData]);

  return (
    <div id="section-content-product">
      <div className="text-center">
        <ExtensionsHeader
          title={<FormattedMessage id="section content product" />}
        />
      </div>
      <>
        <div className="post" id={"section-content-product-" + (0 + 1)}>
          <FormGroup>
            <Label for="title">
              <FormattedMessage id="Title" />{" "}
            </Label>
            <Input
              name="title_product"
              defautlValue={intro?.title_product}
              value={intro?.title_product || " "}
              onChange={(e) => {
                setIntro({ ...intro, title_product: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="content">
              <FormattedMessage id="Content" />{" "}
            </Label>
            {/* <Input
                name="content_product"
                type="textarea"
                defautlValue={intro?.content_product}
                value={intro?.content_product||" "}   onChange={(e)=>{
                  setIntro({...intro,content_product:e.target.value})
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
                setValueContentProduct(data);
              }}
              name="content_product"
            />
          </FormGroup>
        </div>
      </>
    </div>
  );
};
export default memo(SectionContentProduct);
