import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import { PlaylistPreviewType } from '@/types/playlist'

const usePlaylistQuery = (playlistId?: string) => {
  const { useGet } = useApi()

  const path = playlistId
    ? `${API_URLS.PLAYLIST.MAIN}/${playlistId}`
    : API_URLS.PLAYLIST.MAIN

  return useGet<APIResponse<PlaylistPreviewType[]>>(path, [
    API_URLS.PLAYLIST.MAIN,
  ])
}

export { usePlaylistQuery }
