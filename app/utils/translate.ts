export const translateText = async (
  text: string,
  target: string
) => {

  if (target === "en") return text;

  try {

    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
      target +
      "&dt=t&q=" +
      encodeURIComponent(text);

    const res = await fetch(url);

    const data = await res.json();

    return data[0][0][0];

  }
  catch {

    return text;

  }

};
