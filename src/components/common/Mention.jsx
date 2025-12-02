import { useRef, useState, useEffect } from "react"
import { Paper, List, ListItem, ListItemButton, ListItemText } from "@mui/material"

export default function Mention({
  textFieldRef,
  commentContent,
  setCommentContent,
  followers,
  fetchFollowers,
  followersRef,
  isFollowingsHasMore,
  onKeyDownHandled
}) {
  const cursorPositionRef = useRef(null)
  const [showMentionList, setShowMentionList] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const mentionRef = useRef(null)
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 })
f
  useEffect(()=>{
    if(!showMentionList) return
    if(!cursorPositionRef.current) return
    const textBeforeCursor = commentContent.substring(0, cursorPositionRef.current)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    const textAfterAt = commentContent.substring(lastAtIndex + 1) 
    if(lastAtIndex === -1) return setShowMentionList(false)
    let filtered = []
    if(!textAfterAt) filtered = followers.map(f=>f.follower.username)
    else {
      filtered = followers
      .filter(user => user.follower.username.toLowerCase().includes(textAfterAt.toLowerCase()))
      .map(user => user.follower.username)
    }
    setFilteredList(filtered)
  },[followers, commentContent, showMentionList])

  function calculateMentionPosition() {
    if (!textFieldRef.current) return
    const input = textFieldRef.current
    const paper = mentionRef.current
    if (input && paper) {
      const computed = window.getComputedStyle(input)
      const inputRect = input.getBoundingClientRect()

      const textBeforeCursor = commentContent.substring(0, cursorPositionRef.current)
      const lastAtIndex = textBeforeCursor.lastIndexOf('@')
      const textUpToAt = commentContent.substring(0, lastAtIndex)

      const paddingLeft = parseInt(computed.paddingLeft)
      const paddingTop = parseInt(computed.paddingTop)

      const lineHeight = parseInt(computed.lineHeight) || parseInt(computed.fontSize) * 1.2

      const lines = textUpToAt.split('\n')
      const lineCount = lines.length
      const lastLine = lines[lines.length - 1]

      const tempSpan = document.createElement('span')
      tempSpan.style.font = computed.font
      tempSpan.style.fontSize = computed.fontSize
      tempSpan.style.fontFamily = computed.fontFamily
      tempSpan.style.visibility = 'hidden'
      tempSpan.style.position = 'absolute'
      tempSpan.textContent = lastLine
      document.body.appendChild(tempSpan)

      const textWidth = tempSpan.offsetWidth
      document.body.removeChild(tempSpan)

      const scrollTop = input.scrollTop || 0
      const yOffset = (lineCount - 1) * lineHeight - scrollTop

      const paperHeight = paper.offsetHeight
      const margin = 8

      setMentionPosition({
        top: inputRect.top + paddingTop + yOffset - paperHeight - margin + window.scrollY,
        left: inputRect.left + paddingLeft + textWidth + window.scrollX
      })
    }
  }

  async function handleCommentChange(e) {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    cursorPositionRef.current = cursorPos
    setCommentContent(value)

    const textBeforeCursor = value.substring(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
    if(lastAtIndex!==-1 && !textAfterAt.includes(' ') && !textAfterAt.includes('\n')){ 
      if(!showMentionList) setSelectedIndex(0)
      setShowMentionList(true)
      await fetchFollowers()
    }
    else setShowMentionList(false)
  }

  function handleSelectUser(username) {
    const cursorPos = cursorPositionRef.current
    const textBeforeCursor = commentContent.substring(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')

    const newText =
      commentContent.substring(0, lastAtIndex) +
      `@${username} ` +
      commentContent.substring(cursorPos)

    setCommentContent(newText)
    setShowMentionList(false)

    if (textFieldRef.current) {
      const newCursorPos = lastAtIndex + username.length + 2
      setTimeout(() => {
        textFieldRef.current.focus()
        textFieldRef.current.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  function handleKeyDown(e) {
    if (showMentionList && filteredList.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => prev < filteredList.length - 1 ? prev + 1 : 0)
          onKeyDownHandled?.(true)
          return
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredList.length - 1)
          onKeyDownHandled?.(true)
          return
        case 'Enter':
          e.preventDefault()
          handleSelectUser(filteredList[selectedIndex])
          onKeyDownHandled?.(true)
          return
        case 'Escape':
          e.preventDefault()
          e.stopPropagation()
          setShowMentionList(false)
          onKeyDownHandled?.(true)
          return
      }
    }
    onKeyDownHandled?.(false)
  }

  useEffect(() => {
    if (showMentionList && mentionRef.current) {
      calculateMentionPosition()
    }
  }, [showMentionList, filteredList])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mentionRef.current &&
        !mentionRef.current.contains(event.target) &&
        textFieldRef.current &&
        !textFieldRef.current.contains(event.target)
      ) {
        setShowMentionList(false)
      }
    }

    if (showMentionList) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMentionList])

  return {
    handleCommentChange,
    handleKeyDown,
    mentionUI: showMentionList ? (
      <Paper
        ref={mentionRef}
        elevation={6}
        sx={{
          position: "fixed",
          top: `${mentionPosition.top}px`,
          left: `${mentionPosition.left}px`,
          maxHeight: '200px',
          width: '250px',
          overflowY: 'auto',
          zIndex: 1300,
          bgcolor: '#323232',
          border: '1px solid #444',
        }}
      >
        <List dense disablePadding>
          {filteredList.map((user, index) => (
            <ListItem key={user} disablePadding >
              <ListItemButton
                selected={index === selectedIndex}
                sx={{
                  color: 'white',
                   '&.Mui-selected': {
                    backgroundColor: '#0f71da2d !important',
                    },
                  '&:hover': { bgcolor: index === selectedIndex ? '#0d47a1' : '#1e1e1e' },
                  borderBottom: index === filteredList.length - 1 ? 'none' : '1px solid #c8c8c8',
                }}
                onClick={() => handleSelectUser(user)}
              >
                <ListItemText primary={user} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <div 
          ref={followersRef} 
          style={{ visibility: isFollowingsHasMore ? "visible" : "hidden" }}
        />
      </Paper>
    ) : null
  }
}
