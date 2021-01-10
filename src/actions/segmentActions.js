import axios from 'axios'
import {
  // SEGMENT_CREATE_REQUEST,
  // SEGMENT_CREATE_SUCCESS,
  // SEGMENT_CREATE_FAIL,
  // SEGMENT_CREATE_RESET,
  // SEGMENT_LIST_REQUEST,
  SEGMENT_LIST_SUCCESS,
  SEGMENT_LIST_FAIL,
} from '../constants/segmentConstants'

export const listSegments = () => async (dispatch) => {
  try {
    // dispatch({ type: SEGMENT_LIST_REQUEST })

    const { data } = await axios.get('/api/segments')

    dispatch({ type: SEGMENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SEGMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
