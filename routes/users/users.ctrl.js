/**
 * home 조회
 * GET /api/home
 */
export const list = async (req, res, next) => {
  var sample = {
    id: 'testid',
    pwd: 'testpwd',
  }
  res.json(sample)
}
