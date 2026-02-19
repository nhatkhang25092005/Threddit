import { Grid } from "@mui/material"
import UserCard from "../../../components/common/UserCard"
import EmptyListUI from "../../../components/common/list/EmptyListUI"
import LoadingUI from "../../../components/common/list/LoadingUI"
import { useBlockContext } from "../../../core/block/hooks/useBlockContext"
import UnblockButton from "./UnblockButton"
import ContainerForList from "./ContainerForList"
import {block} from '../../../constant/text/vi/block.text'
import Surface from "../../../components/common/Surface"
import useInfiniteScroll from '../../../hooks/useInfiniteScroll'

/* ===================== UI ===================== */
// Presentational component for rendering block list UI
function BlockListUI({
  getBlockList,
  hasMore,
  blockList,
  loading,
  unblockUser,
}) {
  const targetRef = useInfiniteScroll({
    hasMore,
    loading:loading.global.getBlockList,
    onLoadMore:getBlockList
  })

  const perBLockLoading = loading.perBlock.cancelBlock
  const renderTasks = (username) => [
    {
      component: (
        <UnblockButton
          loading={perBLockLoading[username]}
        />
      ),
      func:() => unblockUser(username)
    },
  ]

  return (
    <Surface sx={{width:'100%'}}>
      <Grid container spacing={2} width="100%">
        {blockList.map(({blockedUser}) => (
          <Grid
            key={blockedUser?.username}
            xs={6}
            sx={{ display: "flex", width: "49%" }}
          >
            <UserCard
              avatar={blockedUser?.avatarUrl}
              username={blockedUser?.displayName}
              tasks={renderTasks(blockedUser?.username)}
            />
          </Grid>
        ))}
        <div ref={targetRef}/>
      </Grid>
    </Surface>
  )
}

/* ===================== CONTAINER ===================== */
// Container component: handles data, state, and conditions
export default function BlockList() {
  const {
    state: { blockList, loading, hasMore },
    actions: { getBlockList, unblockUser },
  } = useBlockContext()


  // Loading state for fetching block list
  if (loading.global.getBlockList && blockList.length === 0) {
    return <Surface sx={{width:'100%'}}><LoadingUI message={block.blockList.loadingMessage} /></Surface>
  }

  // Empty list state
  if (blockList.length === 0) {
    return (
      <Surface sx={{width:'100%'}}>
        <EmptyListUI message={block.blockList.emptyMessage} />
      </Surface>
    )
  }

  return (
    <ContainerForList>
      <BlockListUI
        loading = {loading}
        getBlockList = {getBlockList}
        hasMore = {hasMore}
        blockList={blockList}
        unblockUser={unblockUser}
      />
    </ContainerForList>
  )
}
