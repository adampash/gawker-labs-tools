import { TEST } from '../actions/example'

export function foo(state='bar', action) {
  switch (action.type) {
  case TEST:
    return action.text
  default:
    return state
  }
}
