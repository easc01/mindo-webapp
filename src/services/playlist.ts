import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import {
  GroupedVideosResponse,
  PlaylistData,
  PlaylistPreviewType,
} from '@/types/playlist'

const usePlaylistQuery = (searchTag: string) => {
  const { useGet } = useApi()
  return useGet<APIResponse<PlaylistPreviewType[]>>(
    `${API_URLS.PLAYLIST.MAIN}?searchTag=${searchTag}`,
    [API_URLS.PLAYLIST.MAIN, searchTag]
  )
}

const usePlaylistByIdQuery = (playlistId: string) => {
  const { useGet } = useApi()
  return useGet<APIResponse<PlaylistData>>(
    `${API_URLS.PLAYLIST.MAIN}/${playlistId}`,
    [API_URLS.PLAYLIST.MAIN, playlistId]
  )
}

const useFetchTopicVideos = (topicId: string, videoId?: string) => {
  const { useGet } = useApi()
  const path = videoId
    ? `${API_URLS.PLAYLIST.TOPICS}/${topicId}/videos?videoId=${videoId}`
    : `${API_URLS.PLAYLIST.TOPICS}/${topicId}/videos`

  return useGet<APIResponse<GroupedVideosResponse>>(path, [
    API_URLS.PLAYLIST.TOPICS,
    topicId,
    'videos',
    videoId ?? '',
  ])
}

const useGeneratePlaylist = (playlistTitle: string) => {
  const { usePostQuery } = useApi()

  return usePostQuery<APIResponse<PlaylistData>>(
    `${API_URLS.PLAYLIST.MAIN}/gen-ai?playlistTitle=${playlistTitle}`,
    {},
    [API_URLS.PLAYLIST.MAIN, 'gen-ai', playlistTitle]
  )
}

export {
  usePlaylistQuery,
  usePlaylistByIdQuery,
  useFetchTopicVideos,
  useGeneratePlaylist,
}
