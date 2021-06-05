export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();
    formData.append("file", item);

    // from cloudinary media library
    formData.append("upload_preset", process.env.CLOUD_UPDATE_PRESET);

    formData.append("cloud_name", process.env.CLOUD_NAME); // your cloudinary name

    /* API: `https://cloudinary.com/v1_1/${CLOUD_NAME}/image/upload` */
    const res = await fetch(process.env.CLOUD_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
