'use strict'

import R from 'ramda'
import { memoize, time } from '../impl/util'
import * as data from '../data'
import * as zip from '../zip'

// export function enhancer(config) {
//   const { registry, elementZipper } = config
//
//   const enhancersForKind = memoize(kind => {
//     const enhancers = registry.get(kind)
//     return enhancers.isEmpty() ? null : enhancers
//   })
//
//   async function enhance(loc, context) {
//     const { elementZipper } = context
//
//     const kind = data.flow(loc, zip.value, data.kindOf)
//     const enhancers = enhancersForKind(kind)
//     if (enhancers != null) {
//       const el = zip.value(loc)
//       let updates = await time(`TIME-ehnace-(${kind})`, Promise.all)(
//         enhancers.map(e => e(el, context)).toArray()
//       )
//       // debugger
//       updates = compressUpdates(updates, elementZipper)
//       const enhancedValue = R.reduce((v, u) => u(v), el, updates)
//       loc = zip.replace(enhancedValue, loc)
//     }
//
//     return loc
//   }
//
//   return async (el, context = {}) =>
//     zip.value(await enhance(elementZipper(el), context))
// }

export function extractUpdates(config) {
  const { registry, elementZipper } = config

  const enhancersForKind = memoize(kind => {
    const enhancers = registry.get(kind)
    return enhancers.isEmpty() ? null : enhancers
  })

  async function _extractUpdates(loc, context, config) {
    if (config == null) {
      config = {
        minNumberOfArgs: 0,
        maxNumberOfArgs: 2,
      }
    }

    const kind = data.flow(
      loc,
      zip.value,
      el =>
        el.update('kind', kind => kind.filterNot(term => term === '__loading')),
      data.kindOf
    )
    const enhancers = enhancersForKind(kind).filter(
      e =>
        e.length >= config.minNumberOfArgs && e.length <= config.maxNumberOfArgs
    )
    if (enhancers != null) {
      const el = zip.value(loc)
      return time(`TIME-enhance-(${kind})`, Promise.all)(
        enhancers
          .map(e => {
            if (e.length <= 1) {
              return e(context)
            }
            return e(el, context)
          })
          .toArray()
      )
    }

    return []
  }

  return async (el, context = {}, config) =>
    await _extractUpdates(elementZipper(el), context, config)
}

export function executeUpdates(config) {
  const { elementZipper } = config

  function _executeUpdates(loc, ...updates) {
    if (updates != null) {
      if (updates.length > 1) {
        updates = R.concat(...updates)
      } else {
        updates = updates[0]
      }
      updates = compressUpdates(updates, elementZipper)
      const el = zip.value(loc)
      const enhancedValue = R.reduce((v, u) => u(v), el, updates)
      loc = zip.replace(enhancedValue, loc)
    }
    return loc
  }

  return async (el, ...updates) =>
    zip.value(_executeUpdates(elementZipper(el), ...updates))
}

// "compress updates"
// partition the updates into runs of consecutive arrays / functions
// convert consecutive arrays into a single editCond call

function compressUpdates(updates, elementZipper) {
  const slices = partitionBy(Array.isArray, updates)

  return R.chain(
    R.when(R.pipe(R.head, Array.isArray), slice => [
      R.pipe(elementZipper, zip.editCond(concatAll(slice)), zip.value),
    ]),
    slices
  )
}

function partitionBy(fn, list) {
  if (!R.isEmpty(list)) {
    const v = R.head(list)
    const fv = fn(v)
    const run = [v, ...R.takeWhile(x => R.equals(fv, fn(x)), R.tail(list))]

    return [run, ...partitionBy(fn, R.drop(R.length(run), list))]
  }

  return []
}

const concatAll = lists => R.reduce(R.concat, [], lists)
