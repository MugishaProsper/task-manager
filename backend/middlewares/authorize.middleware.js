import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export default authorize = async (req, res) => {
  const token = req.user.token;

  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);

    if(!decoded) {
      return res.status(404).json({ message : "Token not found" });
    };

    
  } catch (error) {
    
  }
}