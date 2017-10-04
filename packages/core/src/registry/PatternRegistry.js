'use strict'

import AbstractRegistry from './AbstractRegistry'
import { List, is, Iterable } from 'immutable'
import R from 'ramda'

export default class PatternRegistry extends AbstractRegistry {
  constructor() {
    super()
    this._registry = new List()
  }

  register(key, value) {
    let pattern
    if (typeof key === 'function') {
      pattern = List.of(key, value)
    } else if (key instanceof RegExp) {
      const regexp = key
      pattern = List.of(regexp.test.bind(regexp), value)
    } else {
      pattern = List.of(equals(key), value)
    }
    this._registry = this._registry.push(pattern)
  }

  reset() {
    this._registry = new List()
  }
  _adaptKey(key) {
    return key
  }

  _getInternal(key) {
    let result = this._registry.find(r => r.get(0)(key))

    if (result) {
      return result.get(1)
    }
  }

  _lessSpecificKey() {
    return null
  }
}

const equals = R.curryN(
  2,
  R.ifElse(
    (a, b) => Iterable.isIterable(a) && Iterable.isIterable(b),
    is,
    R.equals
  )
)
