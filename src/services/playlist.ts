import useApi from '@/lib/api'
import API_URLS from '@/lib/api-urls'
import { APIResponse } from '@/types/common'
import { PlaylistData, PlaylistPreviewType } from '@/types/playlist'

const usePlaylistQuery = () => {
  const { useGet } = useApi()
  return useGet<APIResponse<PlaylistPreviewType[]>>(API_URLS.PLAYLIST.MAIN, [
    API_URLS.PLAYLIST.MAIN,
  ])
}

const usePlaylistByIdQuery = (playlistId: string) => {
  const { useGet } = useApi()
  return useGet<APIResponse<PlaylistData>>(
    `${API_URLS.PLAYLIST.MAIN}/${playlistId}`,
    [API_URLS.PLAYLIST.MAIN, playlistId]
  )
}

export { usePlaylistQuery, usePlaylistByIdQuery }
