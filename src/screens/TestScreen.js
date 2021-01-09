import React, { useState } from 'react'
import { Thumbs } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

// install Swiper's Thumbs component
Swiper.use([Thumbs])

const TestScreen = () => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <main>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <Swiper thumbs={{ swiper: thumbsSwiper }}>{/* ... */}</Swiper>

      {/* Thumbs Swiper -> store swiper instance */}
      {/* It is also required to set watchSlidesVisibility and watchSlidesProgress props */}
      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesVisibility
        watchSlidesProgress
      >
        {/* ... */}
      </Swiper>
    </main>
  )
}

export default TestScreen
