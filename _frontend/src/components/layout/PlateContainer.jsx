import Card from "../common/Card";
import imgb from "../../images/landingPagePhoneS.jpg";


const PlateContainer = (cards) => {
  const card = {
    image: imgb,
    isliked: false,
    price: 2000,
    rate: 3.3,
    title: "humburger",
    id: "22",
    description:
      "sdsdf asdf sdafs safasdf sdffsd sdfk igbrpiwbfå piertnb irjtgnrg",
  };

  return (
    <div className="px-2 md:col-span-2 col-span-full rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-scroll gap-2">
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
    </div>
  );
};

export default PlateContainer;
