import React, { Component, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

// class ScrollToTop extends Component {
//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//       window.scrollTo(0, 0)
//     }
//   }

//   render() {
//     return <React.Fragment />
//   }
// }

const ScrollToTop = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return <></>
}

// export default withRouter(ScrollToTop)
export default withRouter(ScrollToTop)
