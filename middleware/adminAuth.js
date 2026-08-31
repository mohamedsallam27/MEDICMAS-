module.exports = function adminAuth(req, res, next) {
  const provided = req.headers['x-admin-password'];
  if (!provided || provided !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'كلمة السر غير صحيحة' });
  }
  next();
};
