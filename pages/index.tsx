import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fetchMembers } from "api/endpoints";
import Footer from "components/Footer";
import { Senator } from "interfaces/senator";
import { states } from "lib/states";
import { useEffect, useState } from "react";

export default function Home() {
  const [state, setState] = useState<string>();
  const [senators, setSenators] = useState<Senator[]>();

  useEffect(() => {
    fetchMembers().then((data) => {
      setSenators(data.results[0].members);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ mb: 4 }}>
          Contact my senators
        </Typography>
        <Autocomplete
          disablePortal
          options={states}
          onChange={(event, newValue) => {
            setState(newValue?.abbreviation);
          }}
          sx={{ width: 300, mb: 4 }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Your state" />}
        />
        {state && (
          <Grid container spacing={2}>
            {senators
              ?.filter(
                (senator) => senator.state === state && senator.in_office
              )
              .map((senator, i) => (
                <Grid key={i} item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="h3">{`${senator.first_name} ${senator.last_name}`}</Typography>
                    <Stack direction={"row"} sx={{ my: 2 }} spacing={1}>
                      <Button
                        href={senator.contact_form}
                        variant="contained"
                        target={"_blank"}
                        startIcon={<OpenInNewRoundedIcon />}
                        size="small"
                      >
                        Contact
                      </Button>
                      {senator.twitter_account && (
                        <IconButton
                          href={senator.twitter_account}
                          sx={{ color: "#00acee" }}
                        >
                          <TwitterIcon />
                        </IconButton>
                      )}
                      {senator.facebook_account && (
                        <IconButton
                          href={senator.facebook_account}
                          sx={{ color: "#3b5998" }}
                        >
                          <FacebookRoundedIcon />
                        </IconButton>
                      )}
                      {senator.youtube_account && (
                        <IconButton
                          href={senator.youtube_account}
                          sx={{ color: "#FF0000" }}
                        >
                          <YouTubeIcon />
                        </IconButton>
                      )}
                    </Stack>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MailRoundedIcon sx={{ mr: 2 }} />
                      <Typography>Send a letter</Typography>
                    </Box>
                    <Typography>
                      The Honorable{" "}
                      {`${senator.first_name} ${senator.last_name}`}
                      <br />
                      United States Senate
                      <br />
                      Washington, D.C. 20510
                    </Typography>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
      <Box sx={{ flex: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
}
