import { useState } from 'react';
import logo from './logo.svg';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import './App.css';

const url = "https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";

const Main = () => {

  const [data, isLoading, error] = useJsonQuery(url);

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  console.log(data);

  return (
    <div className ="App">
      <Banner title={data.title} />

      <div className="course-list">
      {
        Object.entries(data.courses).map(([course, details]) => <CourseList details={details}/>)
      }
      </div>
      
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
