
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const ImageOrLink = props => {
  console.log(props.src)
  import(`${props.href}`).then(image => console.log(image));

  // console.log(src)
  if (!props.src) return
  return <img alt="" src={props.src} />
}

export default function Markdown(props) {
  return (
    <>

    <ReactMarkdown
      source={props.children}
      renderers={{ image: ImageOrLink }}
      escapeHtml={false}
    />
    </>);
}
