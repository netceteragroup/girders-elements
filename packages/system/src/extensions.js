'use strict'

import invariant from 'invariant'
import { unitMeta, updateUnitMeta } from './unit'
import uuid from 'uuid'
import * as u from './util'

const idProp = '@@skele/system.internal.extensionId'

export default function ExtensionSlot(def) {
  invariant(
    typeof def === 'function',
    'You must provide a function that defines the extension slot'
  )

  const id = uuid()

  const slot = function extensionSlot(unit) {
    invariant(unit != null, 'You must provide a unit')

    let ext = extensionOf(slot, unit)

    if (ext == null) {
      ext = def()

      invariant(
        typeof ext === 'object' && !Array.isArray(ext),
        'ExtensionSlot fn must return an object'
      )

      invariant(
        typeof ext.collect === 'function',
        'the ExtensionSlot fn return value must have a `collect()` method'
      )

      setExtension(slot, ext, unit)
    }

    return ext
  }

  slot[idProp] = id

  return slot
}

export const extensionOf = (slot, unit) => {
  invariant(slot[idProp] != null, 'You must provide an extension slot')

  return extensionsOf(unit)[slot[idProp]]
}

export const exportExtensions = (slot, target, [...units]) => {
  console.log('units', units)
  const ext = extensionOf(slot, target)

  invariant(ext == null, 'Extension for slot ' + slot + ' already exists')

  setExtension(
    slot,
    {
      export() {
        return u.flow(
          units,

          u.map(u.partial(collect, slot)),
          u.flatten
        )
      },
    },
    target
  )
}

export const idOf = ext => ext[idProp]

export const collect = (slot, unit) => {
  const ext = extensionOf(slot, unit)
  if (ext != null) {
    if (ext.collect != null) {
      return [{ ...ext.collect(), [idProp]: slot[idProp] }]
    } else if (ext.export != null) {
      return ext.export()
    }
  }
  return []
}

const extensionsOf = unit => unitMeta(unit).extensions || {}

const updateExtensions = (update, ss) =>
  updateUnitMeta(
    u.partial(u.update, 'extensions', exts => update(exts || {})),
    ss
  )

const setExtension = (slot, ext, unit) =>
  updateExtensions(u.partial(u.assoc, slot[idProp], ext), unit)