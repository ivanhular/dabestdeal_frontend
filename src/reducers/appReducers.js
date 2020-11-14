import { MODAL_OPEN, MODAL_CLOSE } from '../constants/appConstants'

export const appModalReducers = (
  state = { modal: false },
  { type, payload }
) => {
  switch (type) {
    case MODAL_OPEN:
      return {
        ...state,
        modal: true,
      }
    case MODAL_CLOSE:
      return {
        ...state,
        modal: false,
      }
    default:
      return state
  }
}
