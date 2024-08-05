import type { NextApiRequest, NextApiResponse } from 'next';
import { CheckedConditions } from '../../redux/slices/checked-item-slice';

const checkedItems: Record<string, CheckedConditions> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(checkedItems);
  } else if (req.method === 'POST') {
    const { uid, checked, name, psychologicalCondition } = req.body;

    if (
      typeof uid === 'string' &&
      typeof checked === 'boolean' &&
      typeof name === 'string' &&
      typeof psychologicalCondition === 'boolean'
    ) {
      checkedItems[uid] = { uid, name, psychologicalCondition, checked };
      res.status(200).json({ message: 'Item status updated' });
    } else {
      res.status(400).json({ message: 'Invalid request body' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
