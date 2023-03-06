import { Box, useTheme } from '@mui/material';
import Instructions from './Instructions';

export interface ViewProps {}
const View = ({}: ViewProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        // consume available vertical space:
        flex: 1
      }}>
      <Instructions />
      {/* TODO */}
    </Box>
  );
};
export default View;
