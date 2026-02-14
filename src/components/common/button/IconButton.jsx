import { Tooltip, CircularProgress } from "@mui/material"

export default function IconButton({
  title,
  icon,
  sx,
  onClick,
  loading = false,
  size = 20,
}) {
  const Icon = icon

  if (loading) {
    return (
      <Tooltip title={title}>
        <CircularProgress
          size={size}
          sx={{
            cursor: 'default',
            margin: '2px',
            ...sx
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </Tooltip>
    )
  }

  return (
    <Tooltip title={title}>
      <Icon
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.2)'
          },
          ...sx
        }}
        onClick={(e) =>{
          e.stopPropagation()
          onClick?.()
        }}
      />
    </Tooltip>
  )
}
