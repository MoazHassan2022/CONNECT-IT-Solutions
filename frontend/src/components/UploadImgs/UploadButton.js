import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { AiFillCamera } from "react-icons/ai";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});

const UploadButton = ({ sendimage, icon = <AiFillCamera /> }) => {
  const handleImages = (e) => {
    sendimage(e.target.files[0]);
  };
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={handleImages}
        />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          {icon}
        </IconButton>
      </label>
    </Stack>
  );
};

export default UploadButton;
