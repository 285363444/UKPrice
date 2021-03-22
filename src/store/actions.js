import { GET_MESSAGE_LIST } from './contants'
import { getMessageList } from '../apis'

export const msgListAction = () => async dispatch => {
  window._loading(true)
  const result = await getMessageList()
  window._loading(false)
  if (result && result.status === 0) {
    dispatch({
      type: GET_MESSAGE_LIST,
      payload: result.datas
    })
  }
}