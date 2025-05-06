import { useEffect } from "react";
import PlateContainer from "../components/layout/PlateContainer";
import { useGetFavourites } from "../hooks/useCustomer";
import { useFavouritesStore } from "../Store/favouraites";


 const Favourites = () => {
    const { getFavourites } = useGetFavourites();
      const { favouritesPlates } = useFavouritesStore();
    
    useEffect(() => {
      getFavourites();
    }, []);
  return (
    <div className="md:w-7/10 min-h-[70vh] mx-auto py-2 ">
      <PlateContainer plates={favouritesPlates} />
    </div>
  );
}
export default Favourites