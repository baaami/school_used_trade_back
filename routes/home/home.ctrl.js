/**
 * home 조회
 * GET /api/home
 */
export const board = async (req, res, next) => {
  const data = {
    nickname: req.user.nickname,
  }
  res.json(data)
}
