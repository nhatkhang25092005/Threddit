import { notification } from "../../constant/text/vi/notification.text"
import { convertTime } from "../../utils/formatDate"

const resolveNotificationContent = (target = {}) => {
  const template = notification.message[target.type]

  if (typeof template === "function") return template(target)
  if (typeof template === "string" && template.trim()) return template

  return "đã gửi một thông báo mới"
}

export const resolveNotificationMessage = (target = {}) => {
  const content = resolveNotificationContent(target)
  const actorDisplayName = target.actorDisplayName?.trim()

  return actorDisplayName ? `${actorDisplayName} ${content}` : content
}

export const resolveNotificationItem = (item = {}) => ({
  ...item,
  message: resolveNotificationMessage(item.target),
  createdAt: convertTime(item.createdAt)
})

export const resolveNotificationList = (list = []) => list.map(resolveNotificationItem)
