import { get, post } from '@/utils/ajax'

const url = {
  SYSTEM_LIST: '/system/getSystemList',
  ADD_SYSTEM: '/system/addSystem',
  DELETE_SYSTEM: '/system/deleteSystem',
  MENU_LIST: '/system/getMenuList',
  ADD_MENU: '/system/addMenu',
  DELETE_Menu: '/system/deleteMenu',
  MOULD_LIST: '/system/getMouldList',
  ADD_MOULD: '/system/addMould',
  DELETE_MOULD: '/system/deleteMould',
  RESOURCE_LIST: '/system/getResourceList',
  ADD_RESOURCE: '/system/addResource',
  DELETE_RESOURCE: '/system/deleteResource'
}

/**
 * 查询系统列表
 * @returns
 */
export function getSystemList () {
  return get(url.SYSTEM_LIST)
}

/**
 * 添加或者修改系统
 * @param {any} data
 * @returns
 */
export function addSystem (data) {
  return post(url.ADD_SYSTEM, data)
}

/**
 * 删除系统
 * @param {any} data
 * @returns
 */
export function deleteSystem (data) {
  return post(url.DELETE_SYSTEM, data)
}

/**
 * 获取菜单列表
 * @param {Object} params
 * @returns
 */
export function getMenuList (params) {
  return get(url.MENU_LIST, params)
}

/**
 * 添加菜单
 * @param {Object} data
 * @returns
 */
export function addMenu (data) {
  return post(url.ADD_MENU, data)
}

/**
 * 删除菜单
 * @param {any} data
 * @returns
 */
export function deleteMenu (data) {
  return post(url.DELETE_Menu, data)
}

/**
 * 获取模板列表
 * @param {Object} params
 * @returns
 */
export function getMouldList (params) {
  return get(url.MOULD_LIST, params)
}

/**
 * 添加模板
 * @param {Object} data
 * @returns
 */
export function addMould (data) {
  return post(url.ADD_MOULD, data)
}

/**
 * 删除模板
 * @param {any} data
 * @returns
 */
export function deleteMould (data) {
  return post(url.DELETE_MOULD, data)
}

/**
 * 获取资源列表
 * @param {Object} params
 * @returns
 */
export function getResourceList (params) {
  return get(url.RESOURCE_LIST, params)
}

/**
 * 添加资源
 * @param {Object} data
 * @returns
 */
export function addResource (data) {
  return post(url.ADD_RESOURCE, data)
}

/**
 * 删除资源
 * @param {any} data
 * @returns
 */
export function deleteResource (data) {
  return post(url.DELETE_RESOURCE, data)
}
