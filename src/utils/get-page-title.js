import defaultSettings from '@/settings'

const title = defaultSettings.title || '小九直播'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
