import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component={"footer"}
      sx={{
        py: 2,
        backgroundColor: (theme) => theme.palette.backgroundSecondary.main,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        Made with ❤️ by{" "}
        <Link color="inherit" href="https://hellopangea.com/">
          Pangea
        </Link>{" "}
        on{" "}
        <Link
          color="inherit"
          href="https://github.com/hello-pangea/contact-my-senators"
        >
          GitHub
        </Link>
      </Typography>
    </Box>
  );
}
