export async function api(query, page) {
  const KEY = '29404006-95afa3b6414bbb36dd662a5bf';
  const searchParams = new URLSearchParams({
    key: KEY,
    q: query,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 16,
  });

  const END_POINT = `https://pixabay.com/api/?${searchParams}`;
  const response = fetch(END_POINT);
  const data = await (await response).json();
  return data;
}
