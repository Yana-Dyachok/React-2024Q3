import { NextRequest, NextResponse } from 'next/server';
import fetchData from '../api-get';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || 15);

  try {
    const data = await fetchData(page, pageSize);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch medical conditions' },
      { status: 500 },
    );
  }
}
