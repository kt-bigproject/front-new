import 'react-quill/dist/quill.snow.css';
// import { useMemo } from 'react';
import ReactQuill, {Quill} from 'react-quill';
// import ImageResize  from '@looop/quill-image-resize-module-react'
import ImageResize from 'quill-image-resize';
import { ImageDrop } from 'quill-image-drop-module'

Quill.register('modules/ImageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

export default function QuillEditor({value, onChange}) {

  // const quillRef = useRef(null);

  // https://velog.io/@runprogrmm/Next.js-React-react-quill-%EC%97%90%EB%94%94%ED%84%B0%EB%A1%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0
  // const imageHandler = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.addEventListener('change', async () => {
  //     const file = input.files[0];

  //     try {
  //       const res = await imageAPI({ img: file });
  //       const imgUrl = res.data.imgUrl;
  //       const editor = quillRef.current.getEditor(); 
  //       const range = editor.getSelection();
  //       editor.insertEmbed(range.index, 'image', imgUrl);
  //       editor.setSelection(range.index + 1);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  // 렌더링이 발생할 때마다 포커스가 벗어나는 문제
  // const modules = useMemo <- 근데 import한 모듈 덮어쓰기 warning이 나서 사용안하기로
  const modules = {
    toolbar: {
        container: [
          // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         
          [{ 'font': [] }],
          [{'size':[]}],
          // [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
          // [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
          ['image'],
          ['clean']  
        ],
    },
    // handlers: { image: imageHandler },
    ImageResize: {
      parchment: Quill.import('parchment')
    },
    imageDrop: true,
  };

  return (
    <ReactQuill
      theme="snow" 
      value={value} 
      onChange={onChange} 
      modules={modules}
    />
  )
}
