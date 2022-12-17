import React from 'react';
import ReactDOM from 'react-dom';
import {Toaster} from 'react-hot-toast';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return(
    //this 'Component' means that currently on which component we are 
    <StateContext>
    <Layout>
      <Toaster/>
      <Component {...pageProps} />
    </Layout>
    </StateContext>
  )
}
