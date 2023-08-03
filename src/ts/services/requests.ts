export const postData = async (url: string, data: any): Promise<string> => {
  const result = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return await result.text();
};

export const getResource = async (url: string): Promise<{ styles: { src: string; title: string; link: string; }[] }> => {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }

  return await result.json();
};