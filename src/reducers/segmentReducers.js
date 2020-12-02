import {
  SEGMENT_CREATE_REQUEST,
  SEGMENT_CREATE_SUCCESS,
  SEGMENT_CREATE_FAIL,
  SEGMENT_CREATE_RESET,
  SEGMENT_LIST_REQUEST,
  SEGMENT_LIST_SUCCESS,
  SEGMENT_LIST_FAIL,
  SEGMENT_LIST_RESET,
} from '../constants/segmentConstants'

export const segmentListReducer = (
  state = { loading: false, segments: {} },
  { type, payload }
) => {
  switch (type) {
    case SEGMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case SEGMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        segments: payload,
      }
    case SEGMENT_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      }
    }
    default:
      return state
  }
}
