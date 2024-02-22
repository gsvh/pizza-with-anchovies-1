function generateSlides(slidesData) {
  const slidesContainer = document.getElementById('slides-container')

  slidesData.forEach((slide) => {
    const slideElement = document.createElement('section')
    slideElement.className = 'slide'

    // Add title
    const titleContainer = document.createElement('div')
    titleContainer.className = 'title'
    const titleElement = document.createElement('h1')
    titleElement.textContent = slide.title
    titleContainer.appendChild(titleElement)
    slideElement.appendChild(titleContainer)

    // Add content
    const contentContainer = document.createElement('div')
    contentContainer.className = 'content'
    slide.content.forEach((contentItem) => {
      const contentElement = document.createElement('p')
      contentElement.textContent = contentItem
      contentContainer.appendChild(contentElement)
    })
    slideElement.appendChild(contentContainer)

    slidesContainer.appendChild(slideElement)
  })
}

async function loadSlidesData() {
  const response = await fetch('data.json')
  const slidesData = await response.json()
  generateSlides(slidesData)
}

loadSlidesData()
