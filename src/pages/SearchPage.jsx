import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionComponent from '../components/Collection/Collection.component';
import useShopifyStore from '../store/useShopifyStore';
import { useLocation } from 'react-router-dom';

function SearchPage() {
  const navigate = useNavigate(); 
  const [searchQueryProducts, setSearchQueryProducts] = useState([]);
  const products = useShopifyStore((state) => state.products);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    if (searchQuery && searchQuery.trim() !== '') {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchQueryProducts(filteredProducts);
    } else {
      navigate('/'); 
    }
  }, [products, searchQuery, navigate]);

  return (
    <div>
      <CollectionComponent products={searchQueryProducts} type={`Product > ${searchQuery || 'All'}`} />
    </div>
  );
}

export default SearchPage;
