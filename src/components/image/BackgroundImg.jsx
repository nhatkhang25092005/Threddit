import {CircularProgress, CardMedia, Box, Button, Typography} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { forwardRef, memo } from 'react';
import ImageInput from '../common/input/ImageInput';

/**
 * BackgroundImg component
 *
 * A reusable background image component with optional owner controls.
 * When `owner` is true, an edit button is displayed that allows the user
 * to upload a new image via a hidden file input.
 *
 * This component supports `ref` forwarding to the root container
 * and is memoized to avoid unnecessary re-renders.
 *
 * @component
 * @param {Object} props - Component props
 * @param {import('@mui/material').SxProps} [props.sx] - Custom MUI `sx` styles applied to the CardMedia image
 * @param {string} [props.alt] - Alternative text for the image
 * @param {string} props.src - Image source URL
 * @param {boolean} [props.owner=true] - Whether the current user owns the image.
 * If true, shows the edit/upload button.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} [props.handleUpload] -
 * Callback fired when a file is selected from the file input.
 *
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref attached to the root Box element
 *
 * @returns {JSX.Element} Rendered background image component
 *
 * @example
 * ```jsx
 * <BackgroundImg
 *   src="/images/cover.jpg"
 *   alt="Cover image"
 *   owner={true}
 *   handleUpload={(e) => {
 *     const file = e.target.files?.[0];
 *     console.log(file);
 *   }}
 *   sx={{ height: 240 }}
 * />
 * ```
 */

const BackgroundImg = memo(forwardRef(function BackgroundImg({
  sx,
  alt,
  src,
  loading,
  owner = true,
  handleUpload = () => {}
}, ref) {
  if(typeof handleUpload !== 'function'){
    console.warn('handleUpload should be a function')
    handleUpload = () => {}
  }

  return (
    <Box
      ref={ref}
      component='div'
      sx={{
        position:'relative',
        display:'inline-block',
        height:'fit-content',
        width:'100%'
      }}>
      <CardMedia
        sx={{
          height:'18rem',
          width:'100%',
          objectFit:'cover',
          borderEndEndRadius:'0.5rem',
          borderEndStartRadius:'0.5rem',
          ...sx
        }}
        component="img"
        image={src}
        alt={alt}
      />
      {
        owner &&
        <ImageInput onClick={handleUpload}>
          <Button
            sx={{
              borderRadius:'1.5rem',
              position:'absolute',
              right:'1rem',
              display:'flex',
              gap:1,
              bottom:'1rem',
              zIndex:1000,
              paddingX:'1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              }
            }}
          >
            {loading
              ?<CircularProgress size={20} sx={{ color: 'black' }} />
              : (<>
                    <CameraAltIcon />
                    <Typography
                      variant="normal"
                      sx={{ textTransform: 'none', fontWeight: 'bold' }}
                    >
                      Chỉnh sửa ảnh bìa
                    </Typography>
                  </>
                )}
          </Button>
        </ImageInput>
      }
    </Box>
  )
}))

export default BackgroundImg