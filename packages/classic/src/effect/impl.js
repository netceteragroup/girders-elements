'use strict'

import * as R from 'ramda'

import * as actions from '../action'
import { types as actionTypes } from './actions'
import * as data from '../data'
import { ActionRegistry } from '../registry'

import { findParentEntry } from '../impl/cursor'
import { error } from '../impl/log'

const updateStateAction = '@@skele/_effects.updateState'

export const middleware = R.curry((config, store, next, action) => {
  const { kernel, effectsRegistry } = config
  const actionMeta = actions.actionMeta(action)

  if (actionMeta == null) return next(action)

  const key = ActionRegistry.keyFromAction(action)
  let effect = effectsRegistry.get(key)
  let context = kernel.focusOn(actionMeta.keyPath)

  if (effect == null && action.type.startsWith('.')) {
    // global action
    const keyFn = el => ActionRegistry.keyFor(data.kindOf(el), action.type)
    const entry = findParentEntry(effectsRegistry, keyFn, context.query())

    if (entry != null) {
      const { element, entry: eff } = entry
      effect = eff
      context = kernel.focusOn(element._keyPath)
    }
  }

  if (effect != null) {
    const result = effect(context, action)

    if (result && typeof result.then === 'function') {
      result
        .then(updateFn => {
          if (typeof updateFn === 'function') {
            context.dispatch({ type: updateStateAction, updateFn })
          }
        })
        .catch(e => {
          kernel.dispatch({ type: actionTypes.fail, error: e })
          error('Exception while executing an effect: ', e)
        })
    } else if (typeof result === 'function') {
      context.dispatch({ type: updateStateAction, updateFn: result })
    }
  } else {
    // the effect consumes the action
    return next(action)
  }
})

export const reducer = R.curry((config, state, action) => {
  if (action.type === updateStateAction) {
    const { keyPath } = actions.actionMeta(action)
    return state.updateIn(keyPath, action.updateFn)
  }
  return state
})
