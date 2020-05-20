import React from "react";
import Link from "../Link";
import Typography from "@material-ui/core/Typography";
const ReactMarkdown = require("react-markdown");

const Heading = ({level = 1, ...restProps}) => {
  const component = `h${level}`;
  return <Typography variant={component} {...restProps}/>
}

export const markdownValueGetter = ({text}) => text;

const Markdown = ({ source, ...restProps }) => {
  return <ReactMarkdown source={source} renderers={{
    heading: Heading,
    link: Link
  }} {...restProps}/>;
};

export default Markdown;