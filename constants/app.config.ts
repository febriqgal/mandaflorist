export const AppConfig = {
  title: "MandaFlorist",
  desc: "Kreativitas Bunga, Ekspresi Anda yang Abadi",
  apiUrl: "http://localhost:3000/api",
  whatsapp: "628123456789",
};

export const formatRupiah = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(price)
    .replace(/(\.|,)00$/g, "");
