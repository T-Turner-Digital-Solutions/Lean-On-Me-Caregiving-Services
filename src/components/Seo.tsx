import { useEffect } from 'react'

interface SeoProps {
  title: string
  description?: string
  path?: string
}

// Minimal per-page SEO: updates document title, meta description and canonical.
// (No external Helmet dependency needed for a site this size.)
export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | Lean On Me Caregiving Services`
    document.title = fullTitle

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
    setMeta('property', 'og:title', title)

    if (path) {
      const url = `https://leanonmecaregiving.org${path}`
      setLink('canonical', url)
      setMeta('property', 'og:url', url)
    }
  }, [title, description, path])

  return null
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}
