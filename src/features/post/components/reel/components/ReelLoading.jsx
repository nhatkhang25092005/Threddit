import { Box, Skeleton } from "@mui/material";
import { style } from "../style";

const createList = (count) => Array.from({ length: count })

export default function ReelLoading({ count = 1 }) {
  return (
    <Box sx={style.loadingList}>
      {createList(count).map((_, index) => (
        <Box key={index} sx={style.screenSlot}>
          <Box sx={style.screenSlotInner}>
            <Box sx={style.loadingCard}>
              <Skeleton
                animation="wave"
                height="100%"
                variant="rounded"
                width="100%"
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
