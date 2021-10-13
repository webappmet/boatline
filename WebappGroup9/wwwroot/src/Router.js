import React, { useState, useMemo, createContext } from 'react'

export const pagesMapping = { 
  order: "order",
  tickets: "tickets",
  home: ""
}
export const navigate = (to) => {
  window.location.href = window.location.origin + to;
}
export const RoutingContext = createContext({ page: pagesMapping.home })
export default function Router({ children }) {
  /* Read the urlPath, e.g. '/about' or '/' */
  let urlPath = window.location.pathname.slice(1).toLowerCase()
  /* Set the default page to Home if not specified otherwise in the URL */
  const [page, setPage] = useState(urlPath || pagesMapping.home)
  const value = useMemo(
    () => ({ page, setPage }), 
    [page, setPage]
  )

  return (
    <RoutingContext.Provider value={value}>
      {children}
    </RoutingContext.Provider>
  )
}