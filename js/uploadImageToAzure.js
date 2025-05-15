export async function uploadImageToAzure(uploadParams) {

    const { file, storageAccount, sasToken, containerName } = uploadParams;

    const blobName = `${Date.now()}-${file.name}`;

    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`;
    const uploadUrl = `${baseUrl}?${sasToken}`;

    const options = {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    }

    const response = await fetch(uploadUrl, options)

    if (response.ok) {
      return baseUrl;
    }else {
      return response.ok
    }
   
}