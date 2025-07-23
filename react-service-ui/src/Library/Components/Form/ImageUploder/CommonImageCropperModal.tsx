import { useRef } from "react";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import ReactCrop from "react-image-crop";
import type { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import { AVTUseEffect, AVTUseState } from "../../../customHooks";
import CommonButton from "../CommonButton";
interface IProps {
  open: boolean;
  imgSrc: string | null;
  onClose: () => void;
  onSave: (img: string) => void;
}

const CommonImageCropperModal = ({ open, imgSrc, onClose, onSave }: IProps) => {
const [crop, setCrop] = AVTUseState<Crop | undefined>("crop_state", undefined);
const [completedCrop, setCompletedCrop] = AVTUseState<PixelCrop | undefined>("completed_crop_state", undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  AVTUseEffect("CommonImageCropperModal completedCrop", () =>  {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      canvasRef.current
    ) {
      canvasPreview(imgRef.current, canvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  const onImageLoad = () => {
    //const { width, height } = e.currentTarget;
     const fixedCrop: PixelCrop = {
        unit: "px",
        width: 400,
        height: 225,
        x: 0,
        y: 0,
    };

    setCrop(fixedCrop);
    setCompletedCrop(fixedCrop);

    if (canvasRef.current && imgRef.current) {
        canvasPreview(imgRef.current, canvasRef.current, fixedCrop);
    }
  };

  const handleSaveCrop = () => {
    if (!canvasRef.current) return;
    onSave(canvasRef.current.toDataURL("image/png"));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ flex: 1 }}>
      {imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
        >
          <img
            ref={imgRef}
            src={imgSrc}
            alt="Crop Preview"
            onLoad={onImageLoad}
            //style={{ width: "400px", height: "225px", objectFit: "cover" }}
          />
        </ReactCrop>
      )}
    </div>

     <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #ccc", padding: 10 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: completedCrop?.width || 200,
            height: completedCrop?.height || 112,
            border: "1px solid #ccc",
          }}
        />
    </div>
  </div>
</DialogContent>

      <DialogActions>
        <CommonButton onClick={handleSaveCrop} variant="contained">
          Save
        </CommonButton>
        <CommonButton onClick={onClose} variant="outlined">
          Cancel
        </CommonButton>
      </DialogActions>
    </Dialog>
  );
};

export default CommonImageCropperModal;
