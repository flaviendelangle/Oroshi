import { get } from '../../../../common/lib/pluginLoader'

// eslint-disable-next-line import/prefer-default-export
export const queries = type => get(type).queries
