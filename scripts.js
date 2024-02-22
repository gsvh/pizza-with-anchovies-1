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
    if (slide.content?.length) {
      const contentContainer = document.createElement('div')
      contentContainer.className = 'content'
      slide.content.forEach((contentItem) => {
        const contentElement = document.createElement('p')
        contentElement.textContent = contentItem
        contentContainer.appendChild(contentElement)
      })
      slideElement.appendChild(contentContainer)
    }

    // Add unordered list
    if (slide.list?.length) {
      const listContainer = document.createElement('ul')
      slide.list.forEach((listItem) => {
        const listItemElement = document.createElement('li')
        listItemElement.textContent = listItem
        listContainer.appendChild(listItemElement)
      })
      slideElement.appendChild(listContainer)
    }

    // Add links
    if (slide.links?.length) {
      const linksContainer = document.createElement('div')
      linksContainer.className = 'links'
      slide.links.forEach((link) => {
        const linkElement = document.createElement('a')
        linkElement.textContent = link.title
        linkElement.href = link.url
        linkElement.target = '_blank'
        linksContainer.appendChild(linkElement)
      })
      slideElement.appendChild(linksContainer)
    }

    slidesContainer.appendChild(slideElement)
  })
}

async function loadSlidesData() {
  const response = await fetch('data.json')
  const slidesData = await response.json()
  generateSlides(slidesData)
}

async function getLocationInformation() {
  const response = await fetch('https://ipapi.co/json')
  const responseData = await response.json()

  const locationTag = document.getElementById('location')
  if (responseData.city) {
    locationTag.textContent = `Somewhere near ${responseData.city}, ${responseData.region}, ${responseData.country_name}`
  } else {
    locationTag.textContent = `Somewhere near I don't know`
  }
}

loadSlidesData()
getLocationInformation()
