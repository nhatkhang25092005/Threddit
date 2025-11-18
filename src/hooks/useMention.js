import { useRef, useState, useEffect } from "react"

export default function useMention({
  textFieldRef,
  commentContent,
  setCommentContent,
  followings,
  fetchFollowings
}) {
  const cursorPositionRef = useRef(null)
  const [showMentionList, setShowMentionList] = useState(false)
  const [filteredList, setFilteredList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const mentionRef = useRef(null)
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 })

  // Calculate position for mention list
  function calculateMentionPosition() {
    if (!textFieldRef.current) return
    const textField = textFieldRef.current
    const input = textField.querySelector('textarea') || textField.querySelector('input')
    const paper = mentionRef.current
    if (input && paper) {
      const rect = input.getBoundingClientRect()
      const paperHeight = paper.offsetHeight
      const margin = 8
      setMentionPosition({
        top: rect.top - paperHeight - margin + window.scrollY,
        left: rect.left + window.scrollX
      })
    }
  }

  // Handle comment change to detect @ mentions
  function handleCommentChange(e) {
    const value = e.target.value
    const cursorPos = e.target.selectionStart
    cursorPositionRef.current = cursorPos
    setCommentContent(value)

    // Find the position of '@'
    const textBeforeCursor = value.substring(0, cursorPos)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        // Show mention list if not already shown
        if (!showMentionList) {
          setShowMentionList(true)
          setSelectedIndex(0)
          fetchFollowings()
        }
        
        // Filter the array by username
        let filtered = []
        if (!textAfterAt) {
          filtered = followings.map(user => user.followee.username)
        } else {
          filtered = followings
            .filter(user => 
              user.followee.username.toLowerCase().includes(textAfterAt.toLowerCase())
            )
            .map(user => user.followee.username)
        }
        setFilteredList(filtered)
        
        // Close list if no matches
        if (filtered.length === 0) setShowMentionList(false)
      } else {
        setShowMentionList(false)
      }
    } else {
      setShowMentionList(false)
    }
  }

  // Handle user selection from mention list
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

    // Set cursor position after username
    if (textFieldRef.current) {
      const input = textFieldRef.current.querySelector('textarea')
      if (input) {
        const newCursorPos = lastAtIndex + username.length + 2
        input.focus()
        input.setSelectionRange(newCursorPos, newCursorPos)
      }
    }
  }

  // Handle keyboard navigation in mention list
  function handleKeyDown(e) {
    if (showMentionList && filteredList.length > 0) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => prev < filteredList.length - 1 ? prev + 1 : 0)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : filteredList.length - 1)
          break
        case 'Enter':
          e.preventDefault()
          handleSelectUser(filteredList[selectedIndex])
          break
        case 'Escape':
          e.preventDefault()
          e.stopPropagation()
          setShowMentionList(false)
          break
      }
      return true // Indicate that mention list handled the key
    }
    return false // Indicate that mention list did not handle the key
  }

  // Update mention position when list is shown
  useEffect(() => {
    if (showMentionList && mentionRef.current) {
      calculateMentionPosition()
    }
  }, [showMentionList, filteredList])

  // Handle click outside to close mention list
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
    mentionRef,
    showMentionList,
    filteredList,
    selectedIndex,
    mentionPosition,
    handleCommentChange,
    handleSelectUser,
    handleKeyDown
  }
}