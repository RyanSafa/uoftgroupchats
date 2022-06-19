import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  Stack,
  Button,
} from "@mui/material";
import theme from "./Theme";

const MainNavigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UofT GroupChats
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit">DONATE</Button>
            <Button color="inherit">GITHUB</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default MainNavigation;
