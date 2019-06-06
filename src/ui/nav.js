export default class Nav {
  constructor (_parent) {
    this.parentControls = _parent
    this.navBox = document.getElementById('navBox')
    this.navInner = document.getElementById('navInner')
    this.navShow = document.getElementById('navShow')
    this.navItems = document.getElementsByClassName('navItem')
    this.disclaimer = document.getElementById('disclaimer')
    this.navInner.style.opacity = '1'
    this.navInner.style.display = 'block'
    this.navShow.style.transform = 'scale(1.0)'
    this.disclaimer.classList.add('enabled')
    this.activeSection = -1
    for (let i = 0; i < this.navItems.length; i++) {
      this.navItems[i].addEventListener('click', this.navClick.bind(this, i), false)
    }
    this.navShow.addEventListener('click', this.mobileNavShow.bind(this), false)
    // Exit buttons
    document.getElementById('reserveBut').addEventListener('click', this.exitBtnClick.bind(this, 0), false)
    document.getElementById('Twitter').addEventListener('click', this.exitBtnClick.bind(this, 1), false)
    document.getElementById('Facebook').addEventListener('click', this.exitBtnClick.bind(this, 2), false)
    document.getElementById('LinkedIn').addEventListener('click', this.exitBtnClick.bind(this, 3), false)
    document.getElementById('subscribeBut').addEventListener('click', this.exitBtnClick.bind(this, 4), false)
    // Avoid pinch-zoom on iOS devices
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      this.navBox.addEventListener('touchmove', function (evt) {
        if (evt.touches.length > 1) {
          evt.preventDefault()
        }
      })
      this.navShow.addEventListener('touchmove', function (evt) {
        evt.preventDefault()
      }, false)
    }
  }

  exitBtnClick (_i, evt) {
    let url
    let labelGA
    switch (_i) {
      case 0:
        url = 'https://www.ff.com/us/reserve/'
        labelGA = 'reserve button'
        break
      case 1:
        url = 'https://twitter.com/share?url=https://3d.ff.com&text=Check out the Faraday Future FF 91 3D Tour @FaradayFuture'
        labelGA = 'twitter'
        break
      case 2:
        url = 'https://www.facebook.com/sharer/sharer.php?u=https://3d.ff.com'
        labelGA = 'facebook'
        break
      case 3:
        url = 'https://www.linkedin.com/shareArticle?mini=true&url=https://3d.ff.com&title=Faraday Future FF 91 3D tour&summary=Check out the Faraday Future FF 91 3D Tour'
        labelGA = 'linkedin'
        break
      case 4:
        url = 'https://www.ff.com/us/newsletter-subscribe/'
        labelGA = 'subscribe'
        break
    }
    this.parentControls.outboundGA(labelGA)
    window.open(url, '_blank')
  }

  navClick (_index, ev) {
    // Toggle nav & button if mobile
    this.navBox.classList.remove('visible')
    this.navShow.classList.remove('hidden')
    this.parentControls.mobileNavClosed()
    if (_index === this.activeSection) {
      return null
    }
    // Undo last active section
    if (this.activeSection >= 0) {
      this.navItems[this.activeSection].classList.remove('active')
    }
    // Establish new active section
    this.activeSection = _index
    this.navItems[_index].classList.add('active')
    if (this.activeSection === 4 || this.activeSection === 5) {
      this.navBox.classList.add('inverted')
      this.disclaimer.classList.add('inverted')
    } else {
      this.navBox.classList.remove('inverted')
      this.disclaimer.classList.remove('inverted')
    }
    this.parentControls.navClicked(_index)
  }

  mobileNavHide () {
    this.navBox.classList.remove('visible')
    this.navShow.classList.remove('hidden')
  }

  mobileNavShow () {
    this.navBox.classList.add('visible')
    this.navShow.classList.add('hidden')
    this.parentControls.mobileNavOpened()
  }
}
