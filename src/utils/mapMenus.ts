import type { RouteRecordRaw } from 'vue-router'

let firstRoute: any = '/login'

export { firstRoute }

export type roleType = 'school' | 'company' | 'fresh'

export async function getRoleRoutes(role: roleType) {
  const routes: RouteRecordRaw[] = []
  let modules = {}
  if (role === 'school') {
    modules = import.meta.glob('@/router/main/school/**/*.ts', { eager: true })
  } else if (role === 'company') {
    modules = import.meta.glob('@/router/main/company/**/*.ts', { eager: true })
  } else if (role === 'fresh') {
    modules = import.meta.glob('@/router/fresh/**/*.ts', { eager: true })
  }
  const importModule = Object.values(modules)
  importModule.forEach((fileImport: any) => {
    routes.push(fileImport.default)
  })

  return routes
}

export function getMenu(role: roleType) {
  const menu = []
  if (role === 'school') {
    menu.push({ label: '应届生管理', url: '/main/school/fresh', icon: 'Management' })
    menu.push({ label: '发布资讯', url: '/main/school/message', icon: 'Message' })
    menu.push({ label: '登录记录', url: '/main/school/record', icon: 'Bell' })
  } else if (role === 'company') {
    menu.push({ label: '岗位管理', url: '/main/company/job', icon: 'Management' })
    menu.push({ label: '简历筛选', url: '/main/company/filrate', icon: 'Filter' })
    menu.push({ label: '在线咨询', url: '/main/company/consult', icon: 'ChatDotRound' })
    menu.push({ label: '企业信息', url: '/main/company/info', icon: 'InfoFilled' })
    menu.push({ label: '登录记录', url: '/main/company/record', icon: 'Bell' })
  }
  firstRoute = menu[0]?.url
  if (role === 'fresh') {
    firstRoute = '/fresh/main'
  }
  return menu
}
