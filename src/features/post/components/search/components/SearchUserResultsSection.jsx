import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { Avatar, Box, Button, Skeleton, Typography } from "@mui/material";
import Surface from "../../../../../components/common/Surface";
import { routes } from "../../../../../constant/routes";
import { searchText } from "../../../../../constant/text/vi/post/search.text";
import { useBlockContext } from "../../../../../core/block/hooks/useBlockContext";
import { SEARCH_USER_PREVIEW_LIMIT } from "../utils";
import { style } from "../style";

const searchPageSx = style.searchResultsPage;

const resolveUserKey = (user) => (
  user?.username ?? user?.id ?? user?.displayName ?? "search-user"
);

const resolveUserName = (user) => (
  user?.displayName || user?.fullName || user?.username || "User"
);

const resolveUserMeta = (user) => {
  const handle = user?.username ? `@${user.username}` : "";
  const bio = typeof user?.bio === "string"
    ? user.bio.trim()
    : typeof user?.description === "string"
      ? user.description.trim()
      : "";

  return [handle, bio].filter(Boolean).join(" | ");
};

function SearchUserSkeleton() {
  return (
    <Box sx={(theme) => searchPageSx.userSkeletonRow(theme)}>
      <Skeleton variant="circular" width={52} height={52} />
      <Box sx={searchPageSx.userSkeletonBody}>
        <Skeleton variant="text" width="52%" height={22} />
        <Skeleton variant="text" width="34%" height={18} />
      </Box>
    </Box>
  );
}

export default function SearchUserResultsSection({
  users = [],
  expanded = false,
  hasMore = false,
  isLoadingMore = false,
  onExpand,
  onCollapse,
}) {
  const { actions: { canNavigateToUser } } = useBlockContext();
  const visibleUsers = expanded
    ? users
    : users.slice(0, SEARCH_USER_PREVIEW_LIMIT);
  const showExpandButton = !expanded && (users.length > SEARCH_USER_PREVIEW_LIMIT || hasMore);

  return (
    <Surface variant="default" sx={(theme) => searchPageSx.userSection(theme)}>
      <Box sx={searchPageSx.sectionHeader}>
        <Box sx={searchPageSx.sectionHeading}>
          <Box sx={searchPageSx.sectionTitleRow}>
            <Box sx={(theme) => searchPageSx.sectionIcon(theme)}>
              <PeopleAltRoundedIcon />
            </Box>

            <Box sx={searchPageSx.sectionTitleGroup}>
              <Typography sx={searchPageSx.sectionTitle}>
                {searchText.page.usersSectionTitle(users.length)}
              </Typography>
            </Box>
          </Box>
        </Box>

        {expanded ? (
          <Button
            type="button"
            onClick={onCollapse}
            sx={(theme) => searchPageSx.sectionAction(theme)}
          >
            {searchText.page.showPosts}
          </Button>
        ) : null}
      </Box>

      <Box sx={searchPageSx.userList}>
        {visibleUsers.map((user, index) => {
          const username = user?.username;
          const userMeta = resolveUserMeta(user);

          return (
            <Box
              key={`${resolveUserKey(user)}-${index}`}
              component="button"
              type="button"
              onClick={() => username ? canNavigateToUser(routes.profile, username) : null}
              sx={(theme) => searchPageSx.userCard(theme)}
            >
              <Avatar
                src={user?.avatarUrl || undefined}
                sx={searchPageSx.userAvatar}
              />

              <Box sx={searchPageSx.userContent}>
                <Typography sx={searchPageSx.userName} noWrap>
                  {resolveUserName(user)}
                </Typography>

                {userMeta ? (
                  <Typography sx={(theme) => searchPageSx.userMeta(theme)} noWrap>
                    {userMeta}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          );
        })}

        {showExpandButton ? (
          <Button
            type="button"
            onClick={onExpand}
            sx={(theme) => searchPageSx.expandUsersButton(theme)}
          >
            {searchText.page.showMoreUsers}
          </Button>
        ) : null}

        {isLoadingMore ? (
          <Box sx={searchPageSx.userSkeletonList}>
            <SearchUserSkeleton />
            <SearchUserSkeleton />
          </Box>
        ) : null}
      </Box>
    </Surface>
  );
}
