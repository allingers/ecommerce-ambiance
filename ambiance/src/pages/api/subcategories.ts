import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Subcategory from '../../models/Subcategory';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await dbConnect();
      const subcategories: Subcategory[] = await Subcategory.find({}).exec();
      res.status(200).json(subcategories);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
