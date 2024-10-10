import { intersectionWith, isEqual, isInteger, mergeWith, sampleSize, unionWith } from 'lodash-es'
import { isArray, isObject } from './is'
import type { TargetContext } from '@/typings'

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target)
    return source as T & U

  if (!source)
    return target as T & U

  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual)
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual)
        case 'concat':
          return sourceValue.concat(targetValue)
        case 'replace':
          return targetValue
        default:
          throw new Error(`Unknown merge array strategy: ${mergeArrays as string}`)
      }
    }
    if (isObject(targetValue) && isObject(sourceValue))
      return deepMerge(sourceValue, targetValue, mergeArrays)

    return undefined
  })
}

/**
 * 打开新窗口跳转链接
 * @param {string} url 跳转链接
 * @param {object} opt 跳转参数
 * @param {TargetContext | string} opt.target
 * @param {boolean} opt.noopener
 * @param {boolean} opt.noreferrer
 */
export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {string} prop 当前 prop
 */
export function handleProp(prop: string): string {
  const propArr = prop.split('.')
  if (propArr.length === 1)
    return prop
  return propArr[propArr.length - 1]
}

export function getRandomImg(size = 1) {
  if (!isInteger(size) || size < 1)
    throw new Error('参数必须是一个正整数!')

  // 匹配该目录下所有的图片
  const images: string[] = []
  for (let i = 1; i <= 20; i += 1) {
    const img = new URL(`../assets/img/${i}.jpg`, import.meta.url).href
    images.push(img)
  }
  // 获取图片集合
  const result = sampleSize(images, size)
  return result.length === 1 ? result[0] : result
}
