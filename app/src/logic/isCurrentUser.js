import { utils } from 'com'
import context from './context'

const { extractSubFromToken } = utils

export default userId => userId === extractSubFromToken(context.token)
// export default (userId) => userId === extractSubFromToken(context.token)
