import PokemonCard from "./PokemonCard"
import './PokemonList.css'
import { Pagination } from 'antd';
import { useState } from 'react';
import { capitalize } from '../utils/capitalizeUtils';

const PokemonList = ({pokemons = Array(10).fill(''), search}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const filteredPokemons = search ? pokemons.filter(pokemon => pokemon.name.includes(search.toLowerCase())) : pokemons;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onShowSizeChange = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  return (
    <div>
      <div className="PokemonList">
        {currentPokemons.map((pokemon) => {
          return ( 
            <PokemonCard 
              id={pokemon.id} 
              name={capitalize(pokemon.name)} 
              isFavorite={pokemon.favorite? pokemon.favorite : false} 
              key={pokemon.name} 
              image={pokemon.sprites.other["official-artwork"].front_default} 
              types={pokemon.types} 
              generation={pokemon.generation} 
            /> );
        })}
      </div>
      
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredPokemons.length}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} pokemons`}
          pageSizeOptions={['8', '12', '16', '24']}
          defaultPageSize={12}
        />
      </div>
    </div>
  )
}

export default PokemonList