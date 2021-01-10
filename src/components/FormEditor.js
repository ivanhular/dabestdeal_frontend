import React, { useState } from 'react'
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const FormEditor = ({ description = '', setHtmlDesc }) => {
  const blockFromHtml = convertFromHTML(description)

  const state = ContentState.createFromBlockArray(
    blockFromHtml.contentBlocks,
    blockFromHtml.entityMap
  )

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(state)
  )

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setHtmlDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName='toolbar-wrap'
        wrapperClassName='editor-wrap'
        editorClassName='editor__body'
        onEditorStateChange={onEditorStateChange}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      /> */}
    </div>
  )
}

export default FormEditor
