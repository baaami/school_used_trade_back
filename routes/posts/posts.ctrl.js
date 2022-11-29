import { Post } from '../../models'
const { Image } = require('../../models')

/**
 * Post List 조회
 * GET /api/posts/list
 */
export const list = async (req, res, next) => {
  let postListRaw
  try {
    postListRaw = await Post.findAll({
      attributes: ['id','title','body','userid','created_at'],
      include: [
        {
          model: Image,
          attributes: ['path'],
        },
      ],
    })
  } catch (err) {
    console.error(err)
    res.status(505)
  }

  if(postListRaw === undefined) {
    res.send(505)
  } else {
    // const postJson = postListRaw.toJSON()
    res.json(postListRaw)
  }
}
