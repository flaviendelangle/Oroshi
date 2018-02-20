import StreamGeneratorOriginal from '../../services/content/streamGenerator'


class StreamGenerator extends StreamGeneratorOriginal {
  constructor(...args) {
    super('name', 'desc', ...args)
  }
}

export default StreamGenerator
