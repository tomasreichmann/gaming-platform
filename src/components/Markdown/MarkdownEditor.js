import dynamic from 'next/dynamic'
import { Box } from '@material-ui/core';
import markdownParser from './markdownParser';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});

export default function MarkdownEditor({ value, onChange, height = 500 }) {
  return (
    <Box height={height}>
      <MdEditor
        name="mdEditor"
        renderHTML={(text) => markdownParser.render(text)}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}