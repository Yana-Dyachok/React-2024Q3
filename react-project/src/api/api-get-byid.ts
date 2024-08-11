import { Conditions } from '@/types/api-interface';
import { PATH } from '@/utils/const/const';

const fetchMedicalConditionById = async (
  uid: string,
): Promise<Conditions | null> => {
  const url = `${PATH}?uid=${uid}`;
  try {
    const result: Response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!result.ok) return null;

    const response = await result.json();
    const medicalCondition: Conditions = response.medicalCondition;

    return medicalCondition;
  } catch (error) {
    console.error('Error fetching data: ', error);
    return null;
  }
};

export default fetchMedicalConditionById;
