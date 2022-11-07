import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  store,
  getPokemon,
  selectFilteredPokemon,
  selectSearch,
  rehydrate,
  setSearch,
} from '../src/store';

import styles from '../styles/Home.module.css';

function Home({ initialState }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrate(initialState.pokemon));
  }, [dispatch, initialState]);

  const pokemon = useSelector(selectFilteredPokemon);
  const search = useSelector(selectSearch);

  return (
    <div className={styles.main}>
      <Head>
        <title>Pokemon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
          }}
          className={styles.search}
        />
      </div>
      <div className={styles.container}>
        {pokemon.slice(0, 20).map((p) => (
          <div key={p.id} className={styles.image}>
            <img
              alt={p.name}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${p.image}`}
            />
            <h2>{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await store.dispatch(getPokemon());
  return {
    props: {
      initialState: store.getState(),
    },
  };
}

export default Home;
