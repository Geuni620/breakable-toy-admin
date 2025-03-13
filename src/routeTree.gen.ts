/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as SearchImport } from './routes/search'
import { Route as InboxImport } from './routes/inbox'
import { Route as CalendarImport } from './routes/calendar'
import { Route as IndexImport } from './routes/index'
import { Route as CalendarListImport } from './routes/calendar.list'

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const SearchRoute = SearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => rootRoute,
} as any)

const InboxRoute = InboxImport.update({
  id: '/inbox',
  path: '/inbox',
  getParentRoute: () => rootRoute,
} as any)

const CalendarRoute = CalendarImport.update({
  id: '/calendar',
  path: '/calendar',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CalendarListRoute = CalendarListImport.update({
  id: '/list',
  path: '/list',
  getParentRoute: () => CalendarRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/calendar': {
      id: '/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof CalendarImport
      parentRoute: typeof rootRoute
    }
    '/inbox': {
      id: '/inbox'
      path: '/inbox'
      fullPath: '/inbox'
      preLoaderRoute: typeof InboxImport
      parentRoute: typeof rootRoute
    }
    '/search': {
      id: '/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof SearchImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/calendar/list': {
      id: '/calendar/list'
      path: '/list'
      fullPath: '/calendar/list'
      preLoaderRoute: typeof CalendarListImport
      parentRoute: typeof CalendarImport
    }
  }
}

// Create and export the route tree

interface CalendarRouteChildren {
  CalendarListRoute: typeof CalendarListRoute
}

const CalendarRouteChildren: CalendarRouteChildren = {
  CalendarListRoute: CalendarListRoute,
}

const CalendarRouteWithChildren = CalendarRoute._addFileChildren(
  CalendarRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/calendar': typeof CalendarRouteWithChildren
  '/inbox': typeof InboxRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRoute
  '/calendar/list': typeof CalendarListRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/calendar': typeof CalendarRouteWithChildren
  '/inbox': typeof InboxRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRoute
  '/calendar/list': typeof CalendarListRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/calendar': typeof CalendarRouteWithChildren
  '/inbox': typeof InboxRoute
  '/search': typeof SearchRoute
  '/settings': typeof SettingsRoute
  '/calendar/list': typeof CalendarListRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/calendar'
    | '/inbox'
    | '/search'
    | '/settings'
    | '/calendar/list'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/calendar' | '/inbox' | '/search' | '/settings' | '/calendar/list'
  id:
    | '__root__'
    | '/'
    | '/calendar'
    | '/inbox'
    | '/search'
    | '/settings'
    | '/calendar/list'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CalendarRoute: typeof CalendarRouteWithChildren
  InboxRoute: typeof InboxRoute
  SearchRoute: typeof SearchRoute
  SettingsRoute: typeof SettingsRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CalendarRoute: CalendarRouteWithChildren,
  InboxRoute: InboxRoute,
  SearchRoute: SearchRoute,
  SettingsRoute: SettingsRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/calendar",
        "/inbox",
        "/search",
        "/settings"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/calendar": {
      "filePath": "calendar.tsx",
      "children": [
        "/calendar/list"
      ]
    },
    "/inbox": {
      "filePath": "inbox.tsx"
    },
    "/search": {
      "filePath": "search.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/calendar/list": {
      "filePath": "calendar.list.tsx",
      "parent": "/calendar"
    }
  }
}
ROUTE_MANIFEST_END */
