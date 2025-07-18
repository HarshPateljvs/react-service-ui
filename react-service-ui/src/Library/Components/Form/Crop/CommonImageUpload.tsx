import { useRef, useState } from "react";
import { Modal, Box, Stack, Button } from "@mui/material";
import Demo, { type DemoRef } from "./Demo";

const CommonImageUpload = () => {
  const [open, setOpen] = useState(false);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const demoRef = useRef<DemoRef>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const croppedUrl = demoRef.current?.getCroppedImage();
    if (croppedUrl) setFinalImage(croppedUrl);
    handleClose();
  };
  return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" onClick={handleOpen}>
          Upload Image
        </Button>

        {finalImage && (
          <img
            src={finalImage}
            alt="Final Cropped"
            style={{ width: "300px", border: "1px solid #ddd", padding: "4px" }}
          />
        )}
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "white",
            display: "flex",
            flexDirection: "row",
            padding: 4,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "80%",
              margin: "5% auto",
              bgcolor: "white",
              p: 2,
              overflow: "auto",
            }}
          >
            <Demo ref={demoRef} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CommonImageUpload;
