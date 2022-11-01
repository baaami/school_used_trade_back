import { Post } from '../../models'

/**
 * home 조회
 * GET /api/posts/list
 */
export const list = async (req, res, next) => {
  let posts
  try {
    posts = await Post.findAll({})
  } catch (err) {
    console.error(err)
    res.status(505)
  }
  res.json(posts)
}
