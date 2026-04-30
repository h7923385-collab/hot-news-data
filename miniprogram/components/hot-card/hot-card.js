Component({
  properties: {
    rank: { type: Number, value: 0 },
    title: { type: String, value: '' },
    hot: { type: String, value: '' },
    source: { type: String, value: '' }
  },
  methods: {
    onTap() { this.triggerEvent('tap', {}) }
  }
})
