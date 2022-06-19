import {
  AppBar,
  Toolbar,
  ThemeProvider,
  Stack,
  Button,
  Box,
} from "@mui/material";
import theme from "./Theme";
import fullLogo from "./uoftgroupchatslogofull.PNG";

const MainNavigation = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <a href="/">
              <Box
                component="img"
                sx={{
                  height: 48,
                }}
                alt="Your logo."
                src={fullLogo}
              />
            </a>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2}>
              <Button color="inherit">DONATE</Button>
              <Button color="inherit">GITHUB</Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider >
  );
};

export default MainNavigation;
