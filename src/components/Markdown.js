
import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

export default function Markdown(props) {
  return (
    <ReactMarkdown
      source={props.children}
      escapeHtml={false}
    />)
    ;
}
