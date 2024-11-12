import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async (userId, res) => {
  try {
    const token = jwt.sign({ id : userId }, process.env.jwt_secret, { expiresIn : '15d'});

    res.cookie('jwt', token, { sameSite : "strict" , httpOnly : true })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Error in setting cookie" })
  }
}