import { Method, Router } from 'tiny-request-router'

const router = new Router()
router.get('/worker', async () => new Response('Hi from worker!'))
router.get(
  '/hello/:name',
  async (params: { name: string }) => new Response(`Hello ${params.name}!`),
)

addEventListener('fetch', (event) => {
  const request = event.request
  const { pathname } = new URL(request.url)

  const match = router.match(request.method as Method, pathname)
  if (match) {
    event.respondWith(match.handler(match.params))
  }
})
