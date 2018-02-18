import StreamGeneratorOriginal from 'services/content/streamGenerator'


class StreamGenerator extends StreamGeneratorOriginal {
  constructor(...args) {
    super('name', 'desc', ...args)
  }

  prepareData() {
    if (this.key.field === 'release') {
      this.data = this.data.map(el => ({
        ...el,
        release: [{
          name: String(el.release),
          pk: el.release,
        }],
      }))
    }
  }
}

export default StreamGenerator
