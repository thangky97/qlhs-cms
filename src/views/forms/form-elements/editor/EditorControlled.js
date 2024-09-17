import { useState } from 'react'
import { convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import draftToHtml from 'draftjs-to-html'

const EditorControlled = () => {
  const [value, setValue] = useState(EditorState.createEmpty())

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Controlled Editor</CardTitle>
      </CardHeader>
      <CardBody>
        <Editor editorState={value} onEditorStateChange={data => setValue(data)} />
      </CardBody>
    </Card>
  )
}

export default EditorControlled
