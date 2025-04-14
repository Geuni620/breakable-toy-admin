/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as OriginalImport } from './routes/original'
import { Route as NotionImport } from './routes/notion'
import { Route as CalendarImport } from './routes/calendar'

// Create/Update Routes

const OriginalRoute = OriginalImport.update({
  id: '/original',
  path: '/original',
  getParentRoute: () => rootRoute,
} as any)

const NotionRoute = NotionImport.update({
  id: '/notion',
  path: '/notion',
  getParentRoute: () => rootRoute,
} as any)

const CalendarRoute = CalendarImport.update({
  id: '/calendar',
  path: '/calendar',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/calendar': {
      id: '/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof CalendarImport
      parentRoute: typeof rootRoute
    }
    '/notion': {
      id: '/notion'
      path: '/notion'
      fullPath: '/notion'
      preLoaderRoute: typeof NotionImport
      parentRoute: typeof rootRoute
    }
    '/original': {
      id: '/original'
      path: '/original'
      fullPath: '/original'
      preLoaderRoute: typeof OriginalImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/calendar': typeof CalendarRoute
  '/notion': typeof NotionRoute
  '/original': typeof OriginalRoute
}

export interface FileRoutesByTo {
  '/calendar': typeof CalendarRoute
  '/notion': typeof NotionRoute
  '/original': typeof OriginalRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/calendar': typeof CalendarRoute
  '/notion': typeof NotionRoute
  '/original': typeof OriginalRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/calendar' | '/notion' | '/original'
  fileRoutesByTo: FileRoutesByTo
  to: '/calendar' | '/notion' | '/original'
  id: '__root__' | '/calendar' | '/notion' | '/original'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  CalendarRoute: typeof CalendarRoute
  NotionRoute: typeof NotionRoute
  OriginalRoute: typeof OriginalRoute
}

const rootRouteChildren: RootRouteChildren = {
  CalendarRoute: CalendarRoute,
  NotionRoute: NotionRoute,
  OriginalRoute: OriginalRoute,
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
        "/calendar",
        "/notion",
        "/original"
      ]
    },
    "/calendar": {
      "filePath": "calendar.tsx"
    },
    "/notion": {
      "filePath": "notion.tsx"
    },
    "/original": {
      "filePath": "original.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
