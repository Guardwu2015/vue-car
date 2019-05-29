export default class Analytics {
  constructor (_key) {
    this.key = _key
    // Build queue
    window.ga = window.ga || function () {
      (window.ga.q = window.ga.q || []).push(arguments)
    }
    window.ga.l = +new Date()
    // Create tracker
    window.ga('create', this.key, 'auto')
    window.ga('require', 'displayfeatures')
    // Send first pageview
    window.ga('send', 'pageview')
    this.params = {}
  }

  uiEvent (_action, _label) {
    this.params = {
      hitType: 'event',
      eventCategory: 'UI Events',
      eventAction: _action
    }
    if (_label !== undefined) {
      this.params.eventLabel = _label
    }
    this.send()
  }

  pageView (_page) {
    this.params = {
      hitType: 'pageview',
      page: _page
    }
    this.send()
  }

  outbound (_location) {
    this.params = {
      hitType: 'event',
      eventCategory: 'Social Share Link',
      eventAction: 'click',
      eventLabel: _location
    }
    this.send()
  }

  send () {
    window.ga('send', this.params)
  }
}
