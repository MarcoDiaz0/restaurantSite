import Card from "../common/Card";
import imgb from "../../images/landingPagePhoneS.jpg";
import { useState } from "react";
import DetailsModal from "../common/DetailsModal";

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
  const [modal, setModal] = useState({ cardId: null, show: false });
  return (
    <div className="p-2 border border-prime md:col-span-3 col-span-full rounded grid grid-cols-2 lg:grid-cols-3 gap-2">
      <Card cardInfo={card} showHideM={setModal} />
      <Card cardInfo={card} showHideM={setModal} />
      <Card cardInfo={card} showHideM={setModal} />
      <Card cardInfo={card} showHideM={setModal} />

      {modal.show && <DetailsModal card={card} showHideM={setModal} />}
    </div>
  );
};

export default PlateContainer;
