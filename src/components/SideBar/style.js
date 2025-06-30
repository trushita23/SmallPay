import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.primary.light,
    },
  },
}));
