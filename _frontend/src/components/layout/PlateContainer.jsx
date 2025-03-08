import Card from "../common/Card";
import imgb from "../../images/landingPagePhoneS.jpg";


const PlateContainer = () => {
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
    <div className="p-2 border border-prime md:col-span-3 col-span-full rounded grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
      <Card cardInfo={card} />
    </div>
  );
};

export default PlateContainer;
