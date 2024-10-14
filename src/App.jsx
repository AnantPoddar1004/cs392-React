import React, { useState } from 'react';
import logo from './logo.svg';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import { TermSelector } from './components/TermSelector';
import { CoursePage } from './components/CourseSelector';
import { Modal } from './components/Modal';
import './App.css';

const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";


const Main = () => {

  const [data, isLoading, error] = useJsonQuery(url);

  const [term, setTerm] = useState("Fall");
  const [selected, setSelected] = useState([]);

  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;


  return (
    <div className ="App">
      
      <Banner title={data.title} />

      <div className="flex-container">
        <TermSelector term={term} setTerm={setTerm}/>

        <button className="courseplan-button" onClick={openModal}>Course Plan</button>
      </div>

      <Modal coursedata={data.courses} selected={selected} open={open} close={closeModal}>
        <p>Pop Up Opened!</p>
      </Modal>

      <CoursePage courses={data.courses} term={term} selected={selected} setSelected={setSelected}/>

    </div>
  );
}

const queryClient = new QueryClient();

/*  display the banner component which takes schedule as a prop */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
  )
};


export default App;
