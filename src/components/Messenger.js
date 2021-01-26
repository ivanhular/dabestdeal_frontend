import React from 'react'
import MessengerCustomerChat from 'react-messenger-customer-chat'

function Messenger() {
  return (
    <MessengerCustomerChat
      pageId='101068068473143'
      themeColor='#258085'
      appId={process.env.REACT_APP_FB_APP_ID}
      //   htmlRef='<REF_STRING>'
    />
  )
}

export default Messenger
