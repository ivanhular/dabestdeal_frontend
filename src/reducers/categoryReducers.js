import {
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_RESET,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_RESET,
  CATEGORY_ADD_SEGMENT_REQUEST,
  CATEGORY_ADD_SEGMENT_SUCCESS,
  CATEGORY_ADD_SEGMENT_FAIL,
} from '../constants/categoryConstants'

export const categoryListReducer = (
  state = { loading: false, categories: [] },
  { type, payload }
) => {
  switch (type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: payload,
      }
    case CATEGORY_LIST_FAIL: {
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

export const addSegmentReducer = (
  state = { loading: false, category: {} },
  { type, payload }
) => {
  switch (type) {
    case CATEGORY_ADD_SEGMENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CATEGORY_ADD_SEGMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        category: payload,
      }
    case CATEGORY_ADD_SEGMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
