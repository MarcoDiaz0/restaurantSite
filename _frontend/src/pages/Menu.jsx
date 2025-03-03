import FilterBar from "../components/layout/FilterBar"
import PlateContainer from "../components/layout/PlateContainer";

 const Menu = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <FilterBar />
      <PlateContainer />
    </div>
  );
}
export default Menu