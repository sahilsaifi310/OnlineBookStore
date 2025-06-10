export const getBooks = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/sahilsaifi310/BookProject/refs/heads/main/service.json"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return []; 
  }
};
