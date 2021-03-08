export const toBase64 = (file: any, resolve?: any) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const res = event.target!.result;
    resolve(res);
  };
  reader.readAsDataURL(file);
};

export const sendIdentification = (
  file: any,
  dispatchPlant: any,
  setLoading?: any,
  setHistory?: any
) => {
  new Promise((resolve, reject) => {
    toBase64(file, resolve);
  }).then((base64file) => {
    const data = {
      api_key: process.env.REACT_APP_PLANT_API_KEY,
      images: [`${base64file}`],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };
    fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatchPlant({
          type: "GET_PLANT",
          payload: {
            Plant: data,
          },
        });
        localStorage.setItem("current_plant", JSON.stringify(data));

        setLoading(false);
        setHistory(data);
      })
      .catch((error) => {
        throw new Error("Something went wrong!");
      });
  });
};
