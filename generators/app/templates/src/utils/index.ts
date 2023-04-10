/*
 * @Author: LYM
 * @Date: 2022-04-12 16:19:25
 * @LastEditors: LYM
 * @LastEditTime: 2022-11-16 12:55:23
 * @Description: 公共工具
 */

export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

// 获取Storage
export const getStorage = (key: string) => {
  return localStorage.getItem(key)
}

// 删除Storage
export const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}

// 获取cookie
export const getCookie = (name: string) => {
  let arr
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return +unescape(arr[2])
  }
  return null
}

// 移除所有
export const removeAll = () => {
  localStorage.clear()
}

/**
 * @description 检测一个变量是否是数组并且不为空
 * @param arr
 * @returns {boolean}
 */
export const isArrayEmpty = (arr: any) => {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * @description 检测一个变量是否是数组
 * @param arr
 * @returns {boolean}
 */
export const isArray = (arr: any) => {
  return Array.isArray(arr)
}

/**
 * 获取字符串中 :value 形式的参数
 */
export const getTextParams = (text: string) => {
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi
  return text.match(reg) ?? []
}

/**
 * 替换字符串中 :value 形式的参数
 */
export const replaceTextParams = (
  text: string,
  data: Record<string, string>
) => {
  if (Object.keys(data).length === 0) {
    return text
  }
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi
  return text.replace(reg, (key: string) => {
    return data[key.substring(1)] ?? key
  })
}

/**
 * 简单计算字符串长度
 */
export const calcStrLen = (str: string) => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2
    } else {
      len++
    }
  }
  return len
}

/**
 * 简单计算字符串宽度
 */
let TextCanvas: HTMLCanvasElement | null = null
export const calcStrWidth = (str: string, font: string) => {
  if (!TextCanvas) {
    TextCanvas = document.createElement('canvas')
  }
  const ctx = TextCanvas.getContext('2d')
  if (ctx?.font) {
    ctx.font = font
    ctx.font
    return ctx.measureText(str).width
  }
}

// 判断是否为json
export const isJSON = (str: any) => {
  if (typeof str == 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}

/**
 * 字符串rgb转数组
 * @param {string} color "rgb(1,2,3)"
 * @return {array} [1,2,3]
 */
export const rgbaToArray = (color: string) => {
  const pattern = /^rgb\((\d+),(\d+),(\d+)\)$/gi
  const matched = pattern.exec(color.replace(/\s*/g, ''))
  if (matched !== null) {
    const result = Array.prototype.slice.call(matched)
    result.shift()
    return result
  }
}

/**
 *   获取url参数
 * @param {string} name  参数名
 * @return {string}  参数值
 */
export const getUrlParam = (name: string) => {
  const reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.href.substr(1).match(reg)
  if (r != null) {
    return decodeURI(r[2])
  }
  return undefined
}

export const dealStringParam = (url: string) => {
  const theRequest = new Object()
  type stringKey = Record<string, any>
  const sty: stringKey = theRequest
  if (url.indexOf('?') != -1) {
    const str = url.substr(1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      const obj = strs[i].split('=')
      sty[obj[0]] = unescape(obj[1])
    }
  }
  return theRequest
}

export const randomHexColor = () => {
  return (
    '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
  )
}

// url地址转base64
export const getImageBase64Data = (imgSrc: string, type: string) => {
  function getBase64(img: any) {
    const canvas = document.createElement('canvas')

    canvas.width = img.width

    canvas.height = img.height

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    const dataURL = canvas.toDataURL(type || 'image/jpeg')

    return dataURL
  }

  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'Anonymous' // 图片处理跨域
    image.src = `${imgSrc}?v=${new Date()}`

    image.onload = function () {
      const imageBase64Data = getBase64(image)
      resolve(imageBase64Data)
    }
  })
}

// 生成guid
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 删除对象的某个属性
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const delObjKey = (prop: any, { [prop]: _, ...rest }: any) => rest
