// const mockData = Array.from({ length: 10 }, (_, i) => ({
//   artId: `art-${i}`,
//   imageUrl: `https://picsum.photos/seed/${i}/200/200`,
//   title: `Artwork ${i}`,
//   author: `Author ${i % 10}`,
// }));
const mockData = [
  {
    artId: `1`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fmiaoema%2F128179128_p0.jpg?alt=media&token=dac67276-0d79-425f-9c5e-6b7ac28ab1fe`,
    title: `1`,
    author: `Miaoema`,
  },
  {
    artId: `2`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fmiaoema%2F128256143_p0.jpg?alt=media&token=1aad0144-9073-44bc-a62d-2c1dae506796`,
    title: `2`,
    author: `Miaoema`,
  },
  {
    artId: `3`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fmiaoema%2F128256143_p1.jpg?alt=media&token=10b8e529-1fdc-4961-9289-987c464d5dcd`,
    title: `3`,
    author: `Miaoema`,
  },
  {
    artId: `4`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fmiaoema%2F128340637_p0.jpg?alt=media&token=7e9a80c7-23d5-48ff-b556-690c4241d881`,
    title: `4`,
    author: `Miaoema`,
  },
  {
    artId: `5`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fhanxiaoqiang%2F129869381_p10.jpg?alt=media&token=acbb04e4-1393-44fa-b5d0-c10720889e16`,
    title: `5`,
    author: `Hanxiaoqiang`,
  },
  {
    artId: `6`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fhanxiaoqiang%2F129869381_p8.jpg?alt=media&token=0e437575-f155-4f59-8d32-a7316a4fd265`,
    title: `6`,
    author: `Hanxiaoqiang`,
  },
  {
    artId: `7`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fhanxiaoqiang%2F129869381_p7.jpg?alt=media&token=86a8d8c5-dc1d-48d3-b789-96c8738b9d82`,
    title: `7`,
    author: `Hanxiaoqiang`,
  },
  {
    artId: `8`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fhanxiaoqiang%2F129869381_p6.jpg?alt=media&token=d3d91982-0690-4120-a24d-b6adf30c1325`,
    title: `8`,
    author: `Hanxiaoqiang`,
  },
  {
    artId: `9`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fhanxiaoqiang%2F129869381_p5.jpg?alt=media&token=47ef5e81-1c8f-4943-aa16-ff6717dc55ce`,
    title: `9`,
    author: `Hanxiaoqiang`,
  },
  {
    artId: `10`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fyierhebubu%2F%E4%B8%80%E4%BA%8C%E5%B8%83%E5%B8%83gif%E8%A1%A8%E6%83%85%E5%8C%85%E5%8A%A8%E5%9B%BE%20(145)_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.gif?alt=media&token=90848d73-8a9a-470b-ade3-5ffce002ea05`,
    title: `10`,
    author: `Yierhebubu`,
  },
  {
    artId: `11`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fyierhebubu%2F%E4%B8%80%E4%BA%8C%E5%B8%83%E5%B8%83gif%E8%A1%A8%E6%83%85%E5%8C%85%E5%8A%A8%E5%9B%BE%20(268)_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.gif?alt=media&token=827eb44a-69be-41fa-a7c7-217f840126b0`,
    title: `11`,
    author: `Yierhebubu`,
  },
  {
    artId: `12`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fyierhebubu%2F%E4%B8%80%E4%BA%8C%E5%B8%83%E5%B8%83gif%E8%A1%A8%E6%83%85%E5%8C%85%E5%8A%A8%E5%9B%BE%20(608)_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.gif?alt=media&token=819ce586-91f2-4e99-9a86-9283d262ab86`,
    title: `12`,
    author: `Yierhebubu`,
  },
  {
    artId: `13`,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/motionx-project.appspot.com/o/motionx-gallery%2Fyierhebubu%2F%E4%B8%80%E4%BA%8C%E5%B8%83%E5%B8%83gif%E8%A1%A8%E6%83%85%E5%8C%85%E5%8A%A8%E5%9B%BE%20(3)_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.gif?alt=media&token=11884862-7a5f-4145-bc3e-f8d728de5578`,
    title: `13`,
    author: `Yierhebubu`,
  },
];
export const getArtWorks = async () => {
  return mockData;
};
