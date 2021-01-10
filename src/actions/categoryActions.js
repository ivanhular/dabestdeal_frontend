import axios from 'axios'
import {
  // CATEGORY_CREATE_REQUEST,
  // CATEGORY_CREATE_SUCCESS,
  // CATEGORY_CREATE_FAIL,
  // CATEGORY_CREATE_RESET,
  // CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_ADD_SEGMENT_REQUEST,
  CATEGORY_ADD_SEGMENT_SUCCESS,
  CATEGORY_ADD_SEGMENT_FAIL,
} from '../constants/categoryConstants'

export const listCategories = () => async (dispatch) => {
  try {
    // dispatch({ type: SEGMENT_LIST_REQUEST })

    const { data } = await axios.get('/api/categories')

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addSegmentToCategory = (categoryId, segmentId) => async (
  dispatch,
  getState
) => {
  try {
    // const {
    //   userLogin: { userInfo },
    // } = getState()

    const config = {
      headers: {
        withCredentials: true,
        // 'Content-Type': 'application/json',
        // Authorization: `Bearer ${userInfo.token}`,
      },
    }

    dispatch({ type: CATEGORY_ADD_SEGMENT_REQUEST })

    const { data } = await axios.patch(
      `/api/categories/${categoryId}`,
      { segments: segmentId },
      config
    )
    console.log(data)

    dispatch({ type: CATEGORY_ADD_SEGMENT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CATEGORY_ADD_SEGMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
