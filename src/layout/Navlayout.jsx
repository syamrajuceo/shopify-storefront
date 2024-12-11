import { Outlet } from "react-router-dom";
import NavabarComponent from "../components/Shared/Navabar.component";
import FooterComponent from "../components/Shared/Footer.component";

function Navlayout() {
  // const [query, setQuery] = useState(""); 

  const handleSearch = (searchQuery) => {
    console.log("Search Query:", searchQuery);
    // setQuery(searchQuery); 
  };

  return (
    <div>
      <NavabarComponent cartnumber={4} getSearchData={handleSearch} />
      <div className="min-h-[160px]">
        <Outlet />
      </div>

      <FooterComponent />
    </div>
  );
}

export default Navlayout;
