import StreamGeneratorOriginal from '../../../../webapp/src/services/content/streamGenerator'


class StreamGenerator extends StreamGeneratorOriginal {
  constructor(...args) {
    super('name', 'desc', ...args)
  }
}

export default StreamGenerator
