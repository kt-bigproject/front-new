/** @jsxImportSource @emotion/react */
import 'react-quill/dist/quill.snow.css';
// import { useMemo } from 'react';
import ReactQuill, {Quill} from 'react-quill';
// import ImageResize  from '@looop/quill-image-resize-module-react'
import ImageResize from 'quill-image-resize';
import { ImageDrop } from 'quill-image-drop-module'
import { css } from '@emotion/react'

const quillEditorStyle = css`

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="one"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="one"]::before {
  content: "교보 2019";
  font-family: "one";
}
.ql-font-one {
  font-family: 'one';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="two"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="two"]::before {
  content: "네이버 클로바 느릿느릿";
  font-family: "two";
}
.ql-font-two {
  font-family: 'two';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="three"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="three"]::before {
  content: "조선 궁서체";
  font-family: "three";
}

.ql-font-three {
  font-family: 'three';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="four"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="four"]::before {
  content: "교보 2020박도연";
  font-family: "four";
}

.ql-font-four {
  font-family: 'four';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="five"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="five"]::before {
  content: "KCC안중근";
  font-family: "five";
}

.ql-font-five {
  font-family: 'five';
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="five"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="five"]::before {
  content: "블락비 - ZICO";
  font-family: "six";
}

.ql-font-five {
  font-family: 'six';
}

.ql-size-small {
    font-size: 0.75em;
}

.ql-size-large {
    font-size: 1.5em;
}

.ql-size-huge {
    font-size: 2.5em;
}
`

Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

const Font = Quill.import('formats/font');

const fonts = ['one', 'two', 'three', 'four', 'five'];
fonts.forEach((font) => Font.whitelist.push(font));

Quill.register(Font, true);

export default function QuillEditor({value, onChange, style}) {

  const modules = {
    toolbar: {
        container: [
          [{'font': fonts}],
          [{'size':[]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }, { 'background': [] }],
          ['image'],
          ['clean']  
        ],
    },
    ImageResize: {
      parchment: Quill.import('parchment')
    },
    imageDrop: true,
  }

  return (
    <div>
      <ReactQuill            
        css={quillEditorStyle}
        style={style}
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
      />
    </div>
  )
}
