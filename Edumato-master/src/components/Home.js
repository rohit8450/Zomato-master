import React from 'react';
import Search from './Search/Search'
import QuickAPI from "./QuickSearch/QuickAPI";


const Home = () => {
    return (
      <div>
        <Search />
        <QuickAPI />
      </div>
    );
}

export default Home;